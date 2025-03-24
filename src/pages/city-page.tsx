import { useParams, useSearchParams } from 'react-router';

import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import WeatherSkeleton from '@/components/loading-skeleton';
import LocationAlert from '@/components/location-alert';
import WeatherWidgets from '@/components/weather-widgets';
import PageTitle from '@/components/page-title';
import FavouriteButton from '@/components/favourite-button';

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
    <div className="space-y-4">
      <PageTitle
        name={params.cityName}
        state={state}
        country={country}
        button={<FavouriteButton data={{ ...weatherQuery.data, name: params.cityName }} />}
      />
      <WeatherWidgets weatherQueryData={weatherQuery.data} forecastQueryData={forecastQuery.data} />
    </div>
  );
}
