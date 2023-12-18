import createServer from "./index.js";
import dotenv from "dotenv";
dotenv.config()

const server = await createServer();
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server is listening at localhost:${PORT}`);
});