import { Link } from 'react-router';

import { ModeToggle } from '@/components/mode-toggle';
import { CitySearch } from '@/components/city-search';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto px-4 pb-4">
        <div className="h-16 grid gap-2 md:grid-cols-2 items-center">
          <Link to={'/'}>NZKKS</Link>

          <div className="flex items-center gap-4">
            <CitySearch /> <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
