const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/register",
      "/refresh",
      "/api/Task",
      "/api/PlannerEvent",
      "/api/Contact",
      "/api/ContactPublic",
    ],
    target: "https://localhost:7291",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
