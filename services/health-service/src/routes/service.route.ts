import { Router, Request, Response } from "express";
import Service from "../models/service.mode";

const router = Router();

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Register a new service
 *     tags: [Services]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: auth-service
 *               url: http://auth-service:3002
 *     responses:
 *       201:
 *         description: Service registered successfully
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to register service" });
  }
});

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all registered services
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: List of all services
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

export default router;
