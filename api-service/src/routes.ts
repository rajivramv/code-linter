import { Context } from "koa";
import Router from "koa-router";

import { ILintRequest, lint } from "./linters";
const router = new Router();

router.get("/test", async (ctx: Context) => {
  ctx.body = "Hello World!";
});

router.post("/lint", async (ctx: Context) => {
  const job = ctx.request.body as ILintRequest;
  const result = await lint(job);
  ctx.body = result;
});

export default router;
