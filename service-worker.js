const CACHE_NAME = "teams-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/project.html",
  "/payment-received.html",
  "/potential-projects.html",
  "/project-completion.html",
  "/project-delays.html",
  "/project-suspension.html",
  "/project-updates.html",
  "/select-template.html",
  "/send-email-folder.html",
  "/send-email.html",
  "/system-updates.html",
  "/tech-advancements.html",
  "/growth-opportunities.html",
  "/growth-strategy.html",
  "/new-services.html",
  "/new-tech.html",
  "/new-updates.html",
  "/newsletters.html",
  "/partnerships.html",
  "/payment-pending.html",
  "/development-progress.html",
  "/edit-file.html",
  "/edit-file2.html",
  "/edit-folder.html",
  "/emerging-tech.html",
  "/fact-finding.html",
  "/folder-create1.html",
  "/folder-project-create.html",
  "/folder.html",
  "/gifts-rewards.html",
  "/access-clients.html",
  "/all-folders.html",
  "/analytics.html",
  "/client-list.html",
  "/commits.html",
  "/company-news.html",
  "/create-project.html",
  "/custom-template.html",
  "/design-template.html"
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
