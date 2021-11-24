import type { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "../../../model/todo.model";
import axios from "axios";
import { connectDb } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const collectionName = "todo";

  try {
    const { method } = req;
    const { db } = await connectDb();
    const newTodo = new Todo(req.body.id, req.body.title);

    switch (method) {
      case "GET":
        const data = await db.collection(collectionName).find().toArray();
        res.status(200).json(data);

        break;
      case "POST":
        db.collection(collectionName).insertOne(newTodo);
        res.status(201).json({ message: `Added todo`, addedID: req.body.id });
        break;
      // case "PUT":
      //   break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err });
  }
}
