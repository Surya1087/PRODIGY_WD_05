// ============================================
// MAIN APPLICATION CONTROLLER
// Coordinates all UI updates and interactions
// ============================================

class WeatherApp {
    constructor() {
        this.initElements();
        this.attachEventListeners();
        this.loadHistory();
        
        // Auto-load weather on startup
        this.autoLoadWeather();
    }

    // Initialize DOM elements
    initElements() {
        // Input elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        
        // State elements
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Weather data elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.temperature = document.getElementById('temperature');
        this.weatherCondition = document.getElementById('weatherCondition');
        this.feelsLike = document.getElementById('feelsLike');
        this.minTemp = document.getElementById('minTemp');
        this.maxTemp = document.getElementById('maxTemp');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.pressure = document.getElementById('pressure');
        this.visibility = document.getElementById('visibility');
        this.mainIcon = document.getElementById('mainIcon');
        
        // Additional elements
        this.humidityGauge = document.getElementById('humidityGauge');
        this.windDirection = document.getElementById('windDirection');
        this.pressureIndicator = document.getElementById('pressureIndicator');
        this.visibilityStatus = document.getElementById('visibilityStatus');
        this.insightsContent = document.getElementById('insightsContent');
        this.historyContent = document.getElementById('historyContent');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        
        // Background
        this.dynamicBg = document.getElementById('dynamicBg');
        this.bgGradient = this.dynamicBg.querySelector('.bg-gradient');
        this.weatherParticles = document.getElementById('weatherParticles');
    }

    // Attach all event listeners
    attachEventListeners() {
        // Search button click
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        
        // Enter key in search input
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
        
        // Location button click
        this.locationBtn.addEventListener('click', () => this.useCurrentLocation());
        
        // Clear history button
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
    }

    // Auto-load weather on startup
    async autoLoadWeather() {
        // Try to get user location
        try {
            const coords = await window.weatherService.getCurrentLocation();
            await this.fetchWeatherByCoords(coords.lat, coords.lon);
        } catch (error) {
            // Fallback to a default city
            console.log('Could not get location, loading default city');
            await this.fetchWeatherByCity('London');
        }
    }

    // Search weather by city input
    async searchWeather() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        await this.fetchWeatherByCity(city);
    }

    // Use current location
    async useCurrentLocation() {
        this.showLoading();
        
        try {
            const coords = await window.weatherService.getCurrentLocation();
            await this.fetchWeatherByCoords(coords.lat, coords.lon);
        } catch (error) {
            this.showError('Unable to get your location. Please allow location access.');
        }
    }

    // Fetch weather by city name
    async fetchWeatherByCity(city) {
        this.showLoading();
        
        try {
            const data = await window.weatherService.getWeatherByCity(city);
            this.displayWeather(data);
            this.loadHistory(); // Refresh history
        } catch (error) {
            this.showError('City not found. Please check spelling and try again.');
        }
    }

    // Fetch weather by coordinates
    async fetchWeatherByCoords(lat, lon) {
        this.showLoading();
        
        try {
            const data = await window.weatherService.getWeatherByCoords(lat, lon);
            this.displayWeather(data);
            this.loadHistory(); // Refresh history
        } catch (error) {
            this.showError('Unable to fetch weather for this location.');
        }
    }

    // Display weather data
    displayWeather(data) {
        // Update location and date
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = this.formatDate(new Date());
        
        // Update temperature
        this.temperature.textContent = Math.round(data.main.temp);
        this.weatherCondition.textContent = data.weather[0].description;
        this.feelsLike.querySelector('span').textContent = Math.round(data.main.feels_like);
        this.minTemp.textContent = `${Math.round(data.main.temp_min)}°`;
        this.maxTemp.textContent = `${Math.round(data.main.temp_max)}°`;
        
        // Update weather icon
        this.mainIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        this.mainIcon.alt = data.weather[0].description;
        
        // Update weather details
        this.humidity.textContent = `${data.main.humidity}%`;
        this.humidityGauge.style.width = `${data.main.humidity}%`;
        
        this.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        if (data.wind.deg) {
            this.windDirection.style.transform = `rotate(${data.wind.deg}deg)`;
        }
        
        this.pressure.textContent = `${data.main.pressure} hPa`;
        this.updatePressureIndicator(data.main.pressure);
        
        this.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
        this.updateVisibilityStatus(data.visibility);
        
        // Update background based on weather
        this.updateBackground(data.weather[0].main);
        
        // Generate and display insights
        this.displayInsights(data);
        
        // Show weather display
        this.showWeatherDisplay();
    }

    // Update pressure indicator
    updatePressureIndicator(pressure) {
        if (pressure < 1000) {
            this.pressureIndicator.textContent = 'Low';
            this.pressureIndicator.style.background = 'rgba(239, 68, 68, 0.1)';
            this.pressureIndicator.style.color = '#ef4444';
        } else if (pressure > 1020) {
            this.pressureIndicator.textContent = 'High';
            this.pressureIndicator.style.background = 'rgba(59, 130, 246, 0.1)';
            this.pressureIndicator.style.color = '#3b82f6';
        } else {
            this.pressureIndicator.textContent = 'Normal';
            this.pressureIndicator.style.background = 'rgba(16, 185, 129, 0.1)';
            this.pressureIndicator.style.color = '#10b981';
        }
    }

    // Update visibility status
    updateVisibilityStatus(visibility) {
        if (visibility < 1000) {
            this.visibilityStatus.textContent = 'Poor';
            this.visibilityStatus.style.background = 'rgba(239, 68, 68, 0.1)';
            this.visibilityStatus.style.color = '#ef4444';
        } else if (visibility < 5000) {
            this.visibilityStatus.textContent = 'Moderate';
            this.visibilityStatus.style.background = 'rgba(251, 191, 36, 0.1)';
            this.visibilityStatus.style.color = '#f59e0b';
        } else {
            this.visibilityStatus.textContent = 'Good';
            this.visibilityStatus.style.background = 'rgba(16, 185, 129, 0.1)';
            this.visibilityStatus.style.color = '#10b981';
        }
    }

    // Update background based on weather condition
    updateBackground(condition) {
        // Remove all weather classes
        this.bgGradient.className = 'bg-gradient';
        this.weatherParticles.innerHTML = '';
        
        const main = condition.toLowerCase();
        
        if (main.includes('clear')) {
            this.bgGradient.classList.add('bg-clear');
        } else if (main.includes('cloud')) {
            this.bgGradient.classList.add('bg-clouds');
        } else if (main.includes('rain') || main.includes('drizzle')) {
            this.bgGradient.classList.add('bg-rain');
            this.createRainEffect();
        } else if (main.includes('snow')) {
            this.bgGradient.classList.add('bg-snow');
            this.createSnowEffect();
        } else if (main.includes('thunderstorm')) {
            this.bgGradient.classList.add('bg-thunderstorm');
            this.createRainEffect();
        } else if (main.includes('mist') || main.includes('fog')) {
            this.bgGradient.classList.add('bg-mist');
        }
    }

    // Create rain effect
    createRainEffect() {
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.top = `${-Math.random() * 100}%`;
            drop.style.height = `${15 + Math.random() * 25}px`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            this.weatherParticles.appendChild(drop);
        }
    }

    // Create snow effect
    createSnowEffect() {
        for (let i = 0; i < 30; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-flake';
            flake.textContent = '❄';
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.top = `${-Math.random() * 100}%`;
            flake.style.fontSize = `${0.8 + Math.random() * 1}em`;
            flake.style.animationDelay = `${Math.random() * 5}s`;
            this.weatherParticles.appendChild(flake);
        }
    }

    // Display insights
    displayInsights(data) {
        const insights = window.insightsGenerator.generateInsights(data);
        
        this.insightsContent.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-text">
                    <h4>${insight.title}</h4>
                    <p>${insight.message}</p>
                </div>
            </div>
        `).join('');
    }

    // Load and display history
    async loadHistory() {
        const history = await window.weatherService.getHistory();
        
        if (history.length === 0) {
            this.historyContent.innerHTML = '<div class="history-empty">No recent searches</div>';
            return;
        }
        
        this.historyContent.innerHTML = history.map(item => `
            <div class="history-item" onclick="app.fetchWeatherByCity('${item.city}')">
                <div class="history-location">
                    <strong>${item.city}, ${item.country}</strong>
                    <small>${this.formatHistoryDate(item.timestamp)}</small>
                </div>
                <div class="history-temp">${item.temp}°</div>
            </div>
        `).join('');
    }

    // Clear history
    async clearHistory() {
        const success = await window.weatherService.clearHistory();
        if (success) {
            this.loadHistory();
        }
    }

    // Format date
    formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format history date
    formatHistoryDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }

    // UI state management
    showLoading() {
        this.loadingState.style.display = 'block';
        this.errorState.style.display = 'none';
        this.weatherDisplay.style.display = 'none';
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorState.style.display = 'block';
        this.loadingState.style.display = 'none';
        this.weatherDisplay.style.display = 'none';
    }

    showWeatherDisplay() {
        this.weatherDisplay.style.display = 'block';
        this.loadingState.style.display = 'none';
        this.errorState.style.display = 'none';
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new WeatherApp();
    });
} else {
    window.app = new WeatherApp();
}