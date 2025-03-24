import { useState } from 'react';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { Search, Loader2, Clock, XCircle, Star } from 'lucide-react';

import { useLocationSearch } from '@/hooks/use-weather';
import { useSearchHistory } from '@/hooks/use-search-history';
import { useFavourites } from '@/hooks/use-favourites';
import { FavouriteCity } from '@/api/types';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { favourites } = useFavourites();
  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, state, country] = cityData.split('|');

    addToHistory.mutate({ query, lat: parseFloat(lat), lon: parseFloat(lon), name, state, country });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}&country=${country}&state=${state}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search cities..." value={query} onValueChange={setQuery} />
        <CommandList>
          {query.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}

          {/* Favorites Section */}
          {favourites.length > 0 && (
            <CommandGroup heading="Favorites">
              {favourites.map((city: FavouriteCity) => (
                <CommandItem
                  key={city.id}
                  value={`${city.lat}|${city.lon}|${city.name}|${city.country}|${city.state}`}
                  onSelect={handleSelect}
                >
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{city.name}</span>
                  {city.state && <span className="text-sm text-muted-foreground">, {city.state}</span>}
                  <span className="text-sm text-muted-foreground">, {city.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* Search History Section */}
          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">Recent Searches</p>
                  <Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map(item => (
                  <CommandItem
                    key={item.id}
                    value={`${item.lat}|${item.lon}|${item.name}|${item.country}|${item.state}`}
                    onSelect={handleSelect}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{item.name}</span>
                    {item.state && <span className="text-sm text-muted-foreground">, {item.state}</span>}
                    <span className="text-sm text-muted-foreground">, {item.country}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {format(item.searchedAt, 'MMM d, h:mm a')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {/* Search Results */}
          <CommandSeparator />
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}

              {locations?.map(location => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}|${location.state}`}
                  onSelect={handleSelect}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>{location.name}</span>
                  {location.state && <span className="text-sm text-muted-foreground">, {location.state}</span>}
                  <span className="text-sm text-muted-foreground">, {location.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
