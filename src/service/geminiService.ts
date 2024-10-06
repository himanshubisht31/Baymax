import {GoogleGenerativeAI} from '@google/generative-ai';
import {GEMINI_API_KEY} from '@env';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const askAI = async (prompt: string) => {
  try {
    const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
    // const model = genAI.getGenerativeModel({model: 'gemini-pro'});
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw error;
  }
};
