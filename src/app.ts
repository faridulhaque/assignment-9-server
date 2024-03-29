import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import {
  getProfile,
  registerUserController,
  updateProfile,
  userLoginController,
} from "./user/user.controller";
import {
  createFoundItemCategory,
  filterFoundItem,
  reportFoundItem,
} from "./foundItem/foundItem.controller";
import { createClaim, getClaim, updateClaim } from "./claim/claim.controller";
import { globalErrorHandler } from "./utils/globalErrorHandler";

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

app.post("/api/register", registerUserController);
app.post("/api/login", userLoginController);
app.put("/api/my-profile", updateProfile);

app.post("/api/found-item-categories", createFoundItemCategory);
app.post("/api/found-items", reportFoundItem);
app.get("/api/found-items", filterFoundItem);

app.post("/api/claims", createClaim);
app.get("/api/claims", getClaim);
app.get("/api/my-profile", getProfile);
app.put("/api/claims/:claimId", updateClaim);


app.use(globalErrorHandler);


app.use("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "no route found" });
});

export default app;
