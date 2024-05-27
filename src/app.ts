import express, { Application, Request, Response } from "express";
import cors from "cors";
import {
  banUserController,
  changePassword,
  getAllUsers,
  getProfile,
  registerUserController,
  updateProfile,
  userLoginController,
} from "./user/user.controller";
import {
  createFoundItemCategory,
  filterFoundItem,
  getAllCategory,
  getFoundItemController,
  myFoundItem,
  reportFoundItem,
  updateFoundItem,
} from "./foundItem/foundItem.controller";
import { createClaim, getClaim, getMyClaim, updateClaim } from "./claim/claim.controller";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import {
  getLostItemController,
  getRecentLostItems,
  myLostItem,
  reportLostItem,
  updateLostItem,
} from "./lostItem/lostItem.controller";

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
app.post("/api/category/create", createFoundItemCategory);
app.get("/api/category/all", getAllCategory);
app.post("/api/item/lost", reportLostItem);
app.post("/api/item/found", reportFoundItem);
app.get("/api/items/lost/recent", getRecentLostItems);
app.get("/api/profile", getProfile);
app.put("/api/profile/update", updateProfile);
app.put("/api/change-password", changePassword);
app.get("/api/my-found-items", myFoundItem);
app.get("/api/my-lost-items", myLostItem);
app.put("/api/found-item/update/:id", updateFoundItem);
app.put("/api/lost-item/update/:id", updateLostItem);
app.get("/api/items/filter", filterFoundItem);

app.get("/api/found-item/:id", getFoundItemController);
app.get("/api/lost-item/:id", getLostItemController);
app.post("/api/item/claim", createClaim);
app.get("/api/my-claims", getMyClaim);
app.get("/api/users/all", getAllUsers);
app.get("/api/claims", getClaim);
app.put("/api/user/ban", banUserController);


app.put("/api/claims/:claimId", updateClaim);

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

app.use(globalErrorHandler);

app.use("*", (req: Request, res: Response) => {
  res.status(200).json({ message: "no route found" });
});

export default app;
