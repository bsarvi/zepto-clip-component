import { FunctionComponent } from "react";
import Avatar from "./ui/avatar";
import { IUser } from "../types";

interface UserDropDownListProps {
  availableUser: IUser[];
  handleClick: (id: string) => void;
}

const UserDropDownList: FunctionComponent<UserDropDownListProps> = ({
  availableUser,
  handleClick,
}) => {
  if (availableUser.length <= 0) {
    return (
      <div className="my-4 text-center">
        <p className="text-neutral-600">No user Available</p>
      </div>
    );
  }
  return (
    <>
      <ul className="max-h-[350px] overflow-y-auto ">
        {availableUser.map((user) => (
          <li
            className="flex gap-4 items-center p-2 hover:bg-neutral-300"
            onClick={() => handleClick(user.id)}
            key={user.id}
          >
            <Avatar
              src={user.profileImage}
              alt={user.name}
              className="w-8 h-8"
            />
            <h3 className="w-max">{user.name}</h3>
            <p className="text-neutral-600 text-[12px] ">{user.email}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDropDownList;
