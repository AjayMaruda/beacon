import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import sequelize from "./config/database";
import servicesRouter from "./routes/service.route";
import { specs as swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "health-service" });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/services", servicesRouter);

const PORT = process.env.PORT || 3001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL connected and models synced");
    app.listen(PORT, () => {
      console.log(`Health service running on port ${PORT}`);
      console.log(
        `Swagger docs available at http://localhost:${PORT}/api/docs`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to PostgreSQL:", err);
  });
