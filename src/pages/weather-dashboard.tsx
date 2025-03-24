import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useGeolocation } from '@/hooks/use-geolocation';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import WeatherSkeleton from '@/components/loading-skeleton';
import LocationAlert from '@/components/location-alert';
import WeatherWidgets from '@/components/weather-widgets';
import PageTitle from '@/components/page-title';

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

  const locationDetails = locationQuery.data?.[0];

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

      {locationDetails && (
        <PageTitle
          name={locationDetails.name}
          state={locationDetails.state}
          country={locationDetails.country}
          button={
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            >
              <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />
            </Button>
          }
        />
      )}

      <WeatherWidgets weatherQueryData={weatherQuery.data} forecastQueryData={forecastQuery.data} />
    </div>
  );
}
