import { NextResponse } from "next/server";
import Space from "@/models/space.model";
import { dbConnect } from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user.model";

export async function POST(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { spaceName, title, message, questions } = await req.json();

    if (!spaceName || !title || !message || !questions || !questions.length) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const space = await Space.create({
      spaceName,
      spaceOwner: session.user.id,
      title,
      message,
      questions,
    });

    await User.updateOne(
      { _id: session.user.id }, // Finding the user by their ID
      { $push: { spaces: space._id } } // Pushing the new space ID into the 'spaces' array
    );

    return NextResponse.json(
      { message: "Space created successfully", space, spaceId: space._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create space" },
      { status: 500 }
    );
  }
}
