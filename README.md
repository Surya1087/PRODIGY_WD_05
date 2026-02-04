# 🌤️ Weather Intelligence Dashboard

A **premium, production-grade weather application** built with HTML, CSS, JavaScript, and Node.js backend. This project extends a basic weather app internship task into a sophisticated, visually outstanding weather intelligence platform.

---

## ✨ Features

### Core Features (Original Task)
- ✅ Search weather by city name
- ✅ Fetch real-time weather data from API
- ✅ Display temperature, conditions, and weather icons

### Premium Features (Extended)
- 🎨 **Glassmorphism UI** - Modern frosted glass design
- 🌈 **Dynamic Backgrounds** - Changes based on weather conditions
- 🎭 **Theme System** - Light / Dark / Auto modes
- 📊 **Weather Insights** - Smart alerts and recommendations
- 👔 **Clothing Tips** - AI-powered outfit suggestions
- 🎯 **Activity Recommendations** - Based on current weather
- 📱 **Fully Responsive** - Works on all devices
- 📍 **Geolocation** - Auto-detect user location
- 📜 **Search History** - Recent searches saved
- 💾 **Offline Fallback** - Works with last cached data
- 🎬 **Smooth Animations** - Micro-interactions throughout
- 🌧️ **Animated Particles** - Rain, snow effects

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Glassmorphism, Animations)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- File-based storage

**API:**
- OpenWeatherMap API

---

## 📁 Project Structure

```
weather-dashboard/
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── css/
│   │   └── style.css        # All styles & animations
│   └── js/
│       ├── app.js           # Main app controller
│       ├── weather.js       # Weather API service
│       ├── theme.js         # Theme management
│       └── insights.js      # Smart insights generator
├── backend/
│   ├── server.js            # Express backend server
│   ├── package.json         # Node dependencies
│   ├── .env                 # Environment variables
│   └── data/
│       └── history.json     # Search history storage
└── README.md                # This file
```

---

## 🚀 How to Run (Mac/Linux)

### Step 1: Clone or Download the Project
```bash
cd Desktop
mkdir weather-dashboard
cd weather-dashboard
```

### Step 2: Set Up Backend
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the backend server
npm start
```

**You should see:**
```
🚀 Weather Backend running on http://localhost:3000
📊 API Endpoints:
   GET  /api/weather/:city
   GET  /api/weather-coords/:lat/:lon
   GET  /api/history
   DELETE /api/history
```

### Step 3: Open Frontend
```bash
# Open a new terminal tab (Cmd + T)
cd ../frontend

# Option 1: Use Python server
python3 -m http.server 8000

# Option 2: Use Node.js http-server (install if needed)
npx http-server -p 8000

# Option 3: Open directly in browser
open index.html
```

### Step 4: Access the App
Open your browser and go to:
```
http://localhost:8000
```

---

## 🔧 Configuration

### Change API Key (Optional)
If you want to use your own OpenWeatherMap API key:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Edit `backend/.env`:
```env
WEATHER_API_KEY=your_api_key_here
```

### Change Port (Optional)
Edit `backend/.env`:
```env
PORT=3000
```

---

## 🎯 How It Works

### Frontend → Backend Connection
1. User searches for a city
2. Frontend sends request to backend: `http://localhost:3000/api/weather/London`
3. Backend fetches data from OpenWeatherMap API
4. Backend saves search to history
5. Backend returns data to frontend
6. Frontend displays weather with animations

### Why Use Backend?
- ✅ **Security**: API key is hidden from users
- ✅ **History**: Saves recent searches
- ✅ **Caching**: Faster repeat searches
- ✅ **Control**: Rate limiting, error handling

---

## 📱 Features Breakdown

### 1. Dynamic Background
- Changes color based on weather
- Animated particles (rain, snow)
- Smooth transitions

### 2. Smart Insights
- Temperature warnings
- Clothing recommendations
- Activity suggestions
- Weather risk alerts

### 3. Theme System
- **Light Mode**: Bright, clean design
- **Dark Mode**: Easy on eyes
- **Auto Mode**: Matches system preference

### 4. Search History
- Stores last 10 searches
- Click to reload
- Clear all option

### 5. Offline Support
- Uses last weather data if offline
- Cached in browser localStorage

---

## 🎨 Design System

### Colors
- **Accent**: Blue (#3b82f6)
- **Background**: Dynamic gradients
- **Glass**: Frosted blur effect
- **Text**: Adaptive contrast

### Typography
- **Headings**: Outfit font (800 weight)
- **Body**: Inter font (400-700 weight)

### Animations
- **Card hover**: Lift effect
- **Button press**: Scale down
- **Page load**: Fade in
- **Weather icons**: Float animation

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Make sure you're in backend folder
cd backend

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try starting again
npm start
```

### Frontend shows "Connection Error"
- Make sure backend is running on port 3000
- Check `frontend/js/weather.js` - API_BASE should be `http://localhost:3000/api`

### "City not found" error
- Check spelling
- Try major cities: London, New York, Tokyo
- Check if backend is running

### History not saving
- Check if `backend/data/history.json` exists
- Restart backend server

---

## 📝 API Endpoints

### GET `/api/weather/:city`
Fetch weather by city name
```javascript
fetch('http://localhost:3000/api/weather/London')
```

### GET `/api/weather-coords/:lat/:lon`
Fetch weather by coordinates
```javascript
fetch('http://localhost:3000/api/weather-coords/51.5074/-0.1278')
```

### GET `/api/history`
Get search history
```javascript
fetch('http://localhost:3000/api/history')
```

### DELETE `/api/history`
Clear search history
```javascript
fetch('http://localhost:3000/api/history', { method: 'DELETE' })
```

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ **Frontend Development**: HTML, CSS, JavaScript
- ✅ **API Integration**: Fetching external data
- ✅ **Backend Basics**: Node.js, Express
- ✅ **State Management**: Handling app state
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **User Experience**: Animations, loading states
- ✅ **Data Persistence**: File storage
- ✅ **Error Handling**: Graceful failures

---

## 🚀 Future Enhancements

- [ ] 7-day weather forecast
- [ ] Hourly weather breakdown
- [ ] Weather maps integration
- [ ] Multiple location comparison
- [ ] Weather alerts notifications
- [ ] Social sharing features
- [ ] Database instead of JSON file
- [ ] User accounts & preferences

---

## 📄 License

This project is free to use for educational and portfolio purposes.

---

## 👤 Author

**Surya Pratap Singh**  
Internship Project at Prodigy InfoTech  
3rd Year IT Student

---

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- Google Fonts for typography
- Design inspiration from modern weather apps

---

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Verify all files are in correct folders
3. Ensure backend is running
4. Check browser console for errors

---

**Built with ❤️ for learning and growth**