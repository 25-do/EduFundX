"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowUpRight, GraduationCap, Heart, TrendingUp } from "lucide-react"

// Mock donor data
const donorData = {
  totalDonated: 7500,
  studentsSupported: 12,
  impactScore: 85,
  recentDonations: [
    { id: 1, student: "Maria Chen", amount: 500, date: "Aug 15, 2024", program: "Medicine" },
    { id: 2, student: "James Wilson", amount: 1000, date: "Jul 28, 2024", program: "Engineering" },
    { id: 3, student: "Sophia Lee", amount: 750, date: "Jul 10, 2024", program: "Computer Science" },
  ],
  recommendedStudents: [
    {
      id: 1,
      name: "David Kim",
      program: "Physics",
      university: "State University",
      fundingGoal: 15000,
      currentFunding: 9000,
      story: "Researching quantum computing applications",
    },
    {
      id: 2,
      name: "Aisha Patel",
      program: "Environmental Science",
      university: "Green College",
      fundingGoal: 12000,
      currentFunding: 5000,
      story: "Working on sustainable energy solutions",
    },
  ],
}

export default function DonorDashboard() {
  const [impactProgress, setImpactProgress] = useState(0)

  useEffect(() => {
    setImpactProgress(donorData.impactScore)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">${donorData.totalDonated.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Students Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{donorData.studentsSupported}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Impact Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{donorData.impactScore}/100</span>
            </div>
            <Progress value={impactProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">Recent Donations</TabsTrigger>
          <TabsTrigger value="recommended">Recommended Students</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Your Recent Donations</h3>
            <Link href="/dashboard/donor/donations">
              <Button variant="link" className="h-auto p-0">
                View All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {donorData.recentDonations.map((donation) => (
              <Card key={donation.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{donation.student}</h4>
                    <p className="text-sm text-gray-500">
                      {donation.program} • {donation.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${donation.amount}</p>
                    <Link href={`/dashboard/donor/student/${donation.id}`}>
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

        <TabsContent value="recommended" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Students You Might Support</h3>
            <Link href="/dashboard/donor/browse">
              <Button variant="link" className="h-auto p-0">
                Browse All <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {donorData.recommendedStudents.map((student) => (
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
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-between items-center">
                    <Link href={`/dashboard/donor/student/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View Profile
                      </Button>
                    </Link>
                    <Button size="sm">Donate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Make a Difference Today</CardTitle>
          <CardDescription>
            Find students who need your support and help them achieve their educational goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm">
            Your donations directly impact students' lives, helping them overcome financial barriers to education.
            Browse our curated list of students or search for specific fields of study.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/donor/browse" className="w-full">
            <Button className="w-full">Browse Students</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

