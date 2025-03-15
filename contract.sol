// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


/**
 * @title EduFundPlatform
 * @notice A crowdfunding education funding system with two types of contributions:
 *         - Donors contribute funds that do not require repayment.
 *         - Investors contribute funds and are issued investor tokens (“EduCoin”).
 *
 * Funds raised for each student (donations + investments) give that student a “funding share.”
 * Revenue (e.g. fees, repayments) can be deposited and is distributable to students proportionally.
 *
 * Dashboard functions allow:
 *  • Students to view their donor funding, investor funding, total funding, and claimable revenue.
 *  • Investors to see their total ETH invested and their EduCoin token balance.
 *  • A global system view (total funding, revenue per funding unit, contract balance, total token supply).
 */
contract EduFundPlatform {
    // ---------- Investor Token (EduCoin) Implementation ----------
    string public constant name = "EduCoin";
    string public constant symbol = "EDU";
    uint8 public constant decimals = 18;
    uint256 public totalTokenSupply;

    // Mapping from investor address to token balance.
    mapping(address => uint256) public balanceOf;
    // Mapping from investor address to approved allowances (for ERC20 transfers).
    mapping(address => mapping(address => uint256)) public allowance;

    // A simple transfer function.
    function transfer(address recipient, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient token balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
    
    // Approve spending.
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    // Transfer from (for approved spenders).
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) {
        require(balanceOf[sender] >= amount, "Insufficient token balance");
        require(allowance[sender][msg.sender] >= amount, "Allowance exceeded");
        balanceOf[sender] -= amount;
        allowance[sender][msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // ---------- Funding & Revenue Distribution ----------
    // For revenue distribution we use a "dividend" model.
    // Each student's share is proportional to their total funding (donor + investor).
    // We use a fixed-point math multiplier.
    uint256 constant internal magnitude = 2**128;
    uint256 public revenuePerFundingUnit; // Accumulated revenue per funding unit, scaled by magnitude.
    uint256 public totalStudentFunding;    // Sum of all students' funding (donations + investments).

    // Conversion rate for investor tokens: e.g., 1 ETH gives 1000 EDU tokens.
    uint256 public constant tokenRate = 1000 * (10 ** decimals);

    // Track overall investor ETH contributions (for dashboard use).
    mapping(address => uint256) public investorTotalInvestment;

    // Student information structure.
    struct StudentInfo {
        uint256 donorFunding;      // Total donated ETH for this student.
        uint256 investorFunding;   // Total investor ETH for this student.
        uint256 withdrawnDividends; // Revenue (dividends) already claimed.
        bool exists;               // Whether this student is registered.
    }
    
    // Mapping from student address to their funding info.
    mapping(address => StudentInfo) public students;
    // Keep an array of student addresses for global analytics.
    address[] public studentList;

    // ---------- Events ----------
    event Donated(address indexed student, address indexed donor, uint256 amount);
    event Invested(address indexed student, address indexed investor, uint256 amount, uint256 tokensMinted);
    event RevenueDeposited(uint256 amount, uint256 revenuePerFundingUnit);
    event RevenueClaimed(address indexed student, uint256 amount);

    // ---------- Funding Functions ----------
    
    /**
     * @notice Donors contribute ETH to support a student. Donations are non-repayable.
     * @param student The address of the student who receives the donation.
     */
    function donate(address student) external payable {
        require(msg.value > 0, "Donation must be > 0");
        StudentInfo storage s = students[student];
        if (!s.exists) {
            s.exists = true;
            studentList.push(student);
        }
        s.donorFunding += msg.value;
        totalStudentFunding += msg.value;
        emit Donated(student, msg.sender, msg.value);
    }

    /**
     * @notice Investors contribute ETH to support a student and receive EduCoin tokens.
     *         The investor’s ETH counts as funding for the student (and later revenue is distributed based on total funding).
     * @param student The address of the student receiving the investment.
     */
    function invest(address student) external payable {
        require(msg.value > 0, "Investment must be > 0");
        StudentInfo storage s = students[student];
        if (!s.exists) {
            s.exists = true;
            studentList.push(student);
        }
        s.investorFunding += msg.value;
        totalStudentFunding += msg.value;
        
        // Track investor's total ETH investment.
        investorTotalInvestment[msg.sender] += msg.value;
        
        // Mint EduCoin tokens to the investor.
        // For example, 1 ETH -> tokenRate tokens.
        uint256 tokensToMint = (msg.value * tokenRate) / 1 ether;
        balanceOf[msg.sender] += tokensToMint;
        totalTokenSupply += tokensToMint;
        
        emit Invested(student, msg.sender, msg.value, tokensToMint);
    }

    // ---------- Revenue Distribution ----------
    /**
     * @notice Deposit revenue (e.g., fees, repayments, or other generated funds) to be distributed among students.
     *         Revenue is distributed proportionally based on each student's funding share.
     */
    function depositRevenue() external payable {
        require(totalStudentFunding > 0, "No student funding available");
        require(msg.value > 0, "Revenue must be > 0");
        // Increase the revenue per funding unit.
        revenuePerFundingUnit += (msg.value * magnitude) / totalStudentFunding;
        emit RevenueDeposited(msg.value, revenuePerFundingUnit);
    }
    
    /**
     * @notice Allow a student to claim their share of the distributed revenue.
     *         Their claimable revenue is proportional to their total funding (donor + investor) minus any already withdrawn.
     */
    function claimRevenue() external {
        StudentInfo storage s = students[msg.sender];
        require(s.exists, "Student not registered");
        uint256 studentTotalFunding = s.donorFunding + s.investorFunding;
        uint256 entitled = (studentTotalFunding * revenuePerFundingUnit) / magnitude;
        require(entitled > s.withdrawnDividends, "No revenue to claim");
        uint256 claimable = entitled - s.withdrawnDividends;
        s.withdrawnDividends += claimable;
        payable(msg.sender).transfer(claimable);
        emit RevenueClaimed(msg.sender, claimable);
    }

    // ---------- Dashboard / Analytics Functions ----------
    
    /**
     * @notice Returns a student's funding and revenue data.
     * @param student The student's address.
     * @return donorFunding ETH donated, investorFunding ETH invested, totalFunding,
     *         and pendingRevenue (claimable dividends).
     */
    function getStudentStatus(address student)
        external
        view
        returns (
            uint256 donorFunding,
            uint256 investorFunding,
            uint256 totalFunding,
            uint256 pendingRevenue
        )
    {
        StudentInfo storage s = students[student];
        donorFunding = s.donorFunding;
        investorFunding = s.investorFunding;
        totalFunding = donorFunding + investorFunding;
        uint256 entitled = (totalFunding * revenuePerFundingUnit) / magnitude;
        pendingRevenue = (entitled > s.withdrawnDividends) ? (entitled - s.withdrawnDividends) : 0;
    }
    
    /**
     * @notice Returns an investor's status.
     * @param investor The investor's address.
     * @return totalInvested ETH invested by the investor and their current EduCoin token balance.
     */
    function getInvestorStatus(address investor)
        external
        view
        returns (uint256 totalInvested, uint256 tokenBalance)
    {
        totalInvested = investorTotalInvestment[investor];
        tokenBalance = balanceOf[investor];
    }
    
    /**
     * @notice Returns overall system statistics.
     * @return totalFunding Total ETH funded for all students,
     *         current revenuePerFundingUnit,
     *         contractBalance (ETH held in the contract),
     *         and totalTokenSupply (total EduCoin in circulation).
     */
    function getSystemStatus()
        external
        view
        returns (
            uint256 totalFunding,
            uint256 currentRevenuePerFundingUnit,
            uint256 contractBalance,
            uint256 tokenSupply
        )
    {
        totalFunding = totalStudentFunding;
        currentRevenuePerFundingUnit = revenuePerFundingUnit;
        contractBalance = address(this).balance;
        tokenSupply = totalTokenSupply;
    }
}
