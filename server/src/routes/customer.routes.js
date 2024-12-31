import {Router} from "express"
import { Customer } from "../models/customer.models.js";
import { auth } from "../middlewares/auth.middleware.js";
import mongoose from "mongoose";

const router = Router();
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const newCustomer = new Customer({
      name,
    });

    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.delete("/:id", auth,async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Image Id" });
  }
  try {
    await Customer.findByIdAndDelete(id);
    return res
      .status(200)
      .json( { message: "image Deleted successfully" });
  } catch (error) {
    console.log("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default  router;