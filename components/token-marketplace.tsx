"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"
import { ArrowUpRight, ArrowUp, ArrowDown, Wallet, TrendingUp, BarChart3, DollarSign } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { buyTokens } from "@/lib/blockchain"
import Link from "next/link"

export function TokenMarketplace() {
  const [marketData, setMarketData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [estimatedTokens, setEstimatedTokens] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState("")
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("/api/token/market")
        const data = await response.json()
        setMarketData(data)
      } catch (error) {
        console.error("Error fetching market data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMarketData()
  }, [])

  // Calculate estimated tokens when purchase amount changes
  useEffect(() => {
    if (marketData && purchaseAmount) {
      const amount = Number.parseFloat(purchaseAmount)
      if (!isNaN(amount) && amount > 0) {
        const tokens = amount / marketData.currentPrice
        setEstimatedTokens(tokens)
      } else {
        setEstimatedTokens(0)
      }
    }
  }, [purchaseAmount, marketData])

  const handlePurchaseTokens = async () => {
    setError("")
    setIsPurchasing(true)

    try {
      if (!purchaseAmount || Number.parseFloat(purchaseAmount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      const result = await buyTokens(purchaseAmount)

      if (result.success) {
        alert(`Successfully purchased ${result.tokensMinted} EDU tokens!`)
        setPurchaseAmount("")
        setShowPurchaseDialog(false)
      }
    } catch (error) {
      console.error("Error purchasing tokens:", error)
      setError(error.message || "Failed to purchase tokens")
    } finally {
      setIsPurchasing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  if (!marketData) {
    return (
      <div className="py-12 text-center">
        <p>Failed to load market data. Please try again later.</p>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">EduToken Marketplace</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Invest in education by purchasing EduTokens. Use your tokens to support students and earn returns as they
            succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm font-medium">Current Price</span>
                </div>
                <div
                  className={`flex items-center ${marketData.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {marketData.priceChange24h >= 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="text-xs">{Math.abs(marketData.priceChange24h).toFixed(2)}%</span>
                </div>
              </div>
              <p className="text-2xl font-bold">${marketData.currentPrice.toFixed(4)}</p>
              <p className="text-xs text-gray-500">per EDU token</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-2">
                <Wallet className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Market Cap</span>
              </div>
              <p className="text-2xl font-bold">
                ${marketData.marketMetrics.marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-500">Total value of all tokens</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">Total Supply</span>
              </div>
              <p className="text-2xl font-bold">
                {marketData.marketMetrics.totalSupply.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-500">EDU tokens in circulation</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">24h Volume</span>
              </div>
              <p className="text-2xl font-bold">
                ${marketData.marketMetrics.dailyVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-500">Trading volume (last 24h)</p>
            </CardContent>
          </Card>
        </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle>Price History</CardTitle>
      <CardDescription>EduToken price over the last 30 days</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={marketData.chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis 
              dataKey="date" 
            />
            <YAxis 
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              width={60}
            />
            <Tooltip 
              formatter={(value) => [`$${parseFloat(value).toFixed(4)}`, "Price"]}
              contentStyle={{ 
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '1px solid #ddd'
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2, fill: "white" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>


              <div className="grid grid-cols-3 gap-4 mt-6">
                <div
                  className={`p-3 rounded-lg ${marketData.priceChange24h >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                >
                  <p className="text-xs text-gray-500">24h Change</p>
                  <p
                    className={`text-lg font-bold ${marketData.priceChange24h >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {marketData.priceChange24h >= 0 ? "+" : ""}
                    {marketData.priceChange24h.toFixed(2)}%
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${marketData.priceChange7d >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                >
                  <p className="text-xs text-gray-500">7d Change</p>
                  <p
                    className={`text-lg font-bold ${marketData.priceChange7d >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {marketData.priceChange7d >= 0 ? "+" : ""}
                    {marketData.priceChange7d.toFixed(2)}%
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg ${marketData.priceChange30d >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}
                >
                  <p className="text-xs text-gray-500">30d Change</p>
                  <p
                    className={`text-lg font-bold ${marketData.priceChange30d >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {marketData.priceChange30d >= 0 ? "+" : ""}
                    {marketData.priceChange30d.toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buy EduTokens</CardTitle>
              <CardDescription>Purchase tokens to invest in students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  EduTokens represent your investment in the platform. Use them to support students and earn returns as
                  they succeed in their careers.
                </p>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-1">Current Price</p>
                  <p className="text-2xl font-bold">${marketData.currentPrice.toFixed(4)}</p>
                  <p className="text-xs text-gray-500">per EDU token</p>
                </div>

                <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Buy Tokens</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Purchase EduTokens</DialogTitle>
                      <DialogDescription>Enter the amount you want to invest to purchase EduTokens</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="purchase-amount">Amount (USD)</Label>
                        <Input
                          id="purchase-amount"
                          type="number"
                          placeholder="0.00"
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(e.target.value)}
                        />
                      </div>

                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">You will receive approximately:</p>
                        <p className="text-xl font-bold">
                          {estimatedTokens.toLocaleString(undefined, { maximumFractionDigits: 4 })} EDU
                        </p>
                        <p className="text-xs text-muted-foreground">
                          at current price of ${marketData.currentPrice.toFixed(4)} per token
                        </p>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handlePurchaseTokens}
                        disabled={isPurchasing || !purchaseAmount || Number.parseFloat(purchaseAmount) <= 1}
                      >
                        {isPurchasing ? "Processing..." : "Purchase Tokens"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="pt-3">
                  <Link href="/dashboard/investor/tokens">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      View Token Dashboard <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

