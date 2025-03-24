import { useParams, useSearchParams } from 'react-router';

import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import WeatherSkeleton from '@/components/loading-skeleton';
import LocationAlert from '@/components/location-alert';
import WeatherWidgets from '@/components/weather-widgets';

export default function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lon = parseFloat(searchParams.get('lon') || '0');

  const locationDetails = {
    name: params.cityName || '',
    state: searchParams.get('state') || '',
    country: searchParams.get('country') || '',
    lat,
    lon,
  };
  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <LocationAlert
        variant="destructive"
        title="Error"
        description="Failed to load weather data. Please try again."
        showButton={false}
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <WeatherWidgets
      locationDetails={locationDetails}
      weatherQueryData={weatherQuery.data}
      forecastQueryData={forecastQuery.data}
    />
  );
}
