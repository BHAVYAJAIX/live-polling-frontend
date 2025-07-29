import React, { useState } from "react";
import {
  Trophy,
  Users,
  Clock,
  ChevronRight,
  CheckCircle,
  Zap,
  Target,
  Award,
} from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
}

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const pollQuestion = "Who will win the 2026 India Premier League?";
  const pollOptions: PollOption[] = [
    {
      id: "chiefs",
      text: "Royal Challengers Bangalore",
      votes: 1247,
      logo: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      colors: { primary: "#E31837", secondary: "#FFB81C" },
    },
    {
      id: "bills",
      text: "Chennai Super Kings",
      votes: 983,
      logo: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      colors: { primary: "#00338D", secondary: "#C60C30" },
    },
    {
      id: "ravens",
      text: "Kolkata Knight Riders",
      votes: 856,
      logo: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      colors: { primary: "#241773", secondary: "#9E7C0C" },
    },
    {
      id: "cowboys",
      text: "Mumbai Indians",
      votes: 742,
      logo: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      colors: { primary: "#003594", secondary: "#869397" },
    },
    {
      id: "niners",
      text: "Sunrisers Hyderabad",
      votes: 678,
      logo: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      colors: { primary: "#AA0000", secondary: "#B3995D" },
    },
  ];

  const totalVotes = pollOptions.reduce((sum, option) => sum + option.votes, 0);

  const handleSubmit = () => {
    if (selectedOption && !hasVoted) {
      setHasVoted(true);
    }
  };

  const getPercentage = (votes: number) => {
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Sports Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        }}
      />

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-500/10 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-black/30 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-yellow-900" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  SPORTSPOLL <span className="text-orange-400">LIVE</span>
                </h1>
                <p className="text-blue-200 text-sm font-medium">
                  Championship Predictions • Real-Time Results
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                <Users className="w-5 h-5 text-orange-400" />
                <span className="text-white font-bold">
                  {totalVotes.toLocaleString()}
                </span>
                <span className="text-blue-200 text-sm">VOTES</span>
              </div>
              <div className="flex items-center space-x-3 bg-red-500/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span className="text-white font-bold text-sm">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-6 py-12">
        {/* Poll Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Poll Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 px-8 py-8">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-6 h-6 text-yellow-300" />
                  <span className="text-yellow-300 font-bold text-sm tracking-wider">
                    CHAMPIONSHIP POLL
                  </span>
                </div>
                <h2 className="text-3xl font-black text-white mb-3 leading-tight">
                  {pollQuestion}
                </h2>
                <p className="text-blue-100 text-lg">
                  Make your prediction and see how the community votes!
                </p>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
                  alt="Football"
                  className="w-20 h-20 rounded-full border-4 border-white/30 shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Poll Options */}
          <div className="p-8">
            <div className="space-y-4">
              {pollOptions.map((option, index) => (
                <div key={option.id} className="relative group">
                  <label
                    className={`relative block cursor-pointer transition-all duration-300 ${
                      hasVoted
                        ? "cursor-default"
                        : "hover:scale-[1.02] hover:shadow-xl"
                    }`}
                  >
                    <input
                      type="radio"
                      name="poll"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) =>
                        !hasVoted && setSelectedOption(e.target.value)
                      }
                      disabled={hasVoted}
                      className="sr-only"
                    />
                    <div
                      className={`relative overflow-hidden rounded-2xl border-3 p-6 transition-all duration-300 ${
                        selectedOption === option.id
                          ? "border-orange-500 bg-orange-50 shadow-lg transform scale-[1.02]"
                          : "border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 hover:shadow-md"
                      } ${hasVoted ? "pointer-events-none" : ""}`}
                      style={{
                        boxShadow:
                          selectedOption === option.id
                            ? `0 0 30px ${option.colors.primary}20`
                            : undefined,
                      }}
                    >
                      {/* Team Color Accent */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                        style={{ backgroundColor: option.colors.primary }}
                      />

                      {/* Results Bar (shown after voting) */}
                      {hasVoted && (
                        <div
                          className="absolute inset-0 transition-all duration-1000 ease-out opacity-20"
                          style={{
                            background: `linear-gradient(90deg, ${option.colors.primary}40 0%, ${option.colors.secondary}20 100%)`,
                            width: `${getPercentage(option.votes)}%`,
                          }}
                        />
                      )}

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Team Logo */}
                          <div className="relative">
                            <img
                              src={option.logo}
                              alt={`${option.text} logo`}
                              className="w-12 h-12 rounded-full border-2 border-gray-200 shadow-md"
                            />
                            {selectedOption === option.id && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Team Name */}
                          <div>
                            <span className="text-xl font-bold text-gray-800 block">
                              {option.text}
                            </span>
                            <span className="text-sm text-gray-500">
                              IPL Team
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          {hasVoted && (
                            <>
                              <div className="text-right">
                                <div className="text-sm text-gray-600 mb-1">
                                  {option.votes.toLocaleString()} votes
                                </div>
                                <div
                                  className="text-2xl font-black"
                                  style={{ color: option.colors.primary }}
                                >
                                  {getPercentage(option.votes)}%
                                </div>
                              </div>
                              {index === 0 && (
                                <Award className="w-6 h-6 text-yellow-500" />
                              )}
                            </>
                          )}
                          {!hasVoted && (
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            {!hasVoted && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className={`relative px-12 py-5 rounded-2xl font-black text-xl transition-all duration-300 ${
                    selectedOption
                      ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-pink-600 hover:scale-105 shadow-2xl hover:shadow-orange-500/25 transform"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Trophy className="w-6 h-6" />
                    <span>CAST YOUR VOTE</span>
                    <Zap className="w-6 h-6" />
                  </span>
                  {selectedOption && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl animate-pulse" />
                  )}
                </button>
              </div>
            )}

            {/* Thank You Message */}
            {hasVoted && (
              <div className="mt-10 text-center">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold text-lg">
                    Vote Submitted! Results updating live...
                  </span>
                  <Trophy className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-6 bg-black/30 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20">
            <div className="flex items-center space-x-2 text-white">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="font-bold">{totalVotes.toLocaleString()}</span>
              <span className="text-gray-300">fans voted</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Poll closes in</span>
              <span className="font-bold text-orange-400">2 days</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
