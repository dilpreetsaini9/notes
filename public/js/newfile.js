document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formmain");
  const fileInput = document.getElementById("fileUpload");
  const fileNameDisplay = document.getElementById("fileName");
  const title = document.querySelector(".title-input");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      fileNameDisplay.textContent = file.name;
    } else {
      fileNameDisplay.textContent = "No file chosen";
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const Filetitle = title.value.trim();
    if (!Filetitle) {
      alert("Enter title");
      title.focus();
      return;
    }
    const formData = new FormData(form);
    try {
      const response = await fetch("/newfile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
        form.reset();
        fileNameDisplay.textContent = "No file chosen";
      } else {
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    }
  });
});
