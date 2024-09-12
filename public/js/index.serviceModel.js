const body = document.querySelector("body");
let isModelOpen = false;

function createModel(postId = 0, postTitle) {
  if (postId <= 0) {
    return;
  }

  const Model = document.createElement("div");
  Model.classList.add("overlay");

  const confirmOption = document.createElement("div");
  confirmOption.classList.add("ConfirmDelete");

  const para = document.createElement("p");
  const title = document.createElement("p");
  const message = "DELETE POST " + postId + " ?";
  para.innerHTML = message;
  title.innerHTML = postTitle;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("buttonsContainer");

  const btnCancel = document.createElement("button");
  btnCancel.innerHTML = "Cancel";
  btnCancel.addEventListener("click", function () {
    closeModel(Model);
  });
  function createLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    return loader;
  }
  const btnDelete = document.createElement("button");
  btnDelete.innerHTML = "Delete";
  btnDelete.addEventListener("click", async function () {
    btnDelete.appendChild(createLoader());
    try {
      const response = await fetch(`/deletenote/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.message == "done") {
        btnDelete.innerHTML = "DELETE";
        closeModel(Model);
        window.location.href = "/";
      } else {
        btnDelete.innerHTML = "DELETE";
        closeModel(Model);
      }
    } catch (error) {
      btnDelete.innerHTML = "DELETE";
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
    const postId = this.getAttribute("data-id");
    const postTitle = this.getAttribute("data-title");
    if (!isModelOpen) {
      createModel(postId, postTitle);
    }
  });
});
