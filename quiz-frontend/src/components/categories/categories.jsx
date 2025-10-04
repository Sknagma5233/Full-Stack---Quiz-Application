"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import axiosInstance from "@/utils/axiosInstance"
import toast from 'react-hot-toast'

// const categories = [
//   {
//     id: "science",
//     title: "Science",
//     description: "Explore the wonders of physics, chemistry, and biology",
//     icon: "🔬",
//     color: "from-blue-500 to-cyan-500",
//     stats: { questions: 150, avgTime: "2 min", difficulty: "Mixed" },
//     topics: ["Physics", "Chemistry", "Biology", "Earth Science"],
//   },
//   {
//     id: "computer",
//     title: "Computer Science",
//     description: "Test your programming and technology knowledge",
//     icon: "💻",
//     color: "from-green-500 to-emerald-500",
//     stats: { questions: 200, avgTime: "3 min", difficulty: "Mixed" },
//     topics: ["Programming", "Algorithms", "Data Structures", "Web Development"],
//   },
//   {
//     id: "maths",
//     title: "Mathematics",
//     description: "Challenge yourself with numbers, equations, and logic",
//     icon: "🧮",
//     color: "from-purple-500 to-pink-500",
//     stats: { questions: 180, avgTime: "4 min", difficulty: "Mixed" },
//     topics: ["Algebra", "Geometry", "Calculus", "Statistics"],
//   },
// ]

export default function Categories() {
  const [categories, setCategories] = useState([])

 const url = `/categories`

const getAllCategories = async() => {
  try {
    const response = await axiosInstance.get(url)
    console.log(response.data.categories)
    setCategories(response.data.categories)

  } catch (error) {
    toast.error(error.message)
    console.log("Error fetching categories",error.message)
  }
}

useEffect(()=>{
  getAllCategories()
},[])

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your
            <span className="text-purple-400 block mt-2">Subject</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Choose a field from the world of Information Technology. Each category offers different levels to challenge your skills and grow your knowledge.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              return (
                <div
                  key={category._id}
                  className="group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-gray-700 border-purple-400 bg-gray-800 rounded-xl"
                >
                  <div className="relative p-8">
                    

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold  mb-3 text-center text-purple-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-center mb-6 leading-relaxed">{category.description}</p>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400">👥</span>
                          <span className="text-gray-300">{category.totalQuestions || 0} Questions</span>
                        </div>
                       
                      </div>
                      {/* <div className="flex items-center justify-center gap-2">
                        <span className="text-purple-400">🏆</span>
                        <span className="text-gray-300 text-sm">{category.stats.difficulty} Levels</span>
                      </div> */}
                    </div>

                    {/* Topics */}
                    <div className="mb-6">
                      <p className="text-sm font-medium text-white mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {category.topicsCovered.map((topic) => (
                          <span
                            key={topic}
                            className="px-3 py-1 text-gray-300 text-xs rounded-full bg-purple-600 group-hover:text-white transition-colors duration-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/categories/${category._id}/levels`}>
                      <button className="w-full  bg-gray-700 hover:bg-gray-800 cursor-pointer text-purple-400 py-3 px-4 rounded-lg font-medium group-hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2">
                        Start {category.name} Quiz
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Try our mixed quiz that combines questions from all categories to test your overall knowledge.
          </p>
          <button className="px-8 py-3 text-lg border-2 border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mx-auto">
            Take Mixed Quiz
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-2">QuizMaster - Test Your Knowledge</p>
          <p className="text-gray-400">Built with passion for learning and education.</p>
        </div>
      </footer>
    </div>
  )
}
