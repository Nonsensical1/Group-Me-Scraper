import type { EventDetails } from '../types';

/**
 * Formats a JavaScript Date object into the iCalendar UTC format (YYYYMMDDTHHMMSSZ).
 * @param date - The Date object to format.
 * @returns A string representing the date in iCal format.
 */
const toIcsDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

/**
 * Creates the content for a .ics file from a list of events.
 * @param events - An array of EventDetails objects.
 * @returns A string containing the full .ics file content.
 */
export const createIcsContent = (events: EventDetails[]): string => {
    let icsString = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//AI-GroupMe-Extractor//NONSGML v1.0//EN'
    ].join('\r\n');

    events.forEach((event, index) => {
        const startDate = new Date(event.startTime);
        
        // Use endTime if provided, otherwise default to 1 hour after start
        const endDate = event.endTime ? new Date(event.endTime) : new Date(startDate.getTime() + 60 * 60 * 1000);

        const uid = `${toIcsDate(new Date())}-${index}@example.com`;

        const eventLines = [
            'BEGIN:VEVENT',
            `UID:${uid}`,
            `DTSTAMP:${toIcsDate(new Date())}`,
            `DTSTART:${toIcsDate(startDate)}`,
            `DTEND:${toIcsDate(endDate)}`,
            `SUMMARY:${event.title}`,
            `DESCRIPTION:${event.description ? event.description.replace(/\n/g, '\\n') : ''}`,
            `LOCATION:${event.location}`,
            'END:VEVENT'
        ];

        icsString += '\r\n' + eventLines.join('\r\n');
    });

    icsString += '\r\n' + 'END:VCALENDAR';
    return icsString;
};

/**
 * Triggers a browser download for the given content.
 * @param content - The string content to download.
 * @param fileName - The name of the file to be downloaded.
 */
export const downloadIcsFile = (content: string, fileName: string): void => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
};
