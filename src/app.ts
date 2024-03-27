import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";


const app: Application = express();

app.use(express.json());

const corsConfig = {
  origin: true,
  credentials: true,
  methods: ["GET", "HEAD", "OPTIONS", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
  optionsSuccessStatus: 204,
  exposedHeaders: ["Content-Disposition"],
};

app.use(cors(corsConfig));



app.use("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "no route found" });
});

export default app;
