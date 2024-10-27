"use client";
import React, { useEffect } from "react";

const EmbedCarousel = () => {
  useEffect(() => {
    // Load the iframeResizer script dynamically
    const script = document.createElement("script");
    script.src = "http://localhost:3000/embedScript.js"; // Load your embed script
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Embed code string
  const embedCode = `<script type="text/javascript" src="http://localhost:3000/embedScript.js"></script>\n<iframe id='your-carousel-id' src="http://localhost:3000/embed/hyderabad" frameborder="0" scrolling="no" width="100%"></iframe>`;

  return (
    <div>
      <h3>Embed This Carousel:</h3>
      <textarea
        readOnly
        rows={6}
        style={{ width: "100%", marginBottom: "20px", fontFamily: "monospace" }}
        value={embedCode}
      />
      <h4>Preview:</h4>
      <div id="carouselContainer">
        <iframe
          id="your-carousel-id" // Change to your specific ID
          src="http://localhost:3000/embed/hyderabad" // Adjust according to your setup
          frameBorder="0"
          scrolling="no"
          width="100%"
          style={{ height: "400px" }} // Adjust height as needed
        />
      </div>
    </div>
  );
};

export default EmbedCarousel;
