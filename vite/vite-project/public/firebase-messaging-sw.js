importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyBmE1JLQF74dhBQTm231gteDm9osgmQwig",
  authDomain: "push-notification-e022c.firebaseapp.com",
  projectId: "push-notification-e022c",
  storageBucket: "push-notification-e022c.appspot.com",
  messagingSenderId: "165206845654",
  appId: "1:165206845654:web:d8038e8ead118f5e820177",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
console.warn("messaging", messaging);
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

// const saveSubscription = async (subscription) => {
//   const response = await fetch("http://localhost:3000/save-subscription", {
//     method: "post",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(subscription),
//   });
//   return response.json();
// };

// self.addEventListener("activate", async (e) => {
//   const subscription = await self.registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(
//       "BHMGI2o2wRuH5pbm9TUgUfEhE-FbuigaKflt9BrxzaFP-JpfUNDJ-QEPoP_aOoqCSEM6bsabYTq15sJlFATI9Kk"
//     ),
//   });

//   const response = await saveSubscription(subscription);
//   console.warn("response", response);
// });

// self.addEventListener("push", (e) => {
//   self.registration.showNotification("whooora!", { body: e.data.text() });
//   console.log("push event", e);
// });

// Public Key:
// BHMGI2o2wRuH5pbm9TUgUfEhE-FbuigaKflt9BrxzaFP-JpfUNDJ-QEPoP_aOoqCSEM6bsabYTq15sJlFATI9Kk

// Private Key:
// Na3r44AS3rTZeGEKyPla-s8I0JCkpkgE9byCdS29QWc
