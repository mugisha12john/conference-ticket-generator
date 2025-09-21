const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const imgView = document.getElementById("imgView");
const dragtext = document.getElementById("drag-text");
const uploadError = document.getElementById("upload-error");
const submitBtn = document.getElementById("submitBtn");
fileInput.addEventListener("change", uploadImage);
let removeBtn;
let changeBtn;
function uploadImage() {
  let imageUrl = fileInput.files[0];
  let image = URL.createObjectURL(fileInput.files[0]);
  if (imageUrl.size > 500 * 1024) {
    uploadError.textContent =
      "File is to large. Please upload image under 500KB.";
    uploadError.style.color = "rgba(247, 64, 64, 1)";
  } else {
    imgView.textContent = "";
    imgView.style.backgroundImage = `url(${image})`;
    imgView.style.backgroundRepeat = "no-repeat";
    imgView.style.backgroundPosition = "center";
    imgView.style.display = "block";
    dragtext.textContent = "";
    const ground = document.createDocumentFragment();
    removeBtn = document.createElement("button");
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "Remove ";
    removeBtn.setAttribute("id", "removeBtn");
    changeBtn = document.createElement("button");
    changeBtn.className = "changeBtn";
    changeBtn.textContent = "Change ";
    changeBtn.setAttribute("id", "changeBtn");
    ground.append(removeBtn, changeBtn);
    dragtext.append(ground);

    removeBtn.addEventListener("click", removeImage);
    changeBtn.addEventListener("click", changeImage);
  }
}

function removeImage() {
  // Reset the file input so the user can re-upload the same image
  fileInput.value = "";

  // Clear the image from the preview area
  imgView.style.backgroundImage = "none";
  imgView.style.backgroundRepeat = "initial";
  imgView.style.backgroundPosition = "initial";

  imgView.innerHTML = `<input type="file" id="fileInput" accept="image/png, image/jpg" hidden /><img src="./assets/images/icon-upload.svg" alt="" />`;
  dragtext.innerHTML = `<p>Drag and drop or click to upload</p>`;
  const newFileInput = document.getElementById("fileInput");
  newFileInput.addEventListener("change", uploadImage);
}

function changeImage() {
  fileInput.click();
}

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  uploadImage();
});
const form = document.querySelector("form");
form.addEventListener("submit", handleForm);

const card = document.querySelector(".card");
function handleForm(e) {
  e.preventDefault();
  const fullName = document.getElementById("name");
  const email = document.getElementById("email");
  const github = document.getElementById("GitHub");
  const error = document.getElementById("error");
  let hasError = false;

  email.style.border = "";
  fullName.style.border = "";
  github.style.border = "";
  error.style.display = "none";
  uploadError.textContent = "";

  if (!fileInput.files[0]) {
    uploadError.textContent = "Please upload an image.";
    uploadError.style.color = "rgba(247, 64, 64, 1)";
    hasError = true;
  }
  if (fullName.value == "") {
    fullName.style.border = "1px solid red";
    hasError = true;
  }
  if (email.value == "") {
    email.style.border = "1px solid red";
    hasError = true;
  }
  if (github.value == "") {
    github.style.border = "1px solid red";
    hasError = true;
  }

  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.style.display = "block";
    email.style.border = "1px solid red";
    hasError = true;
  }
  if (hasError) return;
  form.parentElement.style.display = "none";
  card.style.visibility = "visible";
  document.getElementById("profile-img").src = URL.createObjectURL(
    fileInput.files[0]
  );
  document.getElementById("Username").textContent = fullName.value;
  document.querySelector(".email h5").textContent = github.value;
  document.querySelector(
    ".card .title h4"
  ).textContent = `We've emailed your ticket to ${email.value} 
  and will send update in the run up to the event`;
  document.querySelector(
    ".card .title h2"
  ).textContent = ` Congrats, ${fullName.value}
          Your ticket is ready.`;
  function randomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const code = String(randomIntInclusive(0, 999999)).padStart(6, "0");
  document.querySelector(".code h6").textContent = `#${code}`;
}
