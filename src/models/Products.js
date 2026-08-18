const mongoose = require("mongoose");

const Category_Enum = ["vagetables ", "fruits", "food-grains"];
const Unit_Enum = ["piece", "kg", "gram", "liter", "ml", "pack"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptione: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      valuse: Category_Enum,
    },
    unitValue: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      valuse: Unit_Enum,
    },
    image: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
