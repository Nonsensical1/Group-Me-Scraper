import type { EventDetails } from '../types';

/**
 * Formats an ISO string into the format required by Google Calendar (YYYYMMDDTHHMMSSZ).
 * @param isoString - The ISO 8601 date string.
 * @returns A formatted string for Google Calendar URLs.
 */
const toGoogleDate = (isoString: string): string => {
    return new Date(isoString).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

/**
 * Calculates a default end time (1 hour after start) if one isn't provided.
 * @param startTime - The ISO 8601 start time string.
 * @returns An ISO 8601 string for the end time.
 */
const getEndTime = (event: EventDetails): string => {
    if (event.endTime) {
        return event.endTime;
    }
    const startDate = new Date(event.startTime);
    // Default to 1 hour duration
    return new Date(startDate.getTime() + 60 * 60 * 1000).toISOString();
};


/**
 * Generates a URL to add an event to Google Calendar.
 * @param event - The EventDetails object.
 * @returns A URL string.
 */
export const getGoogleCalendarUrl = (event: EventDetails): string => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const startTime = toGoogleDate(event.startTime);
    const endTime = toGoogleDate(getEndTime(event));

    const params = new URLSearchParams({
        text: event.title,
        dates: `${startTime}/${endTime}`,
        details: event.description || '',
        location: event.location,
    });

    return `${baseUrl}&${params.toString()}`;
};

/**
 * Generates a URL to add an event to Outlook Calendar.
 * @param event - The EventDetails object.
 * @returns A URL string.
 */
export const getOutlookCalendarUrl = (event: EventDetails): string => {
    const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
    const startTime = event.startTime;
    const endTime = getEndTime(event);

    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        subject: event.title,
        startdt: startTime,
        enddt: endTime,
        location: event.location,
        body: event.description || '',
    });

    return `${baseUrl}?${params.toString()}`;
};
