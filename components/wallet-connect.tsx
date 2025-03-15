"use client"

// Create a new component for wallet connection

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { connectWallet } from "@/lib/blockchain"

export function WalletConnect() {
  const [wallet, setWallet] = useState({
    address: "",
    isConnected: false,
    chainId: 0,
  })
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            const walletInfo = await connectWallet()
            setWallet(walletInfo)
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const walletInfo = await connectWallet()
      setWallet(walletInfo)
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.")
    } finally {
      setIsConnecting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div>
      {wallet.isConnected ? (
        <Button variant="outline" className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          {formatAddress(wallet.address)}
        </Button>
      ) : (
        <Button onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  )
}

