// ============================================
// SMART INSIGHTS GENERATOR
// Generates weather-based tips and alerts
// ============================================

class InsightsGenerator {
    
    // Generate all insights based on weather data
    generateInsights(weatherData) {
        const insights = [];
        const temp = weatherData.main.temp;
        const condition = weatherData.weather[0].main.toLowerCase();
        const humidity = weatherData.main.humidity;
        const windSpeed = weatherData.wind.speed * 3.6; // Convert to km/h
        
        // Temperature-based insights
        if (temp > 35) {
            insights.push({
                icon: '🔥',
                title: 'Extreme Heat Alert',
                message: 'Stay hydrated and avoid prolonged sun exposure. Wear light, breathable clothing.'
            });
        } else if (temp > 30) {
            insights.push({
                icon: '☀️',
                title: 'Hot Weather',
                message: 'It\'s hot outside! Drink plenty of water and use sunscreen if going out.'
            });
        } else if (temp < 0) {
            insights.push({
                icon: '🥶',
                title: 'Freezing Temperature',
                message: 'Bundle up! Wear warm layers, gloves, and a hat. Watch for icy conditions.'
            });
        } else if (temp < 10) {
            insights.push({
                icon: '❄️',
                title: 'Cold Weather',
                message: 'It\'s chilly. Wear a jacket and warm clothes when heading outside.'
            });
        } else if (temp >= 20 && temp <= 25) {
            insights.push({
                icon: '🌤️',
                title: 'Perfect Weather',
                message: 'Ideal temperature for outdoor activities! Great day to go for a walk.'
            });
        }

        // Rain-based insights
        if (condition.includes('rain') || condition.includes('drizzle')) {
            insights.push({
                icon: '☔',
                title: 'Rainy Conditions',
                message: 'Don\'t forget your umbrella! Roads may be slippery, drive carefully.'
            });
        }

        // Snow insights
        if (condition.includes('snow')) {
            insights.push({
                icon: '⛄',
                title: 'Snowy Weather',
                message: 'Watch for snow accumulation. Drive slowly and give yourself extra time.'
            });
        }

        // Thunderstorm warnings
        if (condition.includes('thunderstorm')) {
            insights.push({
                icon: '⚡',
                title: 'Thunderstorm Warning',
                message: 'Stay indoors if possible. Avoid using electronic devices during the storm.'
            });
        }

        // Humidity insights
        if (humidity > 80) {
            insights.push({
                icon: '💧',
                title: 'High Humidity',
                message: 'The air feels heavy. Stay in air-conditioned spaces when possible.'
            });
        } else if (humidity < 30) {
            insights.push({
                icon: '🏜️',
                title: 'Low Humidity',
                message: 'Dry air detected. Use moisturizer and stay hydrated.'
            });
        }

        // Wind insights
        if (windSpeed > 40) {
            insights.push({
                icon: '💨',
                title: 'Strong Winds',
                message: 'High winds expected. Secure loose objects and be cautious when driving.'
            });
        }

        // Visibility insights
        if (weatherData.visibility < 1000) {
            insights.push({
                icon: '🌫️',
                title: 'Poor Visibility',
                message: 'Foggy or misty conditions. Use headlights and drive carefully.'
            });
        }

        // Clothing recommendations
        const clothingTip = this.getClothingRecommendation(temp, condition);
        if (clothingTip) {
            insights.push(clothingTip);
        }

        // Activity suggestions
        const activityTip = this.getActivitySuggestion(temp, condition);
        if (activityTip) {
            insights.push(activityTip);
        }

        // If no specific insights, add a general one
        if (insights.length === 0) {
            insights.push({
                icon: '✨',
                title: 'Weather Update',
                message: 'Conditions are normal. Have a great day!'
            });
        }

        return insights;
    }

    // Get clothing recommendation
    getClothingRecommendation(temp, condition) {
        if (temp > 30) {
            return {
                icon: '👕',
                title: 'Clothing Tip',
                message: 'Wear light, loose-fitting clothes in light colors. Don\'t forget sunglasses!'
            };
        } else if (temp < 10) {
            return {
                icon: '🧥',
                title: 'Clothing Tip',
                message: 'Layer up! Wear a warm coat, scarf, and gloves.'
            };
        } else if (condition.includes('rain')) {
            return {
                icon: '🌂',
                title: 'Clothing Tip',
                message: 'Waterproof jacket recommended. Wear closed-toe shoes.'
            };
        } else if (temp >= 15 && temp <= 25) {
            return {
                icon: '👔',
                title: 'Clothing Tip',
                message: 'Comfortable casual wear is perfect. Maybe bring a light jacket.'
            };
        }
        return null;
    }

    // Get activity suggestion
    getActivitySuggestion(temp, condition) {
        if (temp >= 20 && temp <= 28 && !condition.includes('rain')) {
            return {
                icon: '🚴',
                title: 'Activity Suggestion',
                message: 'Great weather for outdoor activities like cycling, jogging, or picnics!'
            };
        } else if (condition.includes('rain')) {
            return {
                icon: '📚',
                title: 'Activity Suggestion',
                message: 'Perfect day to stay indoors. How about reading a book or watching movies?'
            };
        } else if (temp > 32) {
            return {
                icon: '🏊',
                title: 'Activity Suggestion',
                message: 'Beat the heat! Visit a pool or stay in air-conditioned places.'
            };
        }
        return null;
    }

    // Get weather risk level
    getRiskLevel(weatherData) {
        const temp = weatherData.main.temp;
        const condition = weatherData.weather[0].main.toLowerCase();
        const windSpeed = weatherData.wind.speed * 3.6;

        if (temp > 38 || temp < -5 || condition.includes('thunderstorm') || windSpeed > 50) {
            return 'high';
        } else if (temp > 33 || temp < 5 || condition.includes('rain') || windSpeed > 35) {
            return 'medium';
        }
        return 'low';
    }
}

// Create global instance
window.insightsGenerator = new InsightsGenerator();