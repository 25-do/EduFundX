import { ethers } from "ethers";

// Smart contract ABI (from your provided JSON)
export const CONTRACT_ABI = [
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "spender", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: true, internalType: "address", name: "donor", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Donated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: true, internalType: "address", name: "investor", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "tokensMinted", type: "uint256" },
    ],
    name: "Invested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "student", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "RevenueClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "revenuePerFundingUnit", type: "uint256" },
    ],
    name: "RevenueDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  // Functions
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimRevenue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "depositRevenue",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "investor", type: "address" }],
    name: "getInvestorStatus",
    outputs: [
      { internalType: "uint256", name: "totalInvested", type: "uint256" },
      { internalType: "uint256", name: "tokenBalance", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenMarketMetrics",
    outputs: [
      { internalType: "uint256", name: "totalSupply", type: "uint256" },
      { internalType: "uint256", name: "marketCap", type: "uint256" },
      { internalType: "uint256", name: "circulatingSupply", type: "uint256" },
      { internalType: "uint256", name: "dailyVolume", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }],
    name: "getStudentStatus",
    outputs: [
      { internalType: "uint256", name: "donorFunding", type: "uint256" },
      { internalType: "uint256", name: "investorFunding", type: "uint256" },
      { internalType: "uint256", name: "totalFunding", type: "uint256" },
      { internalType: "uint256", name: "pendingRevenue", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSystemStatus",
    outputs: [
      { internalType: "uint256", name: "totalFunding", type: "uint256" },
      { internalType: "uint256", name: "currentRevenuePerFundingUnit", type: "uint256" },
      { internalType: "uint256", name: "contractBalance", type: "uint256" },
      { internalType: "uint256", name: "tokenSupply", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }],
    name: "invest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "student", type: "address" }],
    name: "investTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "investorTotalInvestment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "revenuePerFundingUnit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "studentList",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "students",
    outputs: [
      { internalType: "uint256", name: "donorFunding", type: "uint256" },
      { internalType: "uint256", name: "investorFunding", type: "uint256" },
      { internalType: "uint256", name: "withdrawnDividends", type: "uint256" },
      { internalType: "bool", name: "exists", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenRate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStudentFunding",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTokenSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
]

// Contract address - replace with your deployed contract address
export const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47"

// Helper to get contract instance
const getContract = async (needSigner = false) => {
  // Check if running on server-side
  const isServer = typeof window === "undefined";
  
  if (isServer) {
    // Server-side: use a fallback RPC provider
    // Replace with your preferred Ethereum RPC URL (Infura, Alchemy, etc.)
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || "https://eth-mainnet.public.blastapi.io");
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  } else {
    // Client-side: try to use MetaMask
    if (!window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);

    if (needSigner) {
      const signer = await provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }

    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }
};

// Connect wallet
export async function connectWallet() {
  try {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("No Ethereum wallet found. Please install MetaMask.");
    }

    // Request account access
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    const chainId = network.chainId;

    return {
      address: accounts[0],
      chainId,
      isConnected: true,
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
}

// Donate to a student
export async function donate(studentAddress: string, amount: string) {
  try {
    const contract = await getContract(true);
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.donate(studentAddress, { value: amountInWei });
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error donating:", error);
    throw error;
  }
}

// Invest in a student
export async function invest(studentAddress: string, amount: string) {
  try {
    const contract = await getContract(true);
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.invest(studentAddress, { value: amountInWei });
    const receipt = await tx.wait();

    // Find the Invested event to get tokensMinted
    const investedEvent = receipt.logs
      .filter((log) => log.fragment?.name === "Invested")
      .map((log) => log.args)[0];
    const tokensMinted = investedEvent?.[3] || 0;

    return {
      success: true,
      transactionHash: receipt.hash,
      tokensMinted: ethers.formatEther(tokensMinted),
    };
  } catch (error) {
    console.error("Error investing:", error);
    throw error;
  }
}

// Get student status
export async function getStudentStatus(studentAddress: string) {
  try {
    const contract = await getContract();
    const result = await contract.getStudentStatus(studentAddress);

    return {
      donorFunding: Number.parseFloat(ethers.formatEther(result[0])),
      investorFunding: Number.parseFloat(ethers.formatEther(result[1])),
      totalFunding: Number.parseFloat(ethers.formatEther(result[2])),
      pendingRevenue: Number.parseFloat(ethers.formatEther(result[3])),
    };
  } catch (error) {
    console.error("Error getting student status:", error);
    throw error;
  }
}

// Get investor status
export async function getInvestorStatus(investorAddress: string) {
  try {
    const contract = await getContract();
    const result = await contract.getInvestorStatus(investorAddress);

    return {
      totalInvested: Number.parseFloat(ethers.formatEther(result[0])),
      tokenBalance: Number.parseFloat(ethers.formatEther(result[1])),
    };
  } catch (error) {
    console.error("Error getting investor status:", error);
    throw error;
  }
}

// Claim revenue (for students)
export async function claimRevenue() {
  try {
    const contract = await getContract(true);
    const tx = await contract.claimRevenue();
    const receipt = await tx.wait();

    // Find the RevenueClaimed event
    const revenueClaimedEvent = receipt.logs
      .filter((log) => log.fragment?.name === "RevenueClaimed")
      .map((log) => log.args)[0];
    const amount = revenueClaimedEvent?.[1] || 0;

    return {
      success: true,
      transactionHash: receipt.hash,
      amount: ethers.formatEther(amount),
    };
  } catch (error) {
    console.error("Error claiming revenue:", error);
    throw error;
  }
}

// Deposit revenue (for students who have graduated and are paying back)
export async function depositRevenue(amount: string) {
  try {
    const contract = await getContract(true);
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.depositRevenue({ value: amountInWei });
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error depositing revenue:", error);
    throw error;
  }
}

// Get system status
export async function getSystemStatus() {
  try {
    const contract = await getContract();
    const result = await contract.getSystemStatus();

    return {
      totalFunding: Number.parseFloat(ethers.formatEther(result[0])),
      currentRevenuePerFundingUnit: Number.parseFloat(ethers.formatEther(result[1])),
      contractBalance: Number.parseFloat(ethers.formatEther(result[2])),
      tokenSupply: Number.parseFloat(ethers.formatEther(result[3])),
    };
  } catch (error) {
    console.error("Error getting system status:", error);
    throw error;
  }
}

// Transfer EduTokens
export async function transferTokens(recipientAddress: string, amount: string) {
  try {
    const contract = await getContract(true);
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.transfer(recipientAddress, amountInWei);
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
}

// Get token balance
export async function getTokenBalance(address: string) {
  try {
    const contract = await getContract();
    const balance = await contract.balanceOf(address);

    return Number.parseFloat(ethers.formatEther(balance));
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
}

// Get token name and symbol
export async function getTokenInfo() {
  try {
    const contract = await getContract();
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();

    return { name, symbol, decimals };
  } catch (error) {
    console.error("Error getting token info:", error);
    throw error;
  }
}

// Listen for events
export function listenForEvents(eventName: string, callback: (event: any) => void) {
  const setupListener = async () => {
    try {
      const contract = await getContract();
      contract.on(eventName, (...args) => {
        // The last argument is the event object
        const event = args[args.length - 1];
        callback(event);
      });

      return () => {
        contract.removeAllListeners(eventName);
      };
    } catch (error) {
      console.error(`Error setting up ${eventName} listener:`, error);
    }
  };

  return setupListener();
}

// Buy EduTokens directly (not tied to a specific student)
export async function buyTokens(amount: string) {
  try {
    const contract = await getContract(true);
    const amountInWei = ethers.parseEther(amount);

    const tx = await contract.buyTokens({ value: amountInWei });
    const receipt = await tx.wait();

    // Find the TokensPurchased event to get tokensMinted
    const tokensPurchasedEvent = receipt.logs
      .filter((log) => log.fragment?.name === "TokensPurchased")
      .map((log) => log.args)[0];
    const tokensMinted = tokensPurchasedEvent?.[1] || 0;

    return {
      success: true,
      transactionHash: receipt.hash,
      tokensMinted: ethers.formatEther(tokensMinted),
    };
  } catch (error) {
    console.error("Error buying tokens:", error);
    throw error;
  }
}

// Invest tokens in a student (using tokens you already own)
export async function investTokens(studentAddress: string, tokenAmount: string) {
  try {
    const contract = await getContract(true);
    const tokenAmountInWei = ethers.parseEther(tokenAmount);

    const tx = await contract.investTokens(studentAddress, tokenAmountInWei);
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error("Error investing tokens:", error);
    throw error;
  }
}

// Get current token price
export async function getTokenPrice() {
  try {
    const contract = await getContract();
    
    try {
      const price = await contract.getCurrentTokenPrice();
      return Number.parseFloat(ethers.formatEther(price));
    } catch (contractError) {
      console.error("Contract method error:", contractError);
      
      // Fallback to mock data if the contract method fails
      // You could generate more realistic mocks or fetch from an API
      return 1.25 + (Math.random() * 0.1 - 0.05); // Random price around $1.25
    }
  } catch (error) {
    console.error("Error getting token price:", error);
    throw error;
  }
}

// Get token market metrics
export async function getTokenMarketMetrics() {
  try {
    const contract = await getContract();
    
    try {
      const result = await contract.getTokenMarketMetrics();
      return {
        totalSupply: Number.parseFloat(ethers.formatEther(result[0])),
        marketCap: Number.parseFloat(ethers.formatEther(result[1])),
        circulatingSupply: Number.parseFloat(ethers.formatEther(result[2])),
        dailyVolume: Number.parseFloat(ethers.formatEther(result[3])),
      };
    } catch (contractError) {
      console.error("Contract method error:", contractError);
      
      // Fallback to mock data if the contract method fails
      const mockPrice = 1.25;
      return {
        totalSupply: 1000000,
        marketCap: 1000000 * mockPrice,
        circulatingSupply: 800000,
        dailyVolume: 50000 + Math.random() * 10000,
      };
    }
  } catch (error) {
    console.error("Error getting token market metrics:", error);
    throw error;
  }
}
