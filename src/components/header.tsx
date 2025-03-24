import { Link } from 'react-router';

import { ModeToggle } from '@/components/mode-toggle';
import { CitySearch } from '@/components/city-search';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={'/'}>Logo</Link>

        <div className="flex gap-4">
          <CitySearch /> <ModeToggle />
        </div>
      </div>
    </header>
  );
}
