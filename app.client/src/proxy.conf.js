const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/register",
      "/refresh",
      "/api/Task",
      "/api/PlannerEvent",
      "/api/Contact",
      "/api/ContactPublic"
    ],
    target: "http://localhost:5096",
    secure: true, 
  }
]

module.exports = PROXY_CONFIG;
