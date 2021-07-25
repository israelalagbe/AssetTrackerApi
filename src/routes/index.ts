import express, { Router, Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => {

  return res.status(200).send({
    message: "Yo World!"
  });

});

export default router;
