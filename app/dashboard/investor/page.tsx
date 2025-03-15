"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, BarChart3, Coins, TrendingUp, Wallet } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { getInvestorStatus, getTokenBalance } from "@/lib/blockchain"

// Mock investor data
const investorData = {
  totalInvested: 15000,
  tokenBalance: 12500,
  portfolioROI: 18.5,
  recentInvestments: [
    { id: 1, student: "Alex Thompson", amount: 2000, date: "Aug 10, 2024", program: "Computer Science", tokens: 1800 },
    { id: 2, student: "Priya Sharma", amount: 3000, date: "Jul 22, 2024", program: "Medicine", tokens: 2700 },
    { id: 3, student: "Marcus Johnson", amount: 1500, date: "Jul 05, 2024", program: "Engineering", tokens: 1350 },
  ],
  tokenPerformance: [
    { month: "Jan", value: 100 },
    { month: "Feb", value: 105 },
    { month: "Mar", value: 102 },
    { month: "Apr", value: 110 },
    { month: "May", value: 115 },
    { month: "Jun", value: 118 },
    { month: "Jul", value: 125 },
    { month: "Aug", value: 130 },
  ],
  recommendedStudents: [
    {
      id: 1,
      name: "Emma Rodriguez",
      program: "Data Science",
      university: "Tech Institute",
      fundingGoal: 18000,
      currentFunding: 10000,
      projectedROI: 22,
      story: "Building AI solutions for healthcare",
    },
    {
      id: 2,
      name: "Jamal Williams",
      program: "Biotech",
      university: "Medical University",
      fundingGoal: 25000,
      currentFunding: 15000,
      projectedROI: 25,
      story: "Researching novel drug delivery systems",
    },
  ],
}

export default function InvestorDashboard() {
  const [portfolioProgress, setPortfolioProgress] = useState(0)
  const [totalInvested, setTotalInvested] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [portfolioROI, setPortfolioROI] = useState(0)

  useEffect(() => {
    // Set portfolio progress based on ROI (capped at 100)
    // setPortfolioProgress(Math.min(investorData.portfolioROI * 4, 100))
    const fetchData = async () => {
      try {
        const investorStatus = await getInvestorStatus()
        setTotalInvested(investorStatus.totalInvested)
        setPortfolioROI(investorStatus.portfolioROI)

        const tokenBalance = await getTokenBalance()
        setTokenBalance(tokenBalance)

        setPortfolioProgress(Math.min(investorStatus.portfolioROI * 4, 100))
      } catch (error) {
        console.error("Failed to fetch investor data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Coins className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">${totalInvested.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">EduToken Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{tokenBalance.toLocaleString()} EDU</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Portfolio ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{portfolioROI}%</span>
            </div>
            <Progress value={portfolioProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>EduToken Performance</CardTitle>
          <CardDescription>Token value over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={investorData.tokenPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="investments">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="investments">Recent Investments</TabsTrigger>
          <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Your Recent Investments</h3>
            <Link href="/dashboard/investor/investments">
              <Button variant="link" className="h-auto p-0">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {investorData.recentInvestments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{investment.student}</h4>
                      <p className="text-sm text-gray-500">
                        {investment.program} • {investment.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${investment.amount}</p>
                      <p className="text-sm text-gray-500">{investment.tokens} EDU</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href={`/dashboard/investor/student/${investment.id}`}>
                      <Button variant="ghost" size="sm">
                        View Updates
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">High-Potential Students</h3>
            <Link href="/dashboard/investor/browse">
              <Button variant="link" className="h-auto p-0">
                Browse All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investorData.recommendedStudents.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-gray-500">
                      {student.program} • {student.university}
                    </p>
                    <p className="mt-2 text-sm line-clamp-2">{student.story}</p>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>${student.currentFunding.toLocaleString()}</span>
                        <span>${student.fundingGoal.toLocaleString()}</span>
                      </div>
                      <Progress value={(student.currentFunding / student.fundingGoal) * 100} className="h-1.5" />
                    </div>

                    <div className="mt-3 flex items-center">
                      <BarChart3 className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">{student.projectedROI}% Projected ROI</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between items-center">
                    <Link href={`/dashboard/investor/student/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button size="sm">Invest</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Manage Your EduTokens</CardTitle>
          <CardDescription>Trade, stake, or sell your EduTokens to maximize your returns</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm">
            EduTokens represent your investment in students' futures. As students graduate and earn income, you receive
            returns proportional to your token holdings. You can trade tokens with other investors or hold them for
            long-term growth.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/investor/tokens" className="w-full">
            <Button className="w-full" variant="outline">
              View Token Details
            </Button>
          </Link>
          <Link href="/dashboard/investor/trade" className="w-full">
            <Button className="w-full">Trade Tokens</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

