import { initializeApp } from "firebase/app";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBmE1JLQF74dhBQTm231gteDm9osgmQwig",
  authDomain: "push-notification-e022c.firebaseapp.com",
  projectId: "push-notification-e022c",
  storageBucket: "push-notification-e022c.appspot.com",
  messagingSenderId: "165206845654",
  appId: "1:165206845654:web:d8038e8ead118f5e820177",
};
const app = initializeApp(firebaseConfig);

const checkPermission = () => {
  if (!"serviceworker" in navigator) {
    throw new Error("service worker is not supported!");
  }
};

const registerServiceWorker = async () => {
  const registration = await navigator.serviceWorker.register(
    "firebase-messaging-sw.js"
  );
  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("notification permission is denied!");
  }
};

const main = async () => {
  checkPermission();
  await registerServiceWorker();
  const messaging = getMessaging();
  onMessage((payload) => {
    console.log("Message received. ", payload);
    // ...
  });

  const token = await getToken(messaging, {
    vapidKey:
      "BNba5ZEz8M3t4RsZ2ccamGKeGpAWjx39NRSOpHeHxq9dZCF9UV4lsd7lIpEPaC218PHBZcgxQ-c2bJPGjbsm6LA",
  });
  console.log("token", token);
  //   await requestNotificationPermission();
  //   reg.showNotification("hello");
};

export default main;
