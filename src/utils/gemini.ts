import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API Key
// You can get your API Key from: https://aistudio.google.com/
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY");

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const analyzeWasteImage = async (base64Image: string) => {
    try {
        const prompt = "Analyze this waste image. Determine if it is biodegradable, plastic, or mixed. Provide a cleanliness efficiency percentage and a brief suggestion for better segregation. Format the response as JSON: { \"efficiency\": number, \"type\": string, \"composition\": { \"plastic\": number, \"organic\": number }, \"suggestion\": string }";

        // Convert base64 to parts
        const imageParts = [
            {
                inlineData: {
                    data: base64Image.split(",")[1], // Remove the data:image/png;base64, part
                    mimeType: "image/png"
                },
            },
        ];

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = response.text();

        // Clean and parse JSON
        const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
};
