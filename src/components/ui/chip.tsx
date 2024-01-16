import { HTMLProps, FunctionComponent } from "react";
import { cn } from "../../lib/utils";
import { IUser } from "../../types";
import { X } from "lucide-react";
import Avatar from "./avatar";

interface ChipProps extends HTMLProps<HTMLDivElement> {
  user: IUser;
  handleRemove: (id: string) => void;
}

const Chip: FunctionComponent<ChipProps> = ({
  className,
  user,
  handleRemove,
}) => {
  return (
    <div
      className={cn(
        "bg-neutral-500 text-white px-4 py-2 h-10 rounded-full inline-flex items-center gap-x-2",
        className
      )}
    >
      <Avatar alt={user.name} src={user.profileImage} />
      <span>{user.name}</span>
      <button
        onClick={() => {
            handleRemove(user.id);
        }}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default Chip;
