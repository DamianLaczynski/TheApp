const PROXY_CONFIG = [
  {
    context: [
      "/wsapi",
      "/register",
      "/refresh",
      "/api/Task",
      "/api/PlannerEvent",
      "/api/Contact",
      "/api/ContactPublic"
    ],
    target: "ws://localhost:8080",
    secure: false, 
  }
]

module.exports = PROXY_CONFIG;
