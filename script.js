const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const imgView = document.getElementById("imgView");
const dragtext = document.getElementById("drag-text");
const uploadError = document.getElementById("upload-error")
fileInput.addEventListener("change", uploadImage);

function uploadImage() {
  let image = URL.createObjectURL(fileInput.files[0]);
  if(image.size < 50 * 1024){
  imgView.textContent = "";
  imgView.style.backgroundImage = `url(${image})`;
  dragtext.textContent = "";
  const ground = document.createDocumentFragment();
  const removeBtn = document.createElement("button");
  removeBtn.className = "removeBtn";
  removeBtn.textContent = "Remove image";
  const changeBtn = document.createElement("button");
  changeBtn.className = "changeBtn";
  changeBtn.textContent = "Change image";
  ground.append(removeBtn, changeBtn);
  dragtext.append(ground);
  }else{
    uploadError.style.color = 'red'
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
