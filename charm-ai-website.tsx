import React, { useState } from 'react';
import { Heart, Send, Sparkles } from 'lucide-react';

const CharmAI = () => {
  const [pickupLine, setPickupLine] = useState('');
  const [response, setResponse] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const analyzePickupLine = (line) => {
    setIsThinking(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      // This is a simple demonstration of rating logic
      // In a real application, you'd want more sophisticated analysis
      const words = line.toLowerCase().split(' ');
      let score = 5; // Start with average score
      
      // Some basic rating factors
      if (words.includes('beautiful') || words.includes('gorgeous')) score += 1;
      if (words.includes('baby') || words.includes('sexy')) score -= 2;
      if (line.includes('?')) score += 0.5;
      if (words.length < 3) score -= 2;
      if (words.length > 20) score -= 1;
      
      // Add some randomness to make it more human-like
      score += (Math.random() * 2 - 1);
      
      // Clamp score between 1 and 10
      score = Math.max(1, Math.min(10, Math.round(score)));
      
      let comment = '';
      if (score < 5) {
        comment = [
          "Yikes... maybe try something less cliché?",
          "That's kind of cringe, not gonna lie.",
          "You might want to workshop that one a bit more.",
          "Oh honey, we can do better than that!"
        ][Math.floor(Math.random() * 4)];
      } else if (score >= 8) {
        comment = [
          "Wow, you really swept me off my feet!",
          "That was actually super smooth!",
          "Okay, that was pretty charming!",
          "You've definitely got game!"
        ][Math.floor(Math.random() * 4)];
      } else {
        comment = [
          "Not bad, but there's room for improvement.",
          "I've heard worse, but I've also heard better.",
          "Pretty decent attempt!",
          "That's... actually kind of sweet."
        ][Math.floor(Math.random() * 4)];
      }
      
      setResponse({ score, comment });
      setIsThinking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">
            Charm the AI
            <Heart className="inline ml-2 text-pink-600" />
          </h1>
          <p className="text-gray-600">Test your pickup lines on our AI matchmaker!</p>
        </div>

        {/* AI Character */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
          <div className="w-32 h-32 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles size={48} className="text-pink-500" />
          </div>
          <p className="text-gray-700 italic">
            "Hi! I'm Cupid AI. Try your best pickup line on me! 💝"
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={pickupLine}
              onChange={(e) => setPickupLine(e.target.value)}
              placeholder="Type your pickup line here..."
              className="flex-1 p-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={() => analyzePickupLine(pickupLine)}
              disabled={!pickupLine.trim() || isThinking}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
              Send
            </button>
          </div>
        </div>

        {/* Response Section */}
        {isThinking && (
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center animate-pulse">
            <p className="text-gray-600">Thinking... 💭</p>
          </div>
        )}
        
        {response && !isThinking && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2">
                {response.score}/10
              </div>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(10)].map((_, i) => (
                  <Heart
                    key={i}
                    size={24}
                    className={`${
                      i < response.score ? 'text-pink-500' : 'text-gray-200'
                    }`}
                    fill={i < response.score ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{response.comment}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharmAI;
