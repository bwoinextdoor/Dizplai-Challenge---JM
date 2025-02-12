import React from 'react';

export default function PollList({ polls, onSelectPoll }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">All Polls</h1>
      <ul className="space-y-2 text-center">
        {polls.map((p) => (
          <li key={p.id}>
            <button
              className="text-blue-600 underline"
              onClick={() => onSelectPoll(p.id)}
            >
              {p.question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
