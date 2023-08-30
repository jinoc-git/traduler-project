import React from 'react';

// import favoriteDefault from '@assets/icons/1x/ic-favorite-default-1x.png';
// import favoriteSolid from '@assets/icons/1x/ic-favorite-solid-1x.png';
// import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
// import { useQueryClient } from '@tanstack/react-query';

interface FavoriteProps {
  isFavorite: boolean;
  planId: string;
}

const Favorite: React.FC<FavoriteProps> = ({ isFavorite, planId }) => {
  // const [status, setStatus] = useState(isFavorite);
  // const queryClient = useQueryClient();
  // const useId = '10d4b5c3-12d6-486b-862b-6f63c0c9f4fc';
  // const newBookMarkId = uuid();
  // const addMutation = useMutation<
  //   void,
  //   // ErrorConstructor,
  //   Error
  // >(
  //   async () => {
  //     await addBookMark(newBookMarkId, useId, planId);
  //   },
  //   {
  //     onMutate: async () => {
  //       await queryClient.cancelQueries(['plans']);
  //       const previousData = queryClient.getQueryData(queryKey);
  //       queryClient.setQueryData(['plans'], (old) => (old, planId)); // 성공했을 때 받아오는 데이터를 직접 세팅
  //       return { previousData };
  //     },
  //     onError: (err, newFavorite, context) => {
  //       queryClient.setQueryData(['plans'], context?.previousData);
  //     },
  //     onSettled: () => {
  //       console.log('onSetteled');
  //       queryClient.invalidateQueries(['plans']);
  //     },
  //   },
  // );

  // addMutation.mutate();

  // const deletemutaition = useMutation(
  //   async () => {
  //     await deleteFavorite(planId);
  //   },
  //   {
  //     onMutate: async () => {
  //       await queryClient.cancelQueries(querykey);
  //       const previousData = queryClient.getQueriesData(querykey);
  //       queryClient.setQueriesData(queryKey, (old) =>
  //         removeFavorite(old, planId),
  //       );
  //       return { previousData };
  //     },
  //     onError: (err, variables, context) => {
  //       queryClient.setQueriesData(queryKey, context?.previousData);
  //     },
  //   },
  // );

  // const favoriteHandler = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   e.stopPropagation();

  //   if (status) {
  //     await deletemutation.mutateAsync();
  //     console.log('deletemutation 동작');
  //   } else {
  //     await addMutation.mutateAsync();
  //     console.log('addMutation 동작');
  //   }
  //   setStatus((prev) => !prev);
  // };
  return (
    <button>
      <img
        className="cursor-pointer w- h-4"
        // src={status ? favoriteSolid : favoriteDefault}
        alt="Favorite Icon"
      />
    </button>
  );
};

export default Favorite;
