import { Router } from "express";
const router = Router();
import path from "path";

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join("..", "views", "index.html"));
});

export default router;
