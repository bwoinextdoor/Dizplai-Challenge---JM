import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import PollSelector from './components/PollSelector';
import Poll from './components/Poll';
import PollResults from './components/PollResults';
import CreatePollModal from './components/CreatePollModal';

function App() {
    const [polls, setPolls] = useState([]);
    const [selectedPoll, setSelectedPoll] = useState(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [resultsData, setResultsData] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showKebabMenu, setShowKebabMenu] = useState(false);

    // Tilt effect state
    const [tiltX, setTiltX] = useState(0);
    const [tiltY, setTiltY] = useState(0);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/polls');
            const data = await res.json();
            setPolls(data);
            if (data.length > 0) {
                loadPoll(data[0].id);
            }
        } catch (error) {
            console.error('Error fetching polls:', error);
        }
    };

    const loadPoll = async (pollId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/polls/${pollId}`);
            const pollData = await res.json();
            setSelectedPoll(pollData);
            setResultsData(null);
            setSelectedOptionId(null);
        } catch (error) {
            console.error('Error fetching poll:', error);
        }
    };

    const castVote = async () => {
        if (!selectedPoll || !selectedOptionId) return;
        try {
            await fetch(`http://localhost:4000/api/polls/${selectedPoll.id}/votes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ optionId: selectedOptionId }),
            });
            loadResults(selectedPoll.id);
        } catch (error) {
            console.error('Error casting vote:', error);
        }
    };

    const loadResults = async (pollId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/polls/${pollId}/votes`);
            const data = await res.json();
            setResultsData(data);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handlePollCreated = () => {
        setShowCreateModal(false);
        fetchPolls();
    };

    // Handle Mouse Move for Tilt Effect
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();

        const x = ((clientX - left) / width - 0.5) * 20;
        const y = ((clientY - top) / height - 0.5) * -20;

        setTiltX(y);
        setTiltY(x);
    };

    const handleMouseLeave = () => {
        setTiltX(0);
        setTiltY(0);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[url('/background.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center p-4">
                <div className="relative">
                    <button
                        onClick={() => setShowKebabMenu(!showKebabMenu)}
                        className="mr-2 text-black font-semibold bg-white px-4 py-2 rounded-lg hover:bg-[#7a4fd6] focus:outline-none focus:ring-2 focus:ring-[#996bf9] text-2xl font-bold"
                    >
                        &#x22EE;
                    </button>
                    {showKebabMenu && (
                        <div className="absolute right-[-140px] mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <button
                                onClick={() => {
                                    setShowCreateModal(true);
                                    setShowKebabMenu(false);
                                }}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                                Create New Vote Poll
                            </button>
                        </div>
                    )}
                </div>

                {polls.length > 0 ? (
                    <PollSelector
                        polls={polls}
                        selectedPollId={selectedPoll ? selectedPoll.id : ''}
                        onSelectPoll={loadPoll}
                    />
                ) : (
                    <span className="text-white">No Polls Found</span>
                )}
            </div>

            {/* Tilt Effect Applied to Poll */}
            <div
                className="flex-1 flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {resultsData ? (
                    <PollResults
                        resultsData={resultsData}
                        onBackToPoll={() => setResultsData(null)}
                        onBackToList={() => {
                            setSelectedPoll(null);
                            setResultsData(null);
                        }}
                    />
                ) : selectedPoll ? (
                    <Poll
                        poll={selectedPoll}
                        selectedOptionId={selectedOptionId}
                        setSelectedOptionId={setSelectedOptionId}
                        onSubmitVote={castVote}
                        onBack={() => {
                            setSelectedPoll(null);
                        }}
                    />
                ) : (
                    <p className="text-gray-500 text-xl">No poll selected</p>
                )}
            </div>

            <CreatePollModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onPollCreated={handlePollCreated}
            />

            {/* Social Media Links with CSS Animated Gradient */}
            <footer className="relative w-full h-20 flex items-center justify-center overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient" />

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 relative z-10 text-white">
                    <a href="https://www.linkedin.com/company/dizplai" target="_blank"><FaLinkedin size={30} /></a>
                    <a href="https://www.facebook.com/Dizplai" target="_blank"><FaFacebook size={30} /></a>
                    <a href="https://x.com/Dizplai" target="_blank"><FaXTwitter size={30} /></a>
                    <a href="https://www.instagram.com/Dizplai" target="_blank"><FaInstagram size={30} /></a>
                </div>
            </footer>

            {/* Add this CSS in your styles or Tailwind config */}
            <style jsx>{`
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradientBG 6s ease infinite;
                }
            `}</style>
        </div>
    );
}

export default App;