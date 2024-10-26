"use client";
import React, { useEffect } from "react";

const EmbedCarousel = () => {
  useEffect(() => {
    const embedContainer = document.getElementById("yourEmbedContainer");

    if (!embedContainer) return;

    const boardName = embedContainer.getAttribute("data-board-name");

    if (!boardName) return;

    // Create and configure the iframe
    const iframe = document.createElement("iframe");
    iframe.src = `http://localhost:3000/embed/${boardName}`;
    iframe.width = "100%";
    iframe.height = "400px";
    iframe.style.border = "none";

    // Append iframe to the embed container
    embedContainer.appendChild(iframe);

    // Load the external script
    const script = document.createElement("script");
    script.src = "http://localhost:3000/embedScript.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="yourEmbedContainer" data-board-name="shivas-space"></div>;
};

export default EmbedCarousel;
