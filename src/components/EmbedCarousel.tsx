"use client";
import React, { useEffect } from "react";

interface EmbedCarouselProps {
  boardName: string;
}

const EmbedCarousel: React.FC<EmbedCarouselProps> = ({ boardName }) => {
  useEffect(() => {
    const embedContainer = document.getElementById("yourEmbedContainer");

    if (!embedContainer) return;

    // const boardName = embedContainer.getAttribute("data-board-name");

    // if (!boardName) return;

    // Clean up any existing iframes before appending new ones
    embedContainer.innerHTML = "";

    // Create and configure the iframe
    const iframe = document.createElement("iframe");
    iframe.src = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/embed/${boardName}`;
    iframe.width = "100%";
    iframe.height = "400";
    iframe.style.border = "none";

    // Append iframe to the embed container
    embedContainer.appendChild(iframe);
  }, []);

  return <div id="yourEmbedContainer"></div>;
};

export default EmbedCarousel;
