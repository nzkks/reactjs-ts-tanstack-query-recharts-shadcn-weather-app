import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

import { useGeolocation } from '@/hooks/use-geolocation';
import WeatherSkeleton from '@/components/loading-skeleton';
import LocationAlert from '@/components/location-alert';

export default function WeatherDashboard() {
  const { coordinates, error: locationError, isLoading: locationLoading, getLocation } = useGeolocation();

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      // reload weather data
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

  return (
    <div className="space-y-4">
      {/* Favorite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-fold tracking-tight">My Location</h1>
        <Button
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          // disabled={}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Current and Hourly weather */}
    </div>
  );
}
