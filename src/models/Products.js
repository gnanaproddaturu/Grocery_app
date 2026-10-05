


const mongoose = require("mongoose");

const CATEGORY_ENUM = [
    "vegetables",
    "fruits",
    "food-grains",
];

const UNIT_ENUM = [
    "piece",
    "kg",
    "gram",
    "liter",
    "ml",
    "pack",
];

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        category: {
            type: String,
            required: true,
            enum: CATEGORY_ENUM,
        },

        unitValue: {
            type: Number,
            required: true,
            min: 0,
        },

        unit: {
            type: String,
            required: true,
            enum: UNIT_ENUM,
        },

        image: {
            type: String,
            default: null,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Product",
    productSchema
);

