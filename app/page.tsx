"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { ImageViewer } from "@/components/image-viewer"

interface UserProfile {
  id: string
  name: string
  email: string
  profilePhoto?: string
}

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userJSON = localStorage.getItem("currentUser")
    if (userJSON) {
      setUser(JSON.parse(userJSON))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="w-full py-4 px-6 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">Money Records</h1>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto || "/placeholder.svg"}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-contain bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsImageViewerOpen(true)
                      }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/accounts">Accounts</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12">
        <div className="max-w-3xl w-full text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Money Records</h1>
          <p className="text-xl text-gray-600">
            Create professional receipts and maintain accounts for your business in seconds
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/create">
              <Button size="lg" className="font-medium">
                Create Receipt <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/accounts">
              <Button size="lg" className="font-medium">
                Accounts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {user?.profilePhoto && (
        <ImageViewer
          src={user.profilePhoto || "/placeholder.svg"}
          alt={user.name}
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
        />
      )}
    </div>
  )
}
