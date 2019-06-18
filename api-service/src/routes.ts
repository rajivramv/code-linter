import { Context } from "koa";
import Router from "koa-router";

import { analyze, IAnalyzeRequest } from "./analyzers";
const router = new Router();

router.get("/test", async (ctx: Context) => {
  ctx.body = "Hello World!";
});

router.post("/analyze", async (ctx: Context) => {
  const job = ctx.request.body as IAnalyzeRequest;
  const result = await analyze(job);
  ctx.body = result;
});

export default router;
