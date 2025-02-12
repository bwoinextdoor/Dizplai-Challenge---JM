import React, { useState } from 'react';

export default function CreatePollModal({ isOpen, onClose, onPollCreated }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleAddOption = () => {
    if (options.length < 7) {
      setOptions([...options, '']);
    }
  };

  const handleOptionChange = (idx, val) => {
    const updated = [...options];
    updated[idx] = val;
    setOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, options }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create poll');
      }

      if (onPollCreated) onPollCreated(data);
      setQuestion('');
      setOptions(['', '']);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="mr-2 text-white font-semibold bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button
          className="absolute top-2 right-2 text-3xl text-white hover:text-gray-300"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center">Create a New Vote Poll</h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold text-lg">Question:</label>
          <input
            className="border border-white/50 bg-gray-200 text-black p-2 w-full rounded mb-6"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question here...."
            required
          />

          <label className="block mb-2 font-semibold text-lg">Options (2 to 7):</label>
          {options.map((opt, idx) => (
            <input
              key={idx}
              className="border border-white/50 bg-gray-200 text-black p-2 w-full rounded mb-4"
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              placeholder={`Enter your option here.... ${idx + 1}`}
              required
            />
          ))}

          {options.length < 7 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="mr-2 text-white font-semibold bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              + Add Another Option
            </button>
          )}

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              className="bg-white text-purple-800 font-bold px-6 py-3 rounded hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-white text-purple-800 font-bold px-6 py-3 rounded hover:bg-gray-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
