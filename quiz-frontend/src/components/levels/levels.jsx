"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";;

export default function Levels() {
  const token = useAuth();
  const router = useRouter();
  const [levels, setLevels] = useState([]);
  const params = useParams();
  const { category } = params;

  const url = `/categories/${category}/levels`;

  const getLevelsByCategory = async () => {
    try {
      const response = await axiosInstance.get(url);
      console.log(response.data.levels);
      setLevels(response.data.levels);
    } catch (error) {
      console.log("Error fetching levels", error.message);
    }
  };


  useEffect(() => {
    getLevelsByCategory();
  }, []);

  const handleLevelClick = (levelId) => {
    if (!token) {
      toast.error("You need to log in to access questions");
      router.push("/login"); 
      return;
    }
    router.push(`/categories/${category}/levels/${levelId}/quiz`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="pt-12 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          
           <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-700">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-gray-300 font-medium">Choose your difficulty level</span>
            </div>
          </div>

          {/* Level Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {levels.map((level) => (
              <div
                key={level._id}
                onClick={() => handleLevelClick(level._id)}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-600`}
                >
                  {/* Difficulty Stars */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      {(() => {
                        const difficultyMap = {
                          Easy: 1,
                          Medium: 2,
                          Hard: 3,
                        };
                        const difficulty = difficultyMap[level.name] || 1; 

                        return [...Array(3)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < difficulty
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ));
                      })()}
                    </div>

                    <div
                      className={`w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {(() => {
                        const difficultyMap = { Easy: 1, Medium: 2, Hard: 3 };
                        return difficultyMap[level.name] || 1;
                      })()}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {level.name}
                  </h3>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {level.totalQuestions}
                      </div>
                      <div className="text-sm text-gray-300">Questions</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {level.name === "Easy"
                          ? "2 min"
                          : level.name === "Medium"
                          ? "4 min"
                          : level.name === "Hard"
                          ? "6 min"
                          : "-"}
                      </div>
                      <div className="text-sm text-gray-300">Time Limit</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-semibold group-hover:text-purple-300">
                      Start {level.name} Quiz
                    </span>
                    <svg
                      className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">Quiz Tips</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    Manage Your Time
                  </h4>
                  <p className="text-sm text-gray-300">
                    Keep track of the timer and pace yourself accordingly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    Read Carefully
                  </h4>
                  <p className="text-sm text-gray-300">
                    Take time to understand each question before answering.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    Trust Your Instincts
                  </h4>
                  <p className="text-sm text-gray-300">
                    Your first answer is often the correct one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
