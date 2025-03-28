import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useLocalStorage } from './use-local-storage';
import { FavouriteCity } from '@/api/types';

export function useFavourites() {
  const [favourites, setFavourites] = useLocalStorage<FavouriteCity[]>('favourites', []);

  const queryClient = useQueryClient();

  const favouritesQuery = useQuery({
    queryKey: ['favourites'],
    queryFn: () => favourites,
    initialData: favourites,
    staleTime: Infinity,
  });

  const addFavourite = useMutation({
    mutationFn: async (city: Omit<FavouriteCity, 'id' | 'addedAt'>) => {
      const newFavourite: FavouriteCity = { ...city, id: `${city.lat}-${city.lon}}`, addedAt: Date.now() };

      // prevent duplicate
      const exists = favourites.some(fav => fav.id === newFavourite.id);
      if (exists) return favourites;

      const newFavourites = [newFavourite, ...favourites];
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });

  const removeFavourite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavourites = favourites.filter(fav => fav.id !== cityId);
      setFavourites(newFavourites);
      return newFavourites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });

  return {
    favourites: favouritesQuery.data,
    addFavourite,
    removeFavourite,
    isFavourite: (lat: number, lon: number) => favourites.some(fav => fav.lat === lat && fav.lon === lon),
  };
}
