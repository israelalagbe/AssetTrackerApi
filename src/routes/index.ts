import express, { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => {
  await User.create({
    name: "Israel"
  })
  const users = await User.findAll({});
  console.log({users})
  return res.status(200).send({
    message: "Yo World!"
  });

});

export default router;
