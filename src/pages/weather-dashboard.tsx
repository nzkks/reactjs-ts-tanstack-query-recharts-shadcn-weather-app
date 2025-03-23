import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useGeolocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import WeatherSkeleton from '@/components/loading-skeleton';
import LocationAlert from '@/components/location-alert';
import CurrentWeather from '@/components/current-weather';
import { HourlyTemperature } from '@/components/hourly-temperature';

export default function WeatherDashboard() {
  const { coordinates, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <LocationAlert
        variant="destructive"
        title="Location Error"
        description={locationError}
        btnText="Enable Location"
        btnFunction={getLocation}
      />
    );
  }

  if (!coordinates) {
    return (
      <LocationAlert
        title="Location Required"
        description="Please enable location access to see your local weather."
        btnText="Enable Location"
        btnFunction={getLocation}
      />
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <LocationAlert
        variant="destructive"
        title="Error"
        description="Failed to fetch weather data. Please try again."
        btnText="Retry"
        btnFunction={handleRefresh}
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favorite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-fold tracking-tight">My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div>
          <CurrentWeather data={weatherQuery.data} locationName={locationName} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div>
          {/* details */}
          {/* forecast */}
        </div>
      </div>
    </div>
  );
}
