"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search, Filter, GraduationCap, TrendingUp } from "lucide-react"

// Add the imports at the top of the file
import { donate, invest } from "@/lib/blockchain"

// Mock student data
const students = [
  {
    id: 1,
    name: "Emma Rodriguez",
    program: "Data Science",
    university: "Tech Institute",
    year: "3rd Year",
    fundingGoal: 18000,
    currentFunding: 10000,
    story:
      "I'm developing AI solutions for healthcare challenges. Your support will help me complete my degree and contribute to medical technology advancements.",
    projectedROI: 22,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Jamal Williams",
    program: "Biotech Engineering",
    university: "Medical University",
    year: "2nd Year",
    fundingGoal: 25000,
    currentFunding: 15000,
    story:
      "Researching novel drug delivery systems that could revolutionize treatment for chronic diseases. I need funding to continue my lab work.",
    projectedROI: 25,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Sophia Chen",
    program: "Renewable Energy",
    university: "Green College",
    year: "Final Year",
    fundingGoal: 12000,
    currentFunding: 8000,
    story:
      "Working on sustainable energy solutions to combat climate change. Your support will help me complete my final year project on solar efficiency.",
    projectedROI: 18,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    program: "Computer Engineering",
    university: "State University",
    year: "3rd Year",
    fundingGoal: 15000,
    currentFunding: 6000,
    story:
      "Building next-generation computing systems. I'm particularly focused on energy-efficient architectures for mobile devices.",
    projectedROI: 20,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Aisha Patel",
    program: "Medicine",
    university: "Health Sciences University",
    year: "2nd Year",
    fundingGoal: 30000,
    currentFunding: 18000,
    story:
      "Pursuing a medical degree with a focus on underserved communities. I plan to work in rural healthcare after graduation.",
    projectedROI: 15,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "David Kim",
    program: "Physics",
    university: "Research University",
    year: "PhD Candidate",
    fundingGoal: 20000,
    currentFunding: 12000,
    story:
      "Researching quantum computing applications that could transform data security and computational capabilities.",
    projectedROI: 28,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedUniversity, setSelectedUniversity] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [fundingType, setFundingType] = useState("donation")
  const [fundingAmount, setFundingAmount] = useState("")
  const [showFundingDialog, setShowFundingDialog] = useState(false)

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.story.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesField = selectedField === "all" || student.program.toLowerCase().includes(selectedField.toLowerCase())

    const matchesUniversity = selectedUniversity === "all" || student.university === selectedUniversity

    return matchesSearch && matchesField && matchesUniversity
  })

  const handleFundStudent = (student: any) => {
    setSelectedStudent(student)
    setShowFundingDialog(true)
  }

  // Update the handleSubmitFunding function to use the blockchain integration

  const handleSubmitFunding = async () => {
    try {
      if (!fundingAmount || Number.parseFloat(fundingAmount) <= 0) {
        alert("Please enter a valid amount")
        return
      }

      if (fundingType === "donation") {
        const result = await donate(selectedStudent.address, fundingAmount)
        if (result.success) {
          alert(`Donation of $${fundingAmount} to ${selectedStudent.name} processed successfully!`)
        }
      } else {
        const result = await invest(selectedStudent.address, fundingAmount)
        if (result.success) {
          alert(
            `Investment of $${fundingAmount} to ${selectedStudent.name} processed successfully! You received ${result.tokensMinted} EduTokens.`,
          )
        }
      }

      setShowFundingDialog(false)
      setFundingAmount("")
      setFundingType("donation")
    } catch (error) {
      console.error("Error processing funding:", error)
      alert("Transaction failed. Please check your wallet and try again.")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Students</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Support students by donating or investing in their education
          </p>
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Students</DialogTitle>
                <DialogDescription>Narrow down students based on your preferences</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Select value={selectedField} onValueChange={setSelectedField}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fields</SelectItem>
                      <SelectItem value="computer">Computer Science</SelectItem>
                      <SelectItem value="medicine">Medicine</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>University</Label>
                  <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select university" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Universities</SelectItem>
                      <SelectItem value="Tech Institute">Tech Institute</SelectItem>
                      <SelectItem value="Medical University">Medical University</SelectItem>
                      <SelectItem value="Green College">Green College</SelectItem>
                      <SelectItem value="State University">State University</SelectItem>
                      <SelectItem value="Health Sciences University">Health Sciences University</SelectItem>
                      <SelectItem value="Research University">Research University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={() => {
                    setSelectedField("all")
                    setSelectedUniversity("all")
                  }}
                  variant="outline"
                >
                  Reset Filters
                </Button>
                <Button type="submit">Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="nearly-funded">Nearly Funded</TabsTrigger>
          <TabsTrigger value="high-roi">High ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} onFund={handleFundStudent} />
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">No students found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search or filters to find students to support.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents
              .sort((a, b) => b.currentFunding / b.fundingGoal - a.currentFunding / a.fundingGoal)
              .slice(0, 6)
              .map((student) => (
                <StudentCard key={student.id} student={student} onFund={handleFundStudent} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="nearly-funded" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents
              .filter((student) => student.currentFunding / student.fundingGoal >= 0.5) // Changed from 0.7 to 0.5
              .map((student) => (
                <StudentCard key={student.id} student={student} onFund={handleFundStudent} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="high-roi" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents
              .sort((a, b) => b.projectedROI - a.projectedROI)
              .slice(0, 6)
              .map((student) => (
                <StudentCard key={student.id} student={student} onFund={handleFundStudent} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Funding Dialog */}
      {selectedStudent && (
        <Dialog open={showFundingDialog} onOpenChange={setShowFundingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Support {selectedStudent.name}</DialogTitle>
              <DialogDescription>Choose how you'd like to support this student's education</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedStudent.image || "/placeholder.svg"}
                  alt={selectedStudent.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.program} • {selectedStudent.university}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Funding Type</Label>
                <RadioGroup value={fundingType} onValueChange={setFundingType}>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="donation" id="donation" />
                    <Label htmlFor="donation" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Donation</span>
                      <span className="text-xs text-gray-500">Support with no expected financial return</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="investment" id="investment" />
                    <Label htmlFor="investment" className="flex flex-col cursor-pointer">
                      <span className="font-medium">Investment</span>
                      <span className="text-xs text-gray-500">
                        Receive EduTokens with potential {selectedStudent.projectedROI}% ROI
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFundingDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitFunding} disabled={!fundingAmount || Number.parseFloat(fundingAmount) <= 0}>
                {fundingType === "donation" ? "Donate" : "Invest"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function StudentCard({ student, onFund }: { student: any; onFund: (student: any) => void }) {
  const fundingProgress = (student.currentFunding / student.fundingGoal) * 100

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img src={student.image || "/placeholder.svg"} alt={student.name} className="w-full h-48 object-cover" />

        <div className="p-4">
          <h3 className="font-bold text-lg">{student.name}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {student.program} • {student.university} • {student.year}
          </p>

          <p className="text-sm mb-4 line-clamp-3">{student.story}</p>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>${student.currentFunding.toLocaleString()}</span>
              <span>${student.fundingGoal.toLocaleString()}</span>
            </div>
            <Progress value={fundingProgress} className="h-2" />
            <p className="text-xs text-right mt-1 text-gray-500">{fundingProgress.toFixed(0)}% funded</p>
          </div>

          {student.projectedROI && (
            <div className="flex items-center mb-4">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">{student.projectedROI}% Projected ROI</span>
            </div>
          )}

          <div className="flex gap-2">
            <Link href={`/student/${student.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </Link>
            <Button className="flex-1" onClick={() => onFund(student)}>
              Support
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

