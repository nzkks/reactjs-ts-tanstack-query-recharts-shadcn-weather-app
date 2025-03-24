## Weather App

- By default this app shows the weather information (min max temperature, humidity, wind speed and degree, sunrise, sunset) for the current location (location access prompts and once allowed by the user).
- The user can search for any city and get the weather information
- In the searched city weather page, it can be made a favorite one. This will show on the dashboard/home page
- In the search popup, the user can see their favourited cities, so they can click to check the weather information again
- In the search popup, the user can see their recent 10 previous city searches (history), so they can click to check the weather information again
- The user can change the theme between light and dark

### Tech used

- React.js
- Typescript
- Tanstack Query
- Recharts
- shadcn/ui

### Implementation Highlights

- Fetches weather data using `https://api.openweathermap.org/data/2.5/` API
- Fetches geocoding/location data using `http://api.openweathermap.org/geo/1.0` API
- Implemented error handling including the errors from the API and show friendly error messages
- Implemented localStorage for the history feature and favourite feature
- Implemented custom hooks for each feature
- Implemented the skeletons hile fetching the weather data the user can see
- Used shadcn/ui for UI elements and Tailwind CSS for styling
