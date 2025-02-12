import React from 'react';

export default function Poll({
  poll,
  selectedOptionId,
  setSelectedOptionId,
  onSubmitVote,
}) {

  const handleSubmit = () => {
    onSubmitVote(); 
    setSelectedOptionId(null); 
  };

  return (
    <div
      className="bg-cover bg-center flex items-center justify-center"
    >
      <div className="max-w-md w-full p-8 rounded-md text-white">
        <img
          src="/logo.svg"
          alt="logo"
          className="w-40 h-40 mx-auto cursor-pointer"
        />

        <h2 className="text-5xl font-semi-bold mb-6 text-center">{poll.question}</h2>
        <div className="space-y-3">
          {poll.options.map((opt) => (
            <button
              key={opt.id}
              className={`
                w-full block rounded-lg border border-white overflow-hidden mb-4
                ${
                  selectedOptionId === opt.id
                    ? 'ring-4 ring-white bg-purple-900/30'
                    : 'bg-purple-900/30 hover:bg-purple-600/10'
                }
              `}
              onClick={() => setSelectedOptionId(opt.id)}
            >
              <div className="relative h-12 flex items-center justify-center">
                <span className="z-10 text-white font-semi-bold text-2xl">
                  {opt.value}
                </span>
                <div
                  className="absolute top-0 left-0 h-full bg-purple-600"
                  style={{
                    width: selectedOptionId === opt.id ? '100%' : '0%',
                    transition: 'width 0.3s',
                  }}
                ></div>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-white text-purple-800 font-semibold mt-6 py-3 px-4 w-full rounded hover:bg-gray-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
