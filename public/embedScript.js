document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded and DOMContentLoaded event fired");
  const embedContainer = document.getElementById("yourEmbedContainer");
  console.log("Embed container:", embedContainer);

  const boardName = embedContainer?.getAttribute("data-board-name");
  console.log("Board name from attribute:", boardName);

  if (!boardName) return;

  // Create and configure the iframe
  const iframe = document.createElement("iframe");
  iframe.src = `http://localhost:3000/embed/${boardName}`;
  iframe.width = "100%";
  iframe.height = "400px";
  iframe.style.border = "none";

  console.log("Iframe created with src:", iframe.src);

  // Append iframe to the embed container
  embedContainer.appendChild(iframe);
  console.log("Iframe appended to embed container");
});
