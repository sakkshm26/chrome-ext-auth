chrome.storage.local.get(["id", "token"], function (response) {
  if (response?.id && response?.token) {
    document.getElementById("tariusBody").innerHTML =
      "<button id='dashboard'>Dashboard</button><button id='signout'>Sign Out</button>";
    document.getElementById("dashboard").addEventListener("click", () => {
      chrome.tabs.create({
        url: "html/dashboard.html",
      });
    });
    document.getElementById("signout").addEventListener("click", () => {
      chrome.tabs.create({
        url: "html/signout.html",
      });
    });
  } else {
    document.getElementById("tariusBody").innerHTML =
      "<button>Sign In</button>";
    document.getElementsByTagName("button")[0].addEventListener("click", () => {
      chrome.tabs.create({
        url: "html/signin.html",
      });
    });
  }
});
