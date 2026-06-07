import type { ImgHTMLAttributes } from "react";
import { useState } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc: string;
};

export function AssetImage({ fallbackSrc, onError, src, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
