"use client";
import React, { useEffect } from "react";

const EmbedCarousel = () => {
  useEffect(() => {
    const embedContainer = document.getElementById("yourEmbedContainer");

    if (!embedContainer) return;

    const boardName = embedContainer.getAttribute("data-board-name");

    if (!boardName) return;

    // Clean up any existing iframes before appending new ones
    embedContainer.innerHTML = "";

    // Create and configure the iframe
    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:3000/embed/${boardName}`;
    iframe.width = "100%";
    iframe.height = "400px";
    iframe.style.border = "none";

    // Append iframe to the embed container
    embedContainer.appendChild(iframe);
  }, []);

  return <div id="yourEmbedContainer" data-board-name="hyderabad"></div>;
};

export default EmbedCarousel;
