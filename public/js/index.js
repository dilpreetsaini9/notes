if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/js/service/service-worker.js")
      .then((registration) => {
        console.log("OK");
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
