import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { IUser } from "../types";
import { useDebounce } from "../hooks/use-debounce-hook";
import UserDropDownList from "./user-drop-down-list";

interface UserPickDropdownProps {
  availableUser: IUser[];
  handleOnClick: (id: string) => void;
  handleFilter: (input: string) => void;
}

const UserPickDropdown: FunctionComponent<UserPickDropdownProps> = ({
  availableUser,
  handleOnClick,
  handleFilter,
}) => {
  const [input, setInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedValue = useDebounce(input, 300);

  useEffect(() => {
    handleFilter(debouncedValue);
  }, [debouncedValue, handleFilter]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        console.log("hello");
        setIsInputFocused(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownRef, inputRef, setIsInputFocused]);

  const handleClick = (id: string) => {
    handleOnClick(id);
  };

  return (
    <div className="w-[450px] relative">
      <Input
        placeholder="Add new user"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        ref={inputRef}
        className="text-xl tracking-wide "
      />
      {isInputFocused && (
        <div
          className="absolute w-full  shadow-lg bg-white z-2 mt-2 "
          ref={dropdownRef}
        >
          <UserDropDownList
            availableUser={availableUser}
            handleClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default UserPickDropdown;
