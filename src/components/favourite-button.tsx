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
  const isCurrentlyFavourite = isFavourite(lat, lon);

  const handleToggleFavourite = () => {
    if (isCurrentlyFavourite) {
      removeFavourite.mutate(`${lat}-${lon}}`);
      toast.error(`Removed ${data.name} from Favourites`);
    } else {
      addFavourite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favourites`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFavourite ? 'default' : 'outline'}
      size="icon"
      onClick={handleToggleFavourite}
      className={isCurrentlyFavourite ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
    >
      <Star className={`h-4 w-4 ${isCurrentlyFavourite ? 'fill-current' : ''}`} />
    </Button>
  );
}
