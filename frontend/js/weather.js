// ============================================
// WEATHER API SERVICE
// Connects to backend and handles data
// ============================================

const API_BASE = 'http://localhost:3000/api';

class WeatherService {
    constructor() {
        this.lastWeatherData = null;
    }

    // Fetch weather by city name
    async getWeatherByCity(city) {
        try {
            const response = await fetch(`${API_BASE}/weather/${encodeURIComponent(city)}`);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            this.lastWeatherData = data;
            
            // Save to localStorage for offline fallback
            localStorage.setItem('lastWeatherData', JSON.stringify(data));
            
            return data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            
            // Try offline fallback
            const cached = localStorage.getItem('lastWeatherData');
            if (cached) {
                console.log('Using cached data');
                return JSON.parse(cached);
            }
            
            throw error;
        }
    }

    // Fetch weather by coordinates
    async getWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(`${API_BASE}/weather-coords/${lat}/${lon}`);
            
            if (!response.ok) {
                throw new Error('Location not found');
            }
            
            const data = await response.json();
            this.lastWeatherData = data;
            
            // Save to localStorage for offline fallback
            localStorage.setItem('lastWeatherData', JSON.stringify(data));
            
            return data;
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }

    // Get search history from backend
    async getHistory() {
        try {
            const response = await fetch(`${API_BASE}/history`);
            const data = await response.json();
            return data.searches || [];
        } catch (error) {
            console.error('Error fetching history:', error);
            return [];
        }
    }

    // Clear search history
    async clearHistory() {
        try {
            await fetch(`${API_BASE}/history`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error('Error clearing history:', error);
            return false;
        }
    }

    // Get current user location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
}

// Create global instance
window.weatherService = new WeatherService();