"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tagSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    colorCode: {
        type: String,
        required: true,
    },
});
const Tag = mongoose_1.default.model("Tag", tagSchema);
exports.default = Tag;
