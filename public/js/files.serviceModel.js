const body = document.querySelector("body");

let isModelOpen = false;

function createModel(fileId = 0, fileTitle) {
  if (fileId <= 0) {
    return;
  }

  const Model = document.createElement("div");
  Model.classList.add("overlay");

  const confirmOption = document.createElement("div");
  confirmOption.classList.add("ConfirmDelete");

  const para = document.createElement("p");
  const title = document.createElement("p");
  const message = "DELETE FILE " + fileId + "?";
  para.innerHTML = message;
  title.innerHTML = fileTitle;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("buttonsContainer");

  const btnCancel = document.createElement("button");

  function createLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    return loader;
  }
  btnCancel.innerHTML = "Cancel";
  btnCancel.addEventListener("click", function () {
    closeModel(Model);
  });

  const btnDelete = document.createElement("button");

  btnDelete.innerHTML = "Delete";

  btnDelete.addEventListener("click", async function () {
    btnDelete.appendChild(createLoader());
    console.log("delete");
    try {
      const response = await fetch(`/deletefile/${fileId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.message == "done") {
        btnDelete.innerHTML = "Delete";
        closeModel(Model);
        window.location.href = "/files";
      } else {
        btnDelete.innerHTML = "Delete";
        closeModel(Model);
      }
    } catch (error) {
      alert("error in deleting post catch ");
      closeModel(Model);
    }
  });

  btnContainer.appendChild(btnCancel);
  btnContainer.appendChild(btnDelete);

  confirmOption.appendChild(para);
  confirmOption.appendChild(title);
  confirmOption.appendChild(btnContainer);

  Model.appendChild(confirmOption);
  body.appendChild(Model);

  isModelOpen = true;
}

function closeModel(modal) {
  body.removeChild(modal);
  isModelOpen = false;
}

const btns = document.querySelectorAll(".deleteImg");

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const fileId = this.getAttribute("data-id");
    const fileTitle = this.getAttribute("data-title");
    console.log(fileId);
    if (!isModelOpen) {
      createModel(fileId, fileTitle);
    }
  });
});
