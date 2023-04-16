chrome.storage.local.get(["id", "token"], function (response) {
  if (response?.id && response?.token)
    fetch("http://localhost:4000/user/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${response.token}`,
      },
    })
      .then((res) => {
        res.json().then((json) => {
          if (json?.errorMessage) {
            alert(json.errorMessage);
          } else {
            document.getElementById("plan").innerHTML = `Plan ${json.tier}`;
            document.getElementById(
              "requests_remaining"
            ).innerHTML = `Requests remaining: ${json.requests_remaining}`;
            document.getElementById("email").innerHTML = `Email: ${json.email}`;
          }
        });
      })
      .catch((err) => console.log(err));
  else {
    chrome.tabs.query(
      { active: true, windowType: "normal", currentWindow: true },
      function (tabs) {
        chrome.tabs.create({
          url: "../html/signin.html",
        });
        chrome.tabs.remove(tabs[0].id);
      }
    );
  }
});
