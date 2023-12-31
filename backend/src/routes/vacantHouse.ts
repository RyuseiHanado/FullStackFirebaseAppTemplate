// @ts-ignore
import express from "express";

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello, Vacant!");
})

router.post("/", (req: express.Request, res: express.Response) => {
    res.send("Hello, Vacant!");
})

export default router;