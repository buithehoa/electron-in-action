const button = document.querySelector(".alert");

button.addEventListener('click', () => {
  console.log("Click!");
  alert(__dirname);
});
