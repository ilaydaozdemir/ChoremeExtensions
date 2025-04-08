const nameInput = document.getElementById("name-input");
const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {
  console.log(nameInput.value);
});
