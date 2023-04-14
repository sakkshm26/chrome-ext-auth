document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("sign in data");
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          if (json?.errorMessage) {
            alert(json.errorMessage);
          } else {
            console.log("json", json);
            chrome.storage.local.set(
              { id: json.user_id, token: json.token },
              function (response) {
                if (chrome.runtime.lastError) alert("Something went wrong!");
                chrome.tabs.query(
                  { active: true, windowType: "normal", currentWindow: true },
                  function (tabs) {
                    chrome.tabs.create({
                      url: "../html/dashboard.html",
                    });
                    chrome.tabs.remove(tabs[0].id);
                  }
                );
              }
            );
          }
        });
      })
      .catch((err) => console.log(err));
  });

document.getElementById("button2").addEventListener("click", () => {
  window.location.replace("./signup.html");
});
