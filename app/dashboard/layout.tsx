"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { BarChart3, GraduationCap, Heart, Home, LogOut, Settings, TrendingUp, User, Wallet } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userType, setUserType] = useState("student") // Can be "student", "donor", or "investor"

  // For demo purposes, detect user type from URL
  // In a real app, this would come from authentication
  useState(() => {
    if (pathname.includes("/dashboard/donor")) {
      setUserType("donor")
    } else if (pathname.includes("/dashboard/investor")) {
      setUserType("investor")
    } else {
      setUserType("student")
    }
  })

  const studentMenuItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Funding Status", href: "/dashboard/funding", icon: BarChart3 },
    { name: "Milestones", href: "/dashboard/milestones", icon: GraduationCap },
  ]

  const donorMenuItems = [
    { name: "Overview", href: "/dashboard/donor", icon: Home },
    { name: "Browse Students", href: "/dashboard/donor/browse", icon: GraduationCap },
    { name: "My Donations", href: "/dashboard/donor/donations", icon: Heart },
    { name: "Impact", href: "/dashboard/donor/impact", icon: BarChart3 },
  ]

  const investorMenuItems = [
    { name: "Overview", href: "/dashboard/investor", icon: Home },
    { name: "Browse Students", href: "/dashboard/investor/browse", icon: GraduationCap },
    { name: "My Investments", href: "/dashboard/investor/investments", icon: TrendingUp },
    { name: "EduTokens", href: "/dashboard/investor/tokens", icon: Wallet },
  ]

  // Select menu items based on user type
  const menuItems =
    userType === "donor" ? donorMenuItems : userType === "investor" ? investorMenuItems : studentMenuItems

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="p-2">
            <h2 className="text-lg font-bold">
              {userType === "student"
                ? "Student Dashboard"
                : userType === "donor"
                  ? "Donor Dashboard"
                  : "Investor Dashboard"}
            </h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/auth/logout">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4 text-xs text-gray-500">
            <p>© 2025 EduFund Platform</p>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </SidebarProvider>
  )
}

