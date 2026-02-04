const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Import required packages
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON data

// Path to history file
const historyPath = path.join(__dirname, 'data', 'history.json');

// ============================================
// ROUTE 1: GET WEATHER BY CITY
// ============================================
app.get('/api/weather/:city', async (req, res) => {
    try {
        const city = req.params.city;
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
        // Fetch weather data from OpenWeather API
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(404).json({ error: 'City not found' });
        }
        
        const data = await response.json();
        
        // Save to history
        saveToHistory(city, data);
        
        // Return weather data
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// ROUTE 2: GET WEATHER BY COORDINATES
// ============================================
app.get('/api/weather-coords/:lat/:lon', async (req, res) => {
    try {
        const { lat, lon } = req.params;
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(404).json({ error: 'Location not found' });
        }
        
        const data = await response.json();
        
        // Save to history
        saveToHistory(data.name, data);
        
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// ============================================
// ROUTE 3: GET SEARCH HISTORY
// ============================================
app.get('/api/history', (req, res) => {
    try {
        const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        res.json(history);
    } catch (error) {
        res.json({ searches: [] });
    }
});

// ============================================
// ROUTE 4: CLEAR HISTORY
// ============================================
app.delete('/api/history', (req, res) => {
    try {
        fs.writeFileSync(historyPath, JSON.stringify({ searches: [] }, null, 2));
        res.json({ message: 'History cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear history' });
    }
});

// ============================================
// HELPER FUNCTION: SAVE TO HISTORY
// ============================================
function saveToHistory(city, data) {
    try {
        let history = { searches: [] };
        
        // Read existing history
        if (fs.existsSync(historyPath)) {
            history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        }
        
        // Create search entry
        const searchEntry = {
            city: city,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            timestamp: new Date().toISOString()
        };
        
        // Remove duplicate city searches
        history.searches = history.searches.filter(s => s.city.toLowerCase() !== city.toLowerCase());
        
        // Add new search to beginning
        history.searches.unshift(searchEntry);
        
        // Keep only last 10 searches
        history.searches = history.searches.slice(0, 10);
        
        // Save to file
        fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
        
    } catch (error) {
        console.error('Error saving history:', error);
    }
}


// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🚀 Weather Backend running on http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   GET  /api/weather/:city`);
    console.log(`   GET  /api/weather-coords/:lat/:lon`);
    console.log(`   GET  /api/history`);
    console.log(`   DELETE /api/history`);
});