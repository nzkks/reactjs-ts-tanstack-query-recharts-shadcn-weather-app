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
  const state = searchParams.get('state') || '';
  const country = searchParams.get('country') || '';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName},{' '}
          <span className="text-muted-foreground">
            {state ? `${state}, ` : ''} {country}
          </span>
        </h1>
        <div className="flex gap-2">Favourite Button</div>
      </div>
      <WeatherWidgets weatherQueryData={weatherQuery.data} forecastQueryData={forecastQuery.data} />
    </div>
  );
}
