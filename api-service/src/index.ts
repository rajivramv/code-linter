import app from "./app";

const PORT = 3000;

async function start() {
  const server = await app.listen(PORT);
  console.info(`API server is listening on http://localhost:${PORT}`);
}

start();
