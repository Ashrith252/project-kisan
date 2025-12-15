import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// API URLs
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Helper function to convert buffer to base64
function bufferToBase64(buffer) {
  return buffer.toString('base64');
}

// Route: Crop Diagnosis (Gemini with image)
app.post('/api/diagnose', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const base64ImageData = bufferToBase64(req.file.buffer);
    
    const prompt = "Analyze this image of a plant leaf. Identify any disease or pest present, and suggest a simple, actionable, and affordable remedy suitable for a small-scale farmer in rural Telangana, India. If no disease is detected, state that the plant appears healthy. Be concise and direct. Respond in English.";
    
    const payload = {
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { 
            inlineData: { 
              mimeType: req.file.mimetype, 
              data: base64ImageData 
            } 
          }
        ]
      }],
    };

    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (result) {
      res.json({ success: true, result });
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error('Error in crop diagnosis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze the image. Please try again.',
      details: error.message 
    });
  }
});

// Route: Market Analysis (Groq)
app.post('/api/market-analysis', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const prompt = `Act as a real-time agricultural market analyst for a farmer in rural Telangana, India. The farmer asks: "${query}". Based on this, provide a concise, actionable summary of current market trends and prices for the specific produce mentioned (or a general trend if no produce is specified). Include advice on whether it's a good time to sell or hold. Use simple language. Example: "Tomato prices are ₹25/kg today, which is stable. It's a good time to sell small quantities." Respond in English.`;
    
    const payload = {
      messages: [{ role: "user", content: prompt }],
      model: "llama3-8b-8192"
    };

    const response = await axios.post(GROQ_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      }
    });

    const result = response.data.choices?.[0]?.message?.content;
    
    if (result) {
      res.json({ success: true, result });
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error('Error in market analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze market data. Please try again.',
      details: error.message 
    });
  }
});

// Route: Government Schemes (Gemini)
app.post('/api/government-schemes', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const prompt = `Act as a government agricultural scheme navigator for a small-scale farmer in rural Telangana, India. The farmer asks: "${query}". Explain relevant government schemes, especially those found on the Rythu Bharosa portal (rythubharosa.telangana.gov.in). List key eligibility requirements and provide a direct link to the portal (https://rythubharosa.telangana.gov.in/) for applications. If no specific scheme matches, provide general advice on finding agricultural support. Respond in English.`;
    
    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    };

    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (result) {
      res.json({ success: true, result });
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error('Error in government schemes:', error);
    res.status(500).json({ 
      error: 'Failed to fetch scheme information. Please try again.',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Project Kisan API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🌾 Project Kisan API server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  
  // Check if API keys are configured
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('⚠️  GEMINI_API_KEY not configured properly');
  }
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    console.warn('⚠️  GROQ_API_KEY not configured properly');
  }
});