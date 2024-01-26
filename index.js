const checkPermission = () => {
  if (!"serviceworker" in navigator) {
    throw new Error("service worker is not supported!");
  }
};

const registerServiceWorker = async () => {
  const registration = await navigator.serviceWorker.register("sw.js");
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
  //   await requestNotificationPermission();
  //   reg.showNotification("hello");
};

main();
