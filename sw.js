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

const saveSubscription = async (subscription) => {
  const response = await fetch("http://localhost:3000/save-subscription", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BHMGI2o2wRuH5pbm9TUgUfEhE-FbuigaKflt9BrxzaFP-JpfUNDJ-QEPoP_aOoqCSEM6bsabYTq15sJlFATI9Kk"
    ),
  });

  const response = await saveSubscription(subscription);
  console.warn("response", response);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("whooora!", { body: e.data.text() });
  console.log("push event", e);
});

// Public Key:
// BHMGI2o2wRuH5pbm9TUgUfEhE-FbuigaKflt9BrxzaFP-JpfUNDJ-QEPoP_aOoqCSEM6bsabYTq15sJlFATI9Kk

// Private Key:
// Na3r44AS3rTZeGEKyPla-s8I0JCkpkgE9byCdS29QWc
