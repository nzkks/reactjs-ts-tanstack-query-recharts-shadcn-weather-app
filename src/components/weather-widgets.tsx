import { ForecastData, GeocodingResponse, WeatherData } from '@/api/types';
import CurrentWeather from './current-weather';
import { HourlyTemperature } from './hourly-temperature';
import { WeatherDetails } from './weather-details';
import { WeatherForecast } from './weather-forecast';

type Props = {
  locationDetails?: GeocodingResponse;
  weatherQueryData: WeatherData;
  forecastQueryData: ForecastData;
};

export default function WeatherWidgets({ locationDetails, weatherQueryData, forecastQueryData }: Props) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <CurrentWeather data={weatherQueryData} locationDetails={locationDetails} />
        <HourlyTemperature data={forecastQueryData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <WeatherDetails data={weatherQueryData} />
        <WeatherForecast data={forecastQueryData} />
      </div>
    </div>
  );
}
