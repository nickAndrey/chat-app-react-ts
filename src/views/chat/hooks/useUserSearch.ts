import { usersSearch } from '@/shared/services/users-search';
import type { PublicUser } from '@/shared/types/user';
import { handleError } from '@/shared/utils/handle-error';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

const useUserSearch = () => {
  const [usersList, setUsersList] = useState<PublicUser[]>([]);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);

  const searchValueDebounced = useDebounce(searchValue, 300);

  useEffect(() => {
    const controller = new AbortController();

    async function findUsers() {
      if (searchValueDebounced === null) return;

      try {
        const users = await usersSearch({
          searchValue: searchValueDebounced,
          options: { signal: controller.signal },
        });

        setUsersList(users);
      } catch (error) {
        const { message } = handleError(error);
        console.log(message);
      }
    }

    findUsers();

    return () => {
      controller.abort();
    };
  }, [searchValueDebounced]);

  return {
    usersList,
    searchValue,
    selectedUser,
    setSelectedUser,
    setSearchValue,
  };
};

export default useUserSearch;
