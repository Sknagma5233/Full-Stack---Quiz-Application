"use client"
import Link from "next/link"
import { FaShieldAlt, FaTrophy, FaClock, FaFlask, FaLaptopCode, FaMobileAlt, FaNetworkWired } from "react-icons/fa"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-purple-400/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-indigo-500/10 rounded-full blur-md animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-purple-600/10 rounded-full blur-xl animate-pulse"></div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-1/4 left-1/2 w-16 h-16 border border-purple-400/20 rotate-45 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-blue-400/20 rotate-12 animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-20 h-20 border border-purple-300/15 rounded-full animate-pulse"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/5 to-transparent"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Relative positioning to content to appear above background */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Test Your Knowledge with
              <span className="text-purple-400 block mt-2">TechQuest</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sharpen your skills with exciting quizzes on Computer Science, Programming, Cybersecurity, and IT Fundamentals.
Pick your difficulty level, track your progress, and challenge yourself to become a true Tech Master!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/categories">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-md font-medium transition-colors inline-flex items-center">
                  Start Quiz Now
                  <span className="ml-2">→</span>
                </button>
              </Link>
              <button className="border border-gray-600 bg-transparent hover:bg-gray-800 text-gray-300 px-8 py-3 text-lg rounded-md font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

{/* Categories Preview */}
<section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-white mb-12">Choose Your Tech Domain</h2>
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      
      {/* Web Development Card */}
      <Link href="/categories">
        <div className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-gray-800 border border-gray-700 rounded-lg">
          <div className="bg-purple-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-800 transition-colors">
            <FaLaptopCode className="text-3xl text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">Web Development</h3>
          <p className="text-gray-300">Test your knowledge of HTML, CSS, JS, and modern frameworks.</p>
        </div>
      </Link>
      
      {/* App Development Card */}
      <Link href="/categories">
        <div className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-gray-800 border border-gray-700 rounded-lg">
          <div className="bg-purple-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-800 transition-colors">
            <FaMobileAlt className="text-3xl text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">App Development</h3>
          <p className="text-gray-300">Challenge yourself with mobile app development concepts and frameworks.</p>
        </div>
      </Link>
      
      {/* Cybersecurity Card */}
      <Link href="/categories/cybersecurity">
        <div className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-gray-800 border border-gray-700 rounded-lg">
          <div className="bg-purple-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-800 transition-colors">
            <FaShieldAlt className="text-3xl text-purple-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">Cybersecurity</h3>
          <p className="text-gray-300">Test your knowledge of ethical hacking, encryption, and security.</p>
        </div>
      </Link>

    </div>

    {/* See All Categories Button */}
    <div className="text-center">
      <Link href="/categories">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 text-lg rounded-md font-medium transition-colors">
          See All Categories
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* Features Section */}
<section className="py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose TechQuest?</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="p-6 text-center hover:shadow-lg transition-shadow bg-gray-900 border border-gray-700 rounded-lg">
        <div className="text-4xl text-purple-400 mb-4 flex justify-center">
          <FaLaptopCode />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">All Tech Domains</h3>
        <p className="text-gray-300">
          Explore Web, App, Networking, Cybersecurity, and other IT topics with curated quizzes.
        </p>
      </div>
      <div className="p-6 text-center hover:shadow-lg transition-shadow bg-gray-900 border border-gray-700 rounded-lg">
        <div className="text-4xl text-purple-400 mb-4 flex justify-center">
          <FaTrophy />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Difficulty Levels</h3>
        <p className="text-gray-300">
          Choose from Easy, Medium, or Hard to match your learning pace and challenge yourself.
        </p>
      </div>
      <div className="p-6 text-center hover:shadow-lg transition-shadow bg-gray-900 border border-gray-700 rounded-lg">
        <div className="text-4xl text-purple-400 mb-4 flex justify-center">
          <FaClock />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
        <p className="text-gray-300">Get immediate feedback with score analysis and improvement tips.</p>
      </div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Challenge Yourself?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of learners leveling up their tech skills every day with TechQuest.
          </p>
          <Link href="/categories">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-md font-medium transition-colors inline-flex items-center">
              Get Started Today <span className="ml-2">→</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-2">TechQuest - Test Your Knowledge</p>
          <p className="text-gray-400">Built with passion for technology and learning.</p>
        </div>
      </footer>
      </div>
    </div>
  )
}
