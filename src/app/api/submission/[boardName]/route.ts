import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Space from "@/models/space.model";
import Submission from "@/models/submission.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ boardName: string }> }
) {
  const session = await auth();
  const boardName = (await params).boardName;

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const submissions = await Submission.find({ spaceUrlKey: boardName });
    return NextResponse.json(
      { message: "submissions fetched", submissions },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "cant find submissions", error });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ boardName: string }> }
) {
  const boardName = (await params).boardName;

  try {
    await dbConnect(); // Ensure the database is connected

    const { spaceId, name, email, description } = await req.json();

    // Create the new submission
    const newSubmission = await Submission.create({
      spaceUrlKey: boardName,
      spaceId,
      name,
      email,
      description,
    });

    // Find the space by its ID and update it by pushing the submission ID into the submissions array
    await Space.findByIdAndUpdate(spaceId, {
      $push: { submissions: newSubmission._id },
    });

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to submit review", error },
      { status: 500 }
    );
  }
}
