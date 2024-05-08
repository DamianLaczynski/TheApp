const PROXY_CONFIG = [
  {
    context: [
      "/login",
      "/register",
      "/api/Task"
    ],
    target: "https://localhost:7291",
    secure: false, 
  }
]

module.exports = PROXY_CONFIG;
