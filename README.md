# 🌾 Project Kisan - AI Farmer Assistant

A comprehensive full-stack application designed to assist farmers with AI-powered crop diagnosis, market analysis, and government scheme information.

## Features

### 🌱 Crop Diagnosis
- Upload plant leaf images for instant disease detection
- AI-powered analysis using Google Gemini Vision API
- Get actionable remedies suitable for small-scale farmers

### 📈 Market Analysis  
- Real-time market price queries
- Voice-to-text input support
- Market trend analysis using Groq AI

### 🏛️ Government Schemes
- Navigate agricultural subsidies and schemes
- Focus on Telangana state schemes (Rythu Bharosa portal)
- Voice input and text-to-speech output

## Technology Stack

### Backend
- Node.js with Express
- Multer for file upload handling
- Axios for API requests
- CORS for cross-origin requests

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Web Speech API for voice features

### AI APIs
- **Google Gemini 2.0 Flash**: Image analysis and text generation
- **Groq Llama 3**: Fast text generation for market analysis

## Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd project-kisan
npm install
```

### 2. Configure API Keys
Create a `.env` file in the root directory:
```env
# API Keys - Replace with your actual keys
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3. Get API Keys

#### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create an account and generate an API key
3. Copy the key to your `.env` file

### 4. Run the Application
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend development server on `http://localhost:5173`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if the API is running

### Crop Diagnosis
- **POST** `/api/diagnose` - Upload image for crop disease analysis
- Body: FormData with `image` file

### Market Analysis
- **POST** `/api/market-analysis` - Get market price information
- Body: `{ "query": "market query string" }`

### Government Schemes
- **POST** `/api/government-schemes` - Get scheme information
- Body: `{ "query": "scheme query string" }`

## Features in Detail

### Voice Input
- Click the microphone icon in Market Analysis and Government Schemes tabs
- Supports English (India) language recognition
- Automatic transcription to text input

### Text-to-Speech
- Click the speaker icon in result boxes
- Hear AI responses read aloud
- Uses browser's built-in speech synthesis

### Responsive Design
- Mobile-first design approach
- Works seamlessly on desktop, tablet, and mobile
- Touch-friendly interface

### Error Handling
- Comprehensive error messages
- API failure handling
- User-friendly error display

## Browser Support

- **Speech Recognition**: Chrome, Edge, Safari (with permissions)
- **Speech Synthesis**: All modern browsers
- **File Upload**: All modern browsers
- **Core Features**: All modern browsers

## Development

### Project Structure
```
project-kisan/
├── server/
│   └── index.js          # Express server
├── src/
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── types/           # TypeScript types
│   └── App.tsx          # Main app component
├── .env                 # Environment variables
└── README.md
```

### Adding New Features
1. Create new API endpoints in `server/index.js`
2. Add corresponding service methods in `src/services/api.ts`
3. Create React components in `src/components/`
4. Update the main App component

## Security Notes

- API keys are stored securely on the server side
- File uploads are limited to 10MB
- Only image files are accepted for diagnosis
- CORS is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
1. Check the console for error messages
2. Verify API keys are correctly configured
3. Ensure microphone permissions are granted for voice features
4. Check network connectivity for API calls

---

**Built with ❤️ for farmers and agriculture technology**