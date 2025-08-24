const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const imgView = document.getElementById("imgView");
const dragtext = document.getElementById("drag-text");
const uploadError = document.getElementById("upload-error");

fileInput.addEventListener("change", uploadImage);

function uploadImage() {
  let imageUrl = fileInput.files[0];
  let image = URL.createObjectURL(fileInput.files[0]);
  if (imageUrl.size > 500 * 1024) {
    uploadError.textContent =
      "File is to large. Please upload image under 500KB.";
    uploadError.style.color = "rgba(247, 64, 64, 1)";
  }else{
  imgView.textContent = "";
  imgView.style.backgroundImage = `url(${image})`;
  dragtext.textContent = "";
  const ground = document.createDocumentFragment();
  const removeBtn = document.createElement("button");
  removeBtn.className = "removeBtn";
  removeBtn.textContent = "Remove image";
  removeBtn.setAttribute("id", "removeBtn");
  const changeBtn = document.createElement("button");
  changeBtn.className = "changeBtn";
  changeBtn.textContent = "Change image";
  changeBtn.setAttribute("id", "changeBtn");
  ground.append(removeBtn, changeBtn);
  dragtext.append(ground);
  }
}
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  uploadImage();
});

const removeBtn = document.getElementById("removeBtn");
const changeBtn = document.getElementById("changeBtn");
changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  uploadImage();
});
