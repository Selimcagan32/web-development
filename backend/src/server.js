import "dotenv/config";
import app from "./app.js";
import { connectDatabase }
  from "./config/database.js";

const PORT = process.env.PORT || 3000;

try {
  await connectDatabase();
  app.listen(PORT, () =>
    console.log(`API: http://localhost:${PORT}`));
} catch (err) {
  console.error(`Bağlanılamadı: ${err.message}`);
  process.exit(1);
}
