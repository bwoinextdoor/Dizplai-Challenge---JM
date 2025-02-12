import React, { useState, useEffect, useRef } from 'react';

export default function PollSelector({ polls, selectedPollId, onSelectPoll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(
    polls.find((poll) => poll.id === selectedPollId) || null
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSelect = (poll) => {
    setSelectedPoll(poll);
    onSelectPoll(poll.id); 
    setIsOpen(false); 
    setIsMobileMenuOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); 
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative mb-4 flex items-center justify-center" ref={dropdownRef}>
      <button
        className="p-3 bg-white text-black rounded-lg shadow hover:bg-[#7a4fd9] focus:outline-none focus:ring-2 focus:ring-[#996bf9]"
        onClick={toggleMobileMenu}
        aria-label="Open Kebab Menu"
      >
        ☰
      </button>

      {/* Kebab Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div className="absolute top-12 right-0 w-64 border border-white rounded-lg bg-[#996bf9] shadow-lg z-20"></div>
          <div className="absolute top-12 right-0 w-64 border border-white rounded-lg bg-[#996bf9] shadow-lg z-20">
            <ul className="divide-y divide-white">
              <li className="p-4 text-white cursor-pointer">
                <label className="text-white font-semibold" htmlFor="poll-dropdown">
                  Available Vote Polls:
                </label>
              </li>
              <li className="p-4 text-white cursor-pointer">
                <button
                  id="poll-dropdown"
                  className="w-full border border-white rounded-lg bg-[#996bf9] text-white text-left p-3 flex items-center justify-between hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={toggleDropdown}
                >
                  {selectedPoll ? selectedPoll.question : 'Pick a selection'}
                  <span className="ml-2">▼</span>
                </button>
              </li>
              {isOpen && (
                <ul className="w-full mt-2 border border-white rounded-lg bg-[#996bf9] text-white z-10">
                  {polls.map((poll) => (
                    <li
                      key={poll.id}
                      className="p-3 hover:bg-blue-700 cursor-pointer"
                      onClick={() => handleSelect(poll)}
                    >
                      {poll.question}
                    </li>
                  ))}
                </ul>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
