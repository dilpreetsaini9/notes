const formContainer = document.querySelector("#forms");
const textButton = document.querySelector("#addtextbtn");
const codeButton = document.querySelector("#addcodebtn");
const TitleOfPost = document.querySelector(".title-input");
const form = document.querySelector(`#formmain`);

function createTag(isCode = false) {
  const div = document.createElement("div");

  div.classList.add("textarea-wrap");

  const textArea = document.createElement("textarea");
  const spanArea = document.createElement("span");
  spanArea.innerText = "X";

  spanArea.addEventListener("click", (event) => {
    event.target.parentElement.remove();
  });
  if (isCode) {
    spanArea.classList.add("remove-code");
  } else {
    spanArea.classList.add("remove");
  }
  if (isCode) {
    textArea.classList.add("code");
  }
  div.appendChild(textArea);
  div.appendChild(spanArea);

  return div;
}

textButton.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.appendChild(createTag());
});

codeButton.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.appendChild(createTag(true));
});

form.addEventListener("submit", handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const textarea = document.querySelectorAll(`textarea`);
  const titleValue = TitleOfPost.value;
  if (!titleValue.trim()) {
    return;
  }
  const sanitizeTextBox = textarea[0].value.trim();

  if (!sanitizeTextBox) {
    return alert("no value");
  }

  const payload = [];
  textarea.forEach((e, index) => {
    if (e.classList.contains("code")) {
      payload.push({ sno: index + 1, code: e.value, data: null });
    } else {
      payload.push({ sno: index + 1, data: e.value, code: null });
    }
  });

  try {
    const response = await fetch("https://personal.dilpreet.life/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: payload, titleValue }),
    });

    const data = await response.json();

    if (data.message == "done") {
      window.location.href = "http://personal.dilpreet.life/";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
