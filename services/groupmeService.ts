import type { Group, Message } from '../types';

const GROUPME_API_BASE = 'https://api.groupme.com/v3';

const handleApiResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed with status ' + response.status }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
};

/**
 * Fetches the user's groups from the GroupMe API.
 * @param accessToken - The user's GroupMe developer access token.
 * @returns A promise that resolves to an array of Group objects.
 */
export const fetchGroups = async (accessToken: string): Promise<Group[]> => {
    const url = `${GROUPME_API_BASE}/groups?per_page=100`; // Fetch up to 100 groups
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': accessToken,
        },
    });
    return handleApiResponse(response);
};

/**
 * Fetches the most recent messages from a specific GroupMe group.
 * @param accessToken - The user's GroupMe developer access token.
 * @param groupId - The ID of the group to fetch messages from.
 * @returns A promise that resolves to an array of Message objects.
 */
export const fetchMessages = async (accessToken: string, groupId: string): Promise<Message[]> => {
    // Fetches the last 100 messages, which is the max per_page value
    const url = `${GROUPME_API_BASE}/groups/${groupId}/messages?limit=100`; 
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': accessToken,
        },
    });
    const data = await handleApiResponse(response);
    return data.messages;
};
