"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbo = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const mongodbUri = process.env.MONGODB_URI || '';
exports.dbo = {
    init() {
        console.log(`💡 Trying to connect to MongoDB: (${mongodbUri}) ...`);
        mongoose_1.default.connect(mongodbUri).then(() => {
            console.log("✅  Database initialized successfully!");
        }).catch((err) => {
            console.error(err);
        });
    }
};
