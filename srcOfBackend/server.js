import app from "./app.js";

const PORT = process.env.PORT || 3000;

let server;

async function startServer() {
  try {
    server = app.listen(PORT, () => {
      console.log("Server is listening on port:", PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

/**
 * Handle unhandled promise rejections
 */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

/**
 * Handle uncaught exceptions
 */
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

/**
 * Graceful shutdown
 */
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

function shutdown() {
  console.log("Shutting down server...");

  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}
