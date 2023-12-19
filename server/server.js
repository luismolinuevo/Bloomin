import createServer from "./index.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  const app = await createServer();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is listening at localhost:${PORT}`);
  });
};

startServer();
