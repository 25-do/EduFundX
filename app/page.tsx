import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, GraduationCap, Heart, TrendingUp } from "lucide-react"

export default function Home() {
  // Sample success stories
  const successStories = [
    {
      id: 1,
      name: "Sarah Johnson",
      degree: "Computer Science",
      story: "Received funding for my final year and now working at Google.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Michael Chen",
      degree: "Mechanical Engineering",
      story: "Investors funded my education and I've returned 20% through my career.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Aisha Patel",
      degree: "Medicine",
      story: "Donors helped me complete medical school. Now I serve underrepresented communities.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Fund Education, Change Lives</h1>
              <p className="text-lg mb-8">
                Connect students with donors and investors to make education accessible and create opportunities for
                everyone.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/browse">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Browse Students
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Students graduating"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">1,200+</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Students Funded</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">$5.2M</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Total Donations</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">18%</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">Average ROI for Investors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <img src={story.image || "/placeholder.svg"} alt={story.name} className="w-full h-48 object-cover" />
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-1">{story.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{story.degree}</p>
                  <p className="mb-4">{story.story}</p>
                  <Button variant="link" className="p-0 h-auto">
                    Read full story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a student seeking funding, a donor looking to help, or an investor interested in EduTokens,
            join our platform today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Students
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

