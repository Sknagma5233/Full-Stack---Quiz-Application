"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import {
  FaStar,
  FaRedo,
  FaArrowRight,
  FaHome,
  FaMedal,
  FaTrophy,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";

export default function Results() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = params.category;
  const level = params.level;
  const resultId = searchParams.get("resultId");
  const timeTaken = searchParams.get("timeTaken");

  const [result, setResult] = useState(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  const timeTakenSeconds = Number(timeTaken);

  // Fetch result from backend
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axiosInstance.get(`/results/levels/${level}`);
        const recent = res.data.results.find((r) => r._id === resultId);
        if (recent) setResult(recent);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };
    if (resultId) fetchResult();
  }, [level, resultId]);

  // Animate numbers
  useEffect(() => {
    if (!result) return;
    const score = result.score;
    const percentage = Math.round((result.score / result.total) * 100);

    const scoreTimer = setTimeout(() => {
      let current = 0;
      const increment = score / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 50);
    }, 500);

    const percentageTimer = setTimeout(() => {
      let current = 0;
      const increment = percentage / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          setAnimatedPercentage(percentage);
          clearInterval(timer);
        } else {
          setAnimatedPercentage(Math.floor(current));
        }
      }, 50);
    }, 800);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(percentageTimer);
    };
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <p className="text-xl text-gray-300 animate-pulse">
          Loading Results...
        </p>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);

  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        title: "Outstanding!",
        message: "You've mastered this topic! Your knowledge is exceptional.",
        color: "text-green-400",
        bgColor: "bg-green-600/20",
        borderColor: "border-green-500",
        icon: <FaTrophy className="text-6xl text-green-400" />,
        stars: 5,
      };
    } else if (percentage >= 75) {
      return {
        title: "Great Job!",
        message: "You have a solid understanding of this subject. Keep it up!",
        color: "text-blue-400",
        bgColor: "bg-blue-600/20",
        borderColor: "border-blue-500",
        icon: <FaMedal className="text-6xl text-blue-400" />,
        stars: 4,
      };
    } else if (percentage >= 60) {
      return {
        title: "Good Effort!",
        message:
          "You're on the right track. A bit more practice will help you improve.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-600/20",
        borderColor: "border-yellow-500",
        icon: <FaChartLine className="text-6xl text-yellow-400" />,
        stars: 3,
      };
    } else {
      return {
        title: "Keep Learning!",
        message:
          "Don’t give up! Every expert was once a beginner. Try again and you'll improve.",
        color: "text-orange-400",
        bgColor: "bg-orange-600/20",
        borderColor: "border-orange-500",
        icon: <FaBookOpen className="text-6xl text-orange-400" />,
        stars: 2,
      };
    }
  };

  const performance = getPerformanceData();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: performance.stars }, (_, i) => (
              <FaStar
                key={i}
                className="text-3xl text-yellow-400 drop-shadow-md"
              />
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            {performance.title}
          </h1>
          <p className="text-lg text-gray-300">{performance.message}</p>
        </div>

        {/* Main Results Card */}
        <div
          className={`rounded-2xl shadow-xl p-10 mb-10 border-2 ${performance.borderColor} ${performance.bgColor} backdrop-blur-lg`}
        >
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              {performance.icon}
            </div>

            {/* Score Display */}
          <div className="grid md:grid-cols-4 gap-10">
  {/* Correct Answers */}
  <div className="text-center">
    <div className="text-5xl font-bold text-purple-400 mb-2">
      {animatedScore}
    </div>
    <div className="text-gray-300">out of {result.total}</div>
    <p className="text-sm text-gray-400">Correct Answers</p>
  </div>

  {/* Score */}
  <div className="text-center">
    <div className="text-5xl font-bold text-purple-400 mb-2">
      {animatedPercentage}%
    </div>
    <div className="text-gray-300">Score</div>
    <div className="w-full bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
      <div
        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${animatedPercentage}%` }}
      ></div>
    </div>
  </div>

  {/* Completed On */}
  <div className="text-center">
    <div className="text-lg font-semibold text-purple-300 mb-2">
      {result.createdAt
        ? new Date(result.createdAt).toLocaleDateString()
        : "—"}
    </div>
    <div className="text-gray-300">Completed On</div>
    <p className="text-sm text-gray-400">Quiz attempt date</p>
  </div>

  {/* Time Taken */}
  <div className="text-center">
    <div className="text-lg font-semibold text-purple-300 mb-2">
      {timeTakenSeconds ? `${Math.floor(timeTakenSeconds / 60)} min ${timeTakenSeconds % 60} sec` : "—"}
    </div>
    <div className="text-gray-300">Time Taken</div>
    <p className="text-sm text-gray-400">Duration of your quiz attempt</p>
  </div>
</div>

          </div>

          {/* Quiz Details */}
          <div className="flex items-center justify-center gap-4">
            <span className="px-4 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
              {result.category?.name}
            </span>
            <span className="px-4 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium">
              {result.level?.name} Level
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <Link href={`/categories/${category}/levels/${level}/quiz`}>
            <button className="w-full h-16 text-lg border-2 border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent rounded-xl transition-all duration-300 flex items-center justify-center gap-3">
              <FaRedo /> Retake Quiz
            </button>
          </Link>
          <Link href="/categories">
            <button className="w-full h-16 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-3">
              <FaArrowRight /> Try Another Category
            </button>
          </Link>
        </div>

        {/* Breakdown + Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-800/70 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartLine /> Performance Breakdown
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Correct Answers</span>
                <span className="font-semibold text-green-400">
                  {result.score}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Incorrect Answers</span>
                <span className="font-semibold text-red-400">
                  {result.wrong ?? result.total - result.score}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Skipped Questions</span>
                <span className="font-semibold text-yellow-400">
                  {result.skipped ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-300">Accuracy Rate</span>
                <span className="font-semibold text-purple-400">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/70 rounded-xl shadow-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaBookOpen /> Next Steps
            </h3>
            <div className="space-y-3">
              {percentage >= 80 ? (
                <>
                  <p className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400">•</span> Try a harder
                    difficulty level
                  </p>
                  <p className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400">•</span> Explore other
                    categories
                  </p>
                </>
              ) : (
                <>
                  <p className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400">•</span> Review the topics
                    you missed
                  </p>
                  <p className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400">•</span> Retake the quiz
                    to improve
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="flex justify-center">
          <Link href="/">
            <button className="flex items-center gap-2 px-5 py-2 text-gray-300 hover:text-white transition-colors text-lg">
              <FaHome /> Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
