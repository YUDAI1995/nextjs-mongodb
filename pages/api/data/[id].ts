import type { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  const collectionName = "todo";

  try {
    const { db } = await connectDb();
    switch (method) {
      case "DELETE":
        db.collection(collectionName).deleteOne({ id: id });
        res.status(200).json({ message: "Deleted todo" });
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err });
  }

  res.status(405).end(`Method ${method} Not Allowed`);
}
