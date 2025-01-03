import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Space from "@/models/space.model";
import { dbConnect } from "@/lib/db";
import { auth } from "@/auth";
import User from "@/models/user.model";
import Submission from "@/models/submission.model";

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

    const baseUrlKey = spaceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, "");

    let existingSpace = await Space.findOne({ spaceUrlKey: baseUrlKey });
    let spaceUrlKey = baseUrlKey;

    // If the space name already exists, generate a unique key
    if (existingSpace) {
      const randomSuffix = uuidv4().slice(0, 8); // Use shorter UUID
      spaceUrlKey = `${baseUrlKey}-${randomSuffix}`;
    }

    const newSpace = {
      spaceName,
      spaceUrlKey,
      spaceOwner: session.user.id,
      title,
      message,
      questions,
    };

    const space = await Space.create(newSpace);

    await User.updateOne(
      { _id: session.user.id }, // Finding the user by their ID
      { $push: { spaces: space._id } } // Pushing the new space ID into the 'spaces' array
    );

    return NextResponse.json(
      {
        message: "Space created successfully",
        url: space.spaceUrlKey,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create space" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const boards = await Space.find({ spaceOwner: session.user.id });

    if (!boards || boards.length === 0) {
      return NextResponse.json(
        { message: "No boards found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json({ boards }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch spaces", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { boardId } = await req.json();

    if (!boardId) {
      return NextResponse.json(
        { message: "Board id is required" },
        { status: 400 }
      );
    }
    await dbConnect();

    // Delete the board
    const deletedBoard = await Space.deleteOne({ _id: boardId });

    if (!deletedBoard || deletedBoard.deletedCount === 0) {
      return NextResponse.json(
        {
          message: "Space not found or you are not authorized",
        },
        { status: 404 }
      );
    }

    // Remove the space ID from the user's 'boards' array
    await User.updateOne(
      { _id: session.user.id },
      { $pull: { spaces: boardId } } // $pull removes the board ID from the array
    );

    // Delete all submissions associated with the board ID
    const deletedSubmissions = await Submission.deleteMany({ boardId });

    return NextResponse.json(
      {
        message: `Board and associated ${deletedSubmissions.deletedCount} submissions deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to delete board" },
      { status: 500 }
    );
  }
}
