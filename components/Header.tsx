import React from 'react';
import { CalendarDaysIcon } from './icons/Icons';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="flex justify-center items-center gap-4">
                <div className="bg-gradient-to-tr from-cyan-400 to-purple-500 p-3 rounded-xl shadow-lg">
                   <CalendarDaysIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
                    GroupMe AI Event Extractor
                </h1>
            </div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Turn your chat history into a calendar. Paste your GroupMe posts, and let AI automatically find event details and create a downloadable calendar file.
            </p>
        </header>
    );
};
