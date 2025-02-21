import { useState } from "react";

const Quiz = () => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [waitingForResult, setWaitingForResult] = useState(false);

  const topics = [
    "Depression",
    "Anxiety Disorder",
    "Psychotic Disorder",
    "Bipolar Disorder",
    "OCD",
    "Social Anxiety",
  ];

  const fetchQuestions = async () => {
    if (!selectedTopic) {
      alert("Please select a topic first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDpnXmJABjnKonL8EIUaV66aytm16Hwdkk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate exactly 10 multiple-choice questions about ${selectedTopic} for mental health assessment. Each question must have 4 options (A, B, C, and D). Format each question as: "Question X: [Question text] A) Option 1 B) Option 2 C) Option 3 D) Option 4". DO NOT add any notes, explanations, or extra text after the last question.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;

      // Extract exactly 10 questions using strict regex (removes unwanted extra text)
      const rawQuestions = generatedText.match(/Question \d+:.*?(?=Question \d+:|$)/gs) || [];

      const formattedQuestions = rawQuestions.slice(0, 10).map((q) => {
        const match = q.match(/Question \d+: (.*?)\s*A\) (.*?)\s*B\) (.*?)\s*C\) (.*?)\s*D\) (.*)/s);

        return match
          ? {
              question: match[1].trim(),
              options: {
                A: match[2].trim(),
                B: match[3].trim(),
                C: match[4].trim(),
                D: match[5].trim(),
              },
            }
          : null;
      }).filter(Boolean);

      setQuestions(formattedQuestions);
      setUserResponses({});
      setCurrentQuestionIndex(0);
      setResult(null);
      setShowQuestions(true);
      setWaitingForResult(false);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (option) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [currentQuestionIndex]: option,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 300);
    } else {
      setShowQuestions(false);
      setWaitingForResult(true);
      setTimeout(() => {
        calculateResult();
      }, 2000);
    }
  };

  const calculateResult = () => {
    const score = Object.values(userResponses).reduce((total, response) => {
      if (response === "A") return total + 1;
      if (response === "B") return total + 2;
      if (response === "C") return total + 3;
      if (response === "D") return total + 4;
      return total;
    }, 0);

    const averageScore = score / 10;
    let finalResult = "Moderate";

    if (averageScore < 1.5) {
      finalResult = "Low";
    } else if (averageScore >= 2.5) {
      finalResult = "High";
    }

    setResult(finalResult);
    setWaitingForResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      {!showQuestions && !result && !waitingForResult && (
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Mental Health Assessment</h1>

          {/* Topic Selection */}
          <div className="mb-8">
            <label htmlFor="topic" className="block text-lg font-medium text-gray-800 mb-2">
              Select a Mental Health Topic:
            </label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-3 border-2 border-indigo-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          {/* Fetch Questions Button */}
          <button
            onClick={fetchQuestions}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Generating Questions..." : "Get Questions"}
          </button>
        </div>
      )}

      {/* Display Questions */}
      {showQuestions && questions.length > 0 && currentQuestionIndex < questions.length && (
        <div className="max-w-2xl bg-white p-6 rounded-lg shadow-xl w-full">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-lg mb-6">{questions[currentQuestionIndex].question}</p>

          {/* Options */}
          <div className="flex flex-col space-y-4">
            {Object.entries(questions[currentQuestionIndex].options).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleResponse(key)}
                className={`p-3 rounded-md text-left transition-all duration-200 ${
                  userResponses[currentQuestionIndex] === key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {key}) {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wait for Result */}
      {waitingForResult && (
        <div className="text-center text-2xl font-semibold text-gray-600">Wait for result...</div>
      )}

      {/* Display Result */}
      {result && (
        <div className="max-w-md bg-white p-6 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Assessment Result</h2>
          <p className="text-lg">
            Your mental health condition is:{" "}
            <span className={`font-bold text-xl ${result === "High" ? "text-red-600" : result === "Low" ? "text-green-600" : "text-yellow-600"}`}>
              {result}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
