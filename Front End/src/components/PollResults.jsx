import React, { useState } from "react";

export default function PollResults({ resultsData, onBackToPoll }) {
  const [showIndividualVotes, setShowIndividualVotes] = useState(false);

  if (!resultsData) return null;

  const { poll, results } = resultsData;
  const totalVotes = results.reduce((sum, r) => sum + r.votes.length, 0);

  // Function to toggle the view vites
  const toggleView = () => {
    setShowIndividualVotes((prev) => !prev);
  };

  return (
    <div className="bg-cover bg-center flex items-center justify-center">
      <div className="max-w-md w-full p-8 text-white">
        {/* Logo with back-to-poll  */}
        <img
          src="/logo.svg"
          alt="logo"
          className="w-40 h-40 mx-auto cursor-pointer"
          onClick={onBackToPoll}
        />

        <h2 className="text-5xl font-semibold mb-8 text-center">
          {showIndividualVotes ? "Individual Votes" : "Thank you for your response"}
        </h2>

        {/* Conditional Rendering */}
        {!showIndividualVotes ? (
          <div>
            {results.map((r) => {
              const votesCount = r.votes.length;
              const percentage =
                totalVotes === 0 ? 0 : ((votesCount / totalVotes) * 100).toFixed(0);
              return (
                <div
                  key={r.optionId}
                  className="mb-4 border border-white rounded-lg overflow-hidden bg-opacity-50 bg-purple-900/30"
                >
                  <div className="relative h-12 flex items-center px-4">
                    <span className="z-10 text-white text-2xl font-semibold flex-grow text-center">
                      {r.value}
                    </span>
                    <span className="z-10 text-white font-semibold">
                      {percentage}%
                    </span>
                    <div
                      className="absolute top-0 left-0 h-full bg-purple-600"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            <p className="text-center mt-4">
              Total Votes: <span className="font-bold">{totalVotes}</span>
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-white text-purple-800 hover:bg-gray-200 rounded"
                onClick={toggleView}
              >
                View Individual Votes
              </button>
            </div>
          </div>
        ) : (
          // Individual Votes View
          <div>
            {results.map((r) => (
              <div key={r.optionId} className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">{r.value}</h3>
                {r.votes.length === 0 ? (
                  <p className="text-gray-300">No votes have been cast for this option.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {r.votes.map((vote, index) => (
                      <li key={index} className="text-gray-200">
                        {new Date(vote.voteTime).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={toggleView}
              >
                Back to Results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
