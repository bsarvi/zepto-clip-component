import { useCallback, useState } from "react";
import Chip from "./components/ui/chip";

import { userData } from "./content";
import UserPickDropdown from "./components/user-pick-dropdown";
import { IUser } from "./types";

const App = () => {
  const [selectedUserMap, setSelectedUserMap] = useState(
    new Map<string, IUser>()
  );
  const [availableUser, setAvailableUser] = useState(userData);

  const addToSelectedUser = (id: string) => {
    const userToMove = availableUser.find((user) => user.id === id);

    setAvailableUser((curr) => curr.filter((user) => user.id !== id));
    if (userToMove) {
      setSelectedUserMap((prevMap) => new Map(prevMap).set(id, userToMove));
    }
  };

  const removeFromSelected = (id: string) => {
    const userToMove = selectedUserMap.get(id);

    setSelectedUserMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(id);
      return newMap;
    });

    if (userToMove) {
      setAvailableUser((curr) => [...curr, userToMove]);
    }
  };

  const filterBasedOnInput = useCallback(
    (input: string) => {
      const lowercaseInput = input.toLowerCase();

      if (!input) {
        setAvailableUser(
          userData.filter((user) => !selectedUserMap.has(user.id))
        );
        return;
      }

      const filteredUsers = userData.filter((user) => {
        const lowercaseName = user.name.toLowerCase();
        const lowercaseEmail = user.email.toLowerCase();

        const isNotSelected = !selectedUserMap.has(user.id);

        return (
          isNotSelected &&
          (lowercaseName.includes(lowercaseInput) ||
            lowercaseEmail.includes(lowercaseInput))
        );
      });

      setAvailableUser([...filteredUsers]);
    },
    [selectedUserMap]
  );

  return (
    <main className="h-full mt-8">
      <div className="container mx-auto px-4.5">
        <h1 className="text-center w-full text-blue-500 p-2 text-2xl font-bold">
          Pick Users
        </h1>
        <div className="my-4 py-2 pb-4 border-b-2 border-blue-700 w-full max-w-[1024px] mx-auto mt-8">
          <div className="flex flex-wrap gap-1">
            {[...selectedUserMap.values()].map((user) => (
              <Chip
                user={user}
                handleRemove={removeFromSelected}
                key={user.id}
              />
            ))}
            <UserPickDropdown
              availableUser={availableUser}
              handleOnClick={addToSelectedUser}
              handleFilter={filterBasedOnInput}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
