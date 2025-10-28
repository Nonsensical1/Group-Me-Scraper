import React from 'react';
import type { EventDetails } from '../types';
import { CalendarIcon, ClockIcon, MapPinIcon, DocumentTextIcon, GoogleCalendarIcon, OutlookCalendarIcon } from './icons/Icons';
import { getGoogleCalendarUrl, getOutlookCalendarUrl } from '../utils/calendarLinks';

interface EventCardProps {
    event: EventDetails;
}

const formatDate = (isoString?: string): string => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="bg-gray-700/60 rounded-lg p-4 border border-gray-600 flex flex-col space-y-3 transition-all hover:border-cyan-400/50 hover:bg-gray-700/80">
            <div className="flex-grow space-y-3">
                <h3 className="font-bold text-lg text-cyan-300">{event.title}</h3>
                
                <div className="flex items-start gap-2 text-gray-300 text-sm">
                    <CalendarIcon className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0"/>
                    <span>{formatDate(event.startTime)}</span>
                </div>

                 <div className="flex items-start gap-2 text-gray-300 text-sm">
                    <ClockIcon className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0"/>
                    <span>{event.endTime ? `Ends: ${formatDate(event.endTime)}` : 'End time not specified'}</span>
                </div>

                <div className="flex items-start gap-2 text-gray-300 text-sm">
                    <MapPinIcon className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0"/>
                    <span>{event.location}</span>
                </div>
                
                {event.description && (
                    <div className="flex items-start gap-2 text-gray-400 text-sm pt-2 border-t border-gray-600">
                        <DocumentTextIcon className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0"/>
                        <p className="italic">{event.description}</p>
                    </div>
                )}
            </div>

            <div className="pt-3 border-t border-gray-600/50 mt-auto">
                 <p className="text-xs text-gray-400 mb-2 font-medium">ADD TO CALENDAR:</p>
                 <div className="flex items-center gap-2">
                    <a
                        href={getGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-600/50 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-md transition duration-200 text-sm"
                    >
                       <GoogleCalendarIcon className="w-4 h-4" />
                        Google
                    </a>
                    <a
                        href={getOutlookCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-600/50 hover:bg-gray-600 text-white font-semibold py-2 px-3 rounded-md transition duration-200 text-sm"
                    >
                        <OutlookCalendarIcon className="w-4 h-4" />
                        Outlook
                    </a>
                 </div>
            </div>
        </div>
    );
};