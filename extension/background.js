let user_signed_in = false;
let return_session = false;

const is_user_signed_in = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["id", "token"], function (response) {
      console.log("response", response);
      if (response?.id && response?.token) resolve("success");
      resolve("fail");
    });
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  console.log("...");
  console.log(sender);
  console.log("...");
  console.log(sendResponse);
});
