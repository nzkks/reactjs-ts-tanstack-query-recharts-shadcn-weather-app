import { ForecastData, WeatherData } from '@/api/types';
import CurrentWeather from './current-weather';
import { HourlyTemperature } from './hourly-temperature';
import { WeatherDetails } from './weather-details';
import { WeatherForecast } from './weather-forecast';

type Props = {
  weatherQueryData: WeatherData;
  forecastQueryData: ForecastData;
};

export default function WeatherWidgets({ weatherQueryData, forecastQueryData }: Props) {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <CurrentWeather data={weatherQueryData} />
        <HourlyTemperature data={forecastQueryData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        <WeatherDetails data={weatherQueryData} />
        <WeatherForecast data={forecastQueryData} />
      </div>
    </div>
  );
}
