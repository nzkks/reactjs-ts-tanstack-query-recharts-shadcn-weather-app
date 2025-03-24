import { toast } from 'sonner';
import { Star } from 'lucide-react';

import type { WeatherData } from '@/api/types';
import { useFavourites } from '@/hooks/use-favourites';
import { Button } from '@/components/ui/button';

type Props = {
  data: WeatherData;
};

export default function FavouriteButton({ data }: Props) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const isCurrentlyFavorite = isFavourite(lat, lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavourite.mutate(`${lat}-${lon}}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavourite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavorite ? 'default' : 'outline'}
      size="icon"
      onClick={handleToggleFavorite}
      className={isCurrentlyFavorite ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
    >
      <Star className={`h-4 w-4 ${isCurrentlyFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
}
