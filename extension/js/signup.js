document
  .getElementsByTagName("form")[0]
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("sign up data");
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirm_password = document.querySelector("#confirm_password").value;

    if (confirm_password !== password) {
      alert("Passwords should be same");
    } else {
      fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password,
        }),
      })
        .then((res) => {
          res.json().then((json) => {
            if (json?.errorMessage) {
              alert(json.errorMessage);
            } else {
              console.log(json)
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
                      // chrome.tabs.remove(tabs[0].id);
                    }
                  );
                }
              );
            }
          });
        })
        .catch((err) => console.log(err));
    }
  });

document.getElementById("button2").addEventListener("click", () => {
  window.location.replace("./signin.html");
});
