document.getElementsByTagName("form")[0].addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("sign up data")
  console.log(e.target[0].value);
  console.log(e.target[1].value);
});

document.getElementById("button2").addEventListener("click", () => {
  window.location.replace("./signin.html");
});