"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Quiz() {
  const { category, level } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [progress, setProgress] = useState(0);
  const [levelName, setLevelName] = useState("");

  const warningThresholds = {
  easy: 60, 
  medium: 120,
  hard: 180    
}
  const warningTime = levelName
    ? warningThresholds[levelName.toLowerCase()] || 300
    : 300;

  // Start time
  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const getLevel = async () => {
      try {
        const res = await axiosInstance(`/categories/${category}/levels`);
        console.log(res.data.levels);
        const levelsArray = res.data.levels;

        const currentLevel = levelsArray.find((l) => l._id === level);

        if (currentLevel) {
          setLevelName(currentLevel.name);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getLevel();
  }, [level, category]);

  // Fetch questions
  const url = `/questions/levels/${level}`;
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await axiosInstance(url);
        setQuestions(response.data.data);
        setSelectedAnswers(new Array(response.data.data.length).fill(-1));
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    getAllQuestions();
  }, [category, level]);

  // Timer countdown and auto-submit
 useEffect(() => {
  if (!levelName) return; // wait for levelName
  if (questions.length === 0) return; // wait for questions

  const levelTimes = {
    easy: 120,
    medium: 240,
    hard: 360,
  };

  setTimeLeft(levelTimes[levelName.toLowerCase()] || 600);

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        // ✅ Safe submit only if questions are loaded
        if (questions.length > 0) handleSubmit(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer); // cleanup
}, [levelName, questions]);

  // Progress bar
  useEffect(() => {
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questions.length]);

  // Answered questions count
  useEffect(() => {
    setAnsweredQuestions(
      selectedAnswers.filter((answer) => answer !== -1).length
    );
  }, [selectedAnswers]);

  // Select answer
  const handleAnswerSelect = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
  };

  // Submit quiz
  const handleSubmit = async () => {
    try {
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - startTime) / 1000);

      if (questions.length === 0) return; 
      
      const answers = questions.map((q, index) => ({
        questionId: q._id,
        optionId:
          selectedAnswers[index] !== -1
            ? q.options[selectedAnswers[index]]._id
            : null,
      }));

      const res = await axiosInstance.post("/results", {
        categoryId: category,
        levelId: level,
        answers,
      });

      if (timeUp) {
      alert("⏰ Time's up! Result submitted automatically.");
    } else {
      alert("✅ Result submitted successfully!");
    }

      router.push(
        `/categories/${category}/levels/${level}/results?resultId=${res.data.data._id}&timeTaken=${timeTaken}`
      );
    } catch (error) {
      toast.error("Error while submitting")
      console.error(
        "Error submitting result:",
        error.response?.data || error.message
      );
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-300">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/categories/${category}/levels`}
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              <span>←</span>
              Back to Levels
            </Link>
            <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {category.name} Level
            </div>
          </div>

          {/* Progress and Timer */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-300">
                  {answeredQuestions} answered
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <span
                className={`text-lg ${
                  timeLeft < 300 ? "text-red-400" : "text-purple-400"
                }`}
              >
                ⏰
              </span>
              <span
                className={`font-mono font-medium ${
                  timeLeft < 300 ? "text-red-400" : "text-white"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {timeLeft < warningTime && (
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-lg px-4 py-2 mb-4">
              <span className="text-red-400">⚠️</span>
              <span className="text-sm text-red-400 font-medium">
                Less than {Math.floor(warningTime / 60)} minutes remaining!
              </span>
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="p-8 mb-8 bg-gray-800 border border-gray-700 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {currentQ.text}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option, index) => (
              <button
                key={option._id}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-purple-600 bg-purple-600/20 text-purple-400 font-medium"
                    : "border-gray-600 hover:border-purple-400 hover:bg-purple-600/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-lg text-white">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 bg-transparent border border-gray-600 hover:bg-purple-600/20 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>←</span>
            Previous
          </button>

          <div className="flex items-center gap-4">
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
                disabled={answeredQuestions === 0}
              >
                <span className="mr-2">🏁</span>
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <span>→</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Overview */}
        <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="font-semibold text-white mb-4">Question Overview</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                  index === currentQuestion
                    ? "border-purple-600 bg-purple-600 text-white"
                    : selectedAnswers[index] !== -1
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : "border-gray-600 hover:border-purple-400 text-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
