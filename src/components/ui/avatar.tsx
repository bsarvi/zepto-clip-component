import { FunctionComponent, ImgHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Avatar: FunctionComponent<AvatarProps> = ({ className, src, alt }) => {
  return (
    <img
      className={cn("w-6 h-6 rounded-full", className)}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
