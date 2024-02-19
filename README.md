[![Netlify Status](https://api.netlify.com/api/v1/badges/ac508cad-005f-4a52-ac56-79f307b6e862/deploy-status)](https://anga-weather.netlify.app/)

# Anga: Vue.js Weather Application

**Anga** is a simple and intuitive weather application built using Vue.js. It allows users to view current weather conditions and the 3-hour forecast for up to 5 days. With a user-friendly interface, Anga makes it easy to manage saved locations and add new ones.

## Features

1. **Homepage**: The homepage displays all your saved locations. You can quickly glance at the weather information for each location.

2. **Search Bar**: Use the search bar to find and add new locations. Anga leverages an external weather API (OpenWeather) and a geocoding API (Mapbox) to fetch accurate weather data and location data.

3. **Current Weather**: Get real-time weather updates for your selected locations.

4. **3-Hour Forecast**: Plan ahead with the 3-hour forecast. Anga shows you how the weather will change throughout the day, allowing you to make informed decisions.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Arnie1x/anga.git
   ```

2. Navigate to the project directory:

   ```bash
   cd anga
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:8080](http://localhost:8080) to access Anga.

## Configuration

1. Obtain the [MapBox GeoCoding](https://www.mapbox.com/geocoding) and [OpenWeather](https://openweathermap.org/api) API keys

2. Create a `.env` file in the root directory and add your API key:

   ```env
   VITE_OPEN_WEATHER_API_KEY=key_here
   VITE_MAPBOX_API_KEY=key_here
   ```

## Contributing

Contributions are welcome! If you find any issues or have ideas for improvements, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
