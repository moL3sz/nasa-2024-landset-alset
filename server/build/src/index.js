"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const package_json_1 = require("../package.json");
const cors_1 = __importDefault(require("cors"));
const database_config_1 = require("./config/database.config");
dotenv_1.default.config();
const APP_PORT = process.env.PORT;
const app = (0, express_1.default)();
database_config_1.dbo.init();
// --- CORS --- //
app.use((0, cors_1.default)());
// --- JSON parser --- //
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send({ version: package_json_1.version });
});
app.listen(APP_PORT, () => {
    console.log(`🔥 Server has started on http://localhost:${APP_PORT}`);
});
