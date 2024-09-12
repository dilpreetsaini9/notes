const clips = document.querySelectorAll(".clip-img");

clips.forEach((c) => {
  c.addEventListener("click", (event) => {
    const value =
      event.target.parentElement.parentElement.children[1].innerText;
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = value;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      c.innerHTML = "Copied to clipboard";
    } catch (error) {
      console.error("Failed to copy text: ", error);
      c.innerHTML = "Failed to copy";
    }

    document.body.removeChild(tempTextarea);

    setTimeout(() => {
      c.innerHTML = "Copy";
    }, 2000);
  });
});
