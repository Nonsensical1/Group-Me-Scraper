import React, { useState, useCallback } from 'react';
import { analyzeGroupMePosts } from './services/geminiService';
import { fetchGroups, fetchMessages } from './services/groupmeService';
import { createIcsContent, downloadIcsFile } from './utils/icsGenerator';
import type { EventDetails, Group } from './types';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { EventCard } from './components/EventCard';
import { KeyIcon, ClipboardDocumentListIcon, SparklesIcon, ArrowDownTrayIcon, UserGroupIcon, CheckCircleIcon } from './components/icons/Icons';

const App: React.FC = () => {
    // State for the new connection flow
    const [accessToken, setAccessToken] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [isAccountConnected, setIsAccountConnected] = useState(false);
    
    // State for GroupMe data
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

    // Existing state for analysis
    const [extractedEvents, setExtractedEvents] = useState<EventDetails[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleConnect = useCallback(async () => {
        if (!accessToken.trim()) {
            setError('Please enter your GroupMe Access Token.');
            return;
        }
        setIsConnecting(true);
        setError(null);
        try {
            const fetchedGroups = await fetchGroups(accessToken);
            setGroups(fetchedGroups);
            setIsAccountConnected(true);
        } catch (err) {
            setError('Failed to connect. Please check if your Access Token is correct and try again.');
            console.error(err);
        } finally {
            setIsConnecting(false);
        }
    }, [accessToken]);

    const handleAnalyze = useCallback(async () => {
        if (!selectedGroupId) {
            setError('Please select a group to analyze.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setExtractedEvents([]);
        try {
            const messages = await fetchMessages(accessToken, selectedGroupId);
            const postsText = messages
              .filter(m => m.text) // Only include messages with text content
              .reverse() // Reverse to get chronological order
              .map(m => `${m.name}: ${m.text}`)
              .join('\n\n');

            if (!postsText) {
                setError("No recent text messages found in this group to analyze.");
                setIsLoading(false);
                return;
            }

            const currentDateForAI = new Date().toISOString();
            const allEvents = await analyzeGroupMePosts(postsText, currentDateForAI);
            const now = new Date();
            const futureEvents = allEvents.filter(event => {
                try {
                    return new Date(event.startTime) > now;
                } catch (e) {
                    // Invalid date format from AI, filter it out.
                    return false;
                }
            });

            if (futureEvents.length > 0) {
                setExtractedEvents(futureEvents);
            } else if (allEvents.length > 0) {
                setError("AI found event announcements, but they have all already passed.");
            } else {
                setError("AI couldn't find any clear event announcements in the recent posts.");
            }

        } catch (err) {
            console.error(err);
            setError('An error occurred while analyzing the posts. The AI might be busy, or there was an issue with the request.');
        } finally {
            setIsLoading(false);
        }
    }, [accessToken, selectedGroupId]);

    const handleDownload = () => {
        if (extractedEvents.length > 0) {
            const icsContent = createIcsContent(extractedEvents);
            downloadIcsFile(icsContent, 'groupme_events.ics');
        }
    };

    const renderStep = (num: number, title: string, isEnabled: boolean, children: React.ReactNode) => (
         <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm transition-opacity ${!isEnabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
            <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-3">
               <span className={`bg-cyan-500/10 text-cyan-300 rounded-full flex items-center justify-center w-8 h-8`}>{num}</span> 
               {title}
            </h2>
            <div className={`${!isEnabled ? 'pointer-events-none' : ''}`}>
                {children}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />

                <main className="mt-8 space-y-6">
                    {/* Step 1: Connect Account */}
                    {renderStep(1, 'Connect Your GroupMe Account', !isAccountConnected, (
                         <>
                            <p className="text-gray-400 mt-2 text-sm">
                                You'll need a GroupMe Access Token to continue. You can get yours from the{' '}
                                <a href="https://dev.groupme.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                                    GroupMe Developer website
                                </a>.
                            </p>
                            <div className="relative mt-4">
                                <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="password" 
                                    placeholder="Enter your GroupMe Access Token"
                                    value={accessToken}
                                    onChange={(e) => setAccessToken(e.target.value)}
                                    disabled={isConnecting}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-3 py-2.5 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:opacity-50" 
                                />
                            </div>

                             <button
                                onClick={handleConnect}
                                disabled={!accessToken.trim() || isConnecting}
                                className="mt-4 w-full md:w-auto float-right flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-700 hover:to-sky-700 text-white font-bold py-2.5 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.03]"
                            >
                                {isConnecting ? <Loader /> : <KeyIcon className="w-5 h-5" />}
                                {isConnecting ? 'Connecting...' : 'Connect'}
                            </button>
                        </>
                    ))}
                    {error && !isConnecting && <p className="text-red-400 text-center animate-fade-in">{error}</p>}
                    
                    {isAccountConnected && (
                         <div className="mt-4 text-center text-green-400 bg-green-900/50 border border-green-700 p-3 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
                           <CheckCircleIcon className="w-5 h-5" />
                            Account Connected! Fetched {groups.length} groups.
                        </div>
                    )}


                    {/* Step 2: Select Group */}
                    {renderStep(2, 'Select a Group', isAccountConnected, (
                        <>
                             <p className="text-gray-400 mt-2 text-sm">Choose which group you'd like to analyze for events.</p>
                             <div className="relative mt-4">
                                <UserGroupIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select 
                                    value={selectedGroupId || ''} 
                                    onChange={e => setSelectedGroupId(e.target.value)}
                                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-3 py-2.5 focus:ring-purple-500 focus:border-purple-500 transition appearance-none"
                                >
                                    <option value="" disabled>-- Select a Group --</option>
                                    {groups.map(group => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ))}
                    
                    {/* Step 3: Fetch & Analyze */}
                    {renderStep(3, 'Fetch Posts & Find Events', !!selectedGroupId, (
                         <>
                            <p className="text-gray-400 mt-2 text-sm">The app will fetch the latest messages from your selected group and send them to the AI for analysis.</p>
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading || !selectedGroupId}
                                className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                            >
                                {isLoading ? <Loader /> : <SparklesIcon className="w-5 h-5" />}
                                {isLoading ? 'Analyzing...' : 'Fetch & Find Events'}
                            </button>
                         </>
                    ))}


                    {/* Step 4: Review Events & Add to Calendar */}
                    {(extractedEvents.length > 0 || (isLoading && !isConnecting) || (error && isAccountConnected)) && (
                        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 animate-fade-in">
                            <h2 className="text-xl font-bold text-green-300 flex items-center gap-3">
                                <span className="bg-green-500/10 text-green-300 rounded-full flex items-center justify-center w-8 h-8">4</span> 
                                Review Events & Add to Calendar
                            </h2>
                             <p className="text-gray-400 mt-2 text-sm">
                                Use the links on each card to add events individually, or download a single file containing all events.
                            </p>
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center p-8">
                                    <Loader />
                                    <p className="mt-4 text-gray-300">Fetching messages and analyzing with AI...</p>
                                </div>
                            )}
                            {error && !isLoading && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg mt-4">{error}</p>}
                            
                            {!isLoading && extractedEvents.length > 0 && (
                                <div className="mt-4 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {extractedEvents.map((event, index) => (
                                        <EventCard key={index} event={event} />
                                    ))}
                                </div>
                                    <button
                                        onClick={handleDownload}
                                        className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:opacity-50 transform hover:scale-[1.02]"
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Download All Events (.ics file)
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;