"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { FaBrain, FaUserCircle } from "react-icons/fa"
import { useAuth } from "@/context/AuthContext"
import toast from "react-hot-toast"

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
  ]

  const linkClass = (href) =>
    `px-3 py-2 font-medium transition-colors ${
      pathname === href
        ? "text-purple-400"
        : "text-gray-300 hover:text-purple-400"
    }`

  const handleLogout = () => {
    logout()
    toast.success("Log out successfully")
    router.push("/login")
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <FaBrain className="text-2xl text-purple-500" />
          <span className="text-xl font-bold text-white">TechQuest</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className={linkClass(item.href)}>
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <FaUserCircle className="text-xl" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-purple-400 focus:outline-none text-xl"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
{isMenuOpen && (
  <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 pt-4 pb-6 space-y-4 flex flex-col">
    {navItems.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={`${linkClass(item.href)} block pl-2`}
        onClick={() => setIsMenuOpen(false)}
      >
        {item.name}
      </Link>
    ))}

    {isLoggedIn ? (
      <button
        onClick={() => {
          handleLogout()
          setIsMenuOpen(false)
        }}
        className="text-gray-300 hover:text-purple-400 transition-colors text-left pl-2"
      >
        Logout
      </button>
    ) : (
      <Link
        href="/login"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium block w-full text-center"
        onClick={() => setIsMenuOpen(false)}
      >
        Login
      </Link>
    )}
  </div>
)}

    </nav>
  )
}
