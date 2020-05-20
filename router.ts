import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem,
} from "./controler/items.ts";
const router = new Router();

router.get("/home", getItems)
  .get("/home/:id", getItem)
  .post("/home", addItem)
  .put("/home/:id", updateItem)
  .delete("/home/:id", deleteItem);

export default router;
