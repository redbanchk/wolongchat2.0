import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { Message, Sender } from '../types';

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to Gemini acting as Zhuge Liang.
 * @param history The full chat history to maintain context.
 * @param newMessage The new message from the user.
 * @returns The response text from the model.
 */
export const fetchZhugeResponse = async (history: Message[], newMessage: string): Promise<string> => {
  try {
    // Construct the conversation history for the model
    // We filter out the very first system greeting if needed, or keep it as context.
    // For simpler context, we can just send the last few turns or the full history formatted as text.
    
    // Using the Chat API is better for maintaining history.
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slightly creative but stable
        topK: 40,
        topP: 0.95,
      },
      history: history.map(msg => ({
        role: msg.sender === Sender.User ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage({
      message: newMessage,
    });

    return result.text || "亮一时思虑未及，请主公恕罪，可否再问？";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "天机难测，亮需观星推演，请主公稍后再问。（连接中断）";
  }
};