import { GoogleGenAI, Type } from "@google/genai";
import type { EventDetails } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const eventSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: {
                type: Type.STRING,
                description: 'The concise title of the event.',
            },
            startTime: {
                type: Type.STRING,
                description: "The event's start date and time in strict ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ).",
            },
            endTime: {
                type: Type.STRING,
                description: "The event's end date and time in strict ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). If not specified, calculate it as 1 hour after the start time.",
            },
            location: {
                type: Type.STRING,
                description: 'The physical or virtual location of the event.',
            },
            description: {
                type: Type.STRING,
                description: 'A brief summary of the event or any relevant context from the post.',
            },
        },
        required: ["title", "startTime", "location"],
    },
};

export const analyzeGroupMePosts = async (posts: string, currentDate: string): Promise<EventDetails[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `The current date and time is ${currentDate}. Use this as a reference for any relative dates like "tomorrow" or times without a date.
Analyze the following GroupMe chat posts and extract any event announcements. For each event, identify the title, start time, end time, location, and a brief description. If an end time isn't specified, assume the event is one hour long. Ensure all dates and times are in UTC.
            
Posts:
---
${posts}
---
`,
            config: {
                responseMimeType: "application/json",
                responseSchema: eventSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const events = JSON.parse(jsonText) as EventDetails[];
        return events;

    } catch (error) {
        console.error("Error analyzing posts with Gemini:", error);
        throw new Error("Failed to extract events from posts.");
    }
};