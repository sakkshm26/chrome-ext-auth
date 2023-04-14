let user_signed_in = false;
let return_session = false;

const is_user_signed_in = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userStatus"], function (response) {
        console.log("response", response)
      if (response) resolve("success");
      resolve("fail");
    });
  });
};

chrome.action.onClicked.addListener(() => {
  is_user_signed_in()
    .then((res) => {
      if (res === "success") {
        chrome.tabs.create({
        //   type: "panel",
          url: "signin.html",
        });
      } else {
        chrome.tabs.create({
        //   type: "panel",
          url: "signin.html",
        });
      }
    })
    .catch((err) => console.log(err));
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log("...");
  console.log(sender);
  console.log("...");
  console.log(sendResponse);
});
