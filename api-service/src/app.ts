import cors from "@koa/cors";
import Koa from "koa";
import { Context } from "koa";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";

import router from "./routes";

const app = new Koa();

app.use(
  cors({
    allowHeaders: ["Content-Type", "Accept"],
    allowMethods: ["GET", "POST", "PUT"],
    maxAge: 600,
    origin: "*"
  })
);
app.use(logger());
app.use(bodyparser());
app.use(async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message
    };
  }
});
app.use(router.routes());
app.use((ctx: Context) => (ctx.type = "json"));

export default app;
