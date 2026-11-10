import React, { useState } from "react";
import logoImg from "../assets/track-automotive-logo.png";

export interface TrackLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "nav";
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

const heightMap: Record<NonNullable<TrackLogoProps["size"]>, string> = {
  sm: "36px",
  md: "48px",
  lg: "60px",
  xl: "80px",
  nav: "70px", // Target ~144px width on desktop (1024 / 499 aspect ratio)
};

export const TrackLogo: React.FC<TrackLogoProps> = ({
  size = "md",
  className = "",
  imgClassName = "",
  priority = false,
  style = {},
}) => {
  const height = heightMap[size];
  const [imgSrc, setImgSrc] = useState<string>(logoImg);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={imgSrc}
        onError={() => {
          // Dual fallback guarantee: static public path if hashed asset fails
          if (imgSrc !== "/assets/track-automotive-logo.png") {
            setImgSrc("/assets/track-automotive-logo.png");
          }
        }}
        alt="TRACK AUTOMOTIVE Official Logo"
        loading={priority ? "eager" : "lazy"}
        className={imgClassName}
        style={{
          height,
          width: "auto",
          aspectRatio: "1024 / 499",
          objectFit: "contain",
          display: "block",
          ...style,
        }}
      />
    </div>
  );
};

export default TrackLogo;
