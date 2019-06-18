"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@koa/cors"));
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const routes_1 = __importDefault(require("./routes"));
const app = new koa_1.default();
app.use(cors_1.default({
    allowHeaders: ["Content-Type", "Accept"],
    allowMethods: ["GET", "POST", "PUT"],
    maxAge: 600,
    origin: "*"
}));
app.use(koa_logger_1.default());
app.use(koa_bodyparser_1.default());
app.use(routes_1.default.routes());
app.use((ctx) => (ctx.type = "json"));
exports.default = app;
//# sourceMappingURL=app.js.map