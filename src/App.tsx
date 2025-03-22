import { BrowserRouter } from 'react-router';

import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>Hello NZKKS</Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
