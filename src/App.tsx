import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout';
import WeatherDashboard from '@/pages/weather-dashboard';
import CityPage from '@/pages/city-page';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
