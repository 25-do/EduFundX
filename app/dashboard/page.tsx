"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { InfoIcon, CheckCircle2 } from "lucide-react"
import { claimRevenue } from "@/lib/blockchain"

// Mock student data
const studentData = {
  name: "Alex Johnson",
  program: "Computer Science",
  university: "Tech University",
  graduationYear: 2026,
  fundingGoal: 20000,
  currentFunding: 12500,
  donorFunding: 5000,
  investorFunding: 7500,
  milestones: [
    { id: 1, title: "First Semester", completed: true, date: "Jan 2024" },
    { id: 2, title: "Second Semester", completed: true, date: "Jun 2024" },
    { id: 3, title: "Third Semester", completed: false, date: "Dec 2024" },
    { id: 4, title: "Final Year Project", completed: false, date: "Jun 2025" },
  ],
  updates: [
    { id: 1, date: "Jul 15, 2024", content: "Completed summer internship at Tech Corp with excellent feedback." },
    { id: 2, date: "Jun 30, 2024", content: "Finished second semester with a 3.8 GPA." },
  ],
}

export default function StudentDashboard() {
  const [fundingProgress, setFundingProgress] = useState(0)
  const [pendingRevenue, setPendingRevenue] = useState(0)

  useEffect(() => {
    // Calculate funding progress percentage
    const progress = (studentData.currentFunding / studentData.fundingGoal) * 100
    setFundingProgress(progress)

    // Simulate fetching pending revenue from smart contract
    const fetchPendingRevenue = async () => {
      // In a real app, this would call the smart contract
      // const { pendingRevenue } = await getStudentStatus(studentAddress);
      setPendingRevenue(250) // Mock value
    }

    fetchPendingRevenue()
  }, [])

  const handleClaimRevenue = async () => {
    try {
      // Call the smart contract to claim revenue
      const result = await claimRevenue()

      if (result.success) {
        alert(`Revenue claimed successfully! Amount: $${result.amount}`)
        setPendingRevenue(0)
      }
    } catch (error) {
      console.error("Error claiming revenue:", error)
      alert("Failed to claim revenue. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Funding Status</CardTitle>
            <CardDescription>Your current funding progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">${studentData.currentFunding.toLocaleString()}</span>
                <span className="text-sm text-gray-500">${studentData.fundingGoal.toLocaleString()}</span>
              </div>
              <Progress value={fundingProgress} className="h-2" />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Donations</p>
                  <p className="text-xl font-bold">${studentData.donorFunding.toLocaleString()}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Investments</p>
                  <p className="text-xl font-bold">${studentData.investorFunding.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>Your academic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {studentData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{studentData.name}</h3>
                  <p className="text-sm text-gray-500">{studentData.program}</p>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">University</span>
                  <span className="font-medium">{studentData.university}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Graduation Year</span>
                  <span className="font-medium">{studentData.graduationYear}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {pendingRevenue > 0 && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Revenue Available</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>You have ${pendingRevenue} in pending revenue to claim.</span>
            <Button onClick={handleClaimRevenue} size="sm">
              Claim Now
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="milestones">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Academic Progress</h3>
            <span className="text-sm text-gray-500">
              {studentData.milestones.filter((m) => m.completed).length} of {studentData.milestones.length} completed
            </span>
          </div>

          <div className="space-y-4">
            {studentData.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`p-4 border rounded-lg flex items-center gap-4 ${
                  milestone.completed
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800/50"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    milestone.completed ? "bg-green-100 dark:bg-green-800" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <span className="text-sm font-medium">{milestone.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-500">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="updates" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Updates</h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Post Update</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post Update to Donors & Investors</DialogTitle>
                  <DialogDescription>
                    Share your progress, achievements, or important news with your supporters.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-title">Title</Label>
                    <Input id="update-title" placeholder="e.g., Completed First Semester" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-content">Update Details</Label>
                    <Textarea
                      id="update-content"
                      placeholder="Share details about your progress, achievements, or challenges..."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Post Update</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {studentData.updates.length > 0 ? (
              studentData.updates.map((update) => (
                <Card key={update.id}>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-500 mb-2">{update.date}</p>
                    <p>{update.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>No updates yet</AlertTitle>
                <AlertDescription>
                  Post your first update to keep your supporters informed about your progress.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Funding Request</CardTitle>
          <CardDescription>Request additional funding or update your funding goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="funding-amount">Amount Needed ($)</Label>
              <Input id="funding-amount" type="number" placeholder="5000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="funding-reason">Reason for Funding</Label>
              <Textarea
                id="funding-reason"
                placeholder="Explain why you need additional funding and how it will be used..."
                className="min-h-[100px]"
              />
            </div>
            <Button className="w-full">Submit Funding Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

