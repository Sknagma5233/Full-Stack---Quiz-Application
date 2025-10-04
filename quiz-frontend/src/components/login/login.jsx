"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axiosInstance from "@/utils/axiosInstance"
import { useAuth } from "@/context/AuthContext"
import toast from "react-hot-toast"
import { FaBrain } from "react-icons/fa"

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isLogin) {
      try {
        const response = await axiosInstance.post("/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
        toast.success("User registered successfully!")
        setIsLogin(true)
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
        console.error(error.response?.data?.message || error.message)
      }
      return
    }
    // ---------- Login ----------
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: formData.email,
        password: formData.password,
      })

      const token = data.accessToken
      login(token)

      toast.success("Login successfully!", { duration: 4000 })
      router.push("/")
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
      console.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full gap-2 p-4">
            {[...Array(144)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg ${i % 3 === 0 ? "bg-purple-500" : i % 5 === 0 ? "bg-blue-500" : "bg-gray-600"}`}
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animation: "pulse 4s infinite",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl backdrop-blur-sm border border-purple-500/20 rotate-12"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-2xl backdrop-blur-sm border border-blue-500/20 -rotate-12"></div>
      <div className="absolute top-1/2 left-8 w-16 h-16 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm border border-green-500/20 rotate-45"></div>
      <div className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl backdrop-blur-sm border border-purple-500/20 -rotate-6"></div>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left Side - Branding & Marketing Content */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 relative">
          {/* Brand Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center mr-6 shadow-2xl">
                <span className="text-4xl text-white">
                  <FaBrain />
                </span>
              </div>
              <div className="text-left">
                <h1 className="text-5xl font-bold text-white mb-2">TechQuest</h1>
                <p className="text-gray-400 text-xl">Learn • Test • Excel</p>
              </div>
            </div>
          </div>

          {/* Marketing Content */}
          <div className="max-w-lg text-center space-y-8">
            <h2 className="text-3xl font-bold text-white leading-tight">
              {"Join thousands of learners improving their knowledge"}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Master new skills through interactive quizzes, track your progress, and compete with learners worldwide.
              Your learning journey starts here.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-300">Interactive learning experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Track your progress and achievements</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Compete with learners globally</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-lg">
            {/* Mobile Brand Header (visible only on mobile) */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                  <span className="text-2xl text-white">
                    <FaBrain />
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">TechQuest</h1>
                  <p className="text-gray-400">Learn • Test • Excel</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 shadow-2xl">
              <div className="space-y-6">
                {/* Form Header */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">{isLogin ? "Welcome Back!" : "Join TechQuest"}</h2>
                  <p className="text-gray-400">
                    {isLogin ? "Sign in to continue your learning journey" : "Create your account and start learning"}
                  </p>
                </div>

                {/* Toggle Buttons */}
                <div className="flex bg-gray-800 rounded-xl p-1.5 border border-gray-700">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 cursor-pointer py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isLogin
                        ? "bg-purple-600 text-white shadow-lg transform scale-[1.02]"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 cursor-pointer py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      !isLogin
                        ? "bg-purple-600 text-white shadow-lg transform scale-[1.02]"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required={!isLogin}
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                        placeholder="Enter your password"
                      />
                    </div>

                    {!isLogin && (
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          required={!isLogin}
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                          placeholder="Confirm your password"
                        />
                      </div>
                    )}
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <Link
                        href="/login"
                        className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {isLogin ? "Sign In to TechQuest" : "Create My Account"}
                  </button>

                  {!isLogin && (
                    <p className="text-xs text-gray-400 text-center leading-relaxed">
                      By creating an account, you agree to our{" "}
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300 font-medium">
                        Privacy Policy
                      </Link>
                    </p>
                  )}
                </form>

                {/* Back link */}
                <div className="text-center pt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-200 font-medium"
                  >
                    <span className="mr-2">←</span>
                    Back to TechQuest
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
