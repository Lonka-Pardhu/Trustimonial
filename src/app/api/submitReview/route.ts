import { dbConnect } from "@/lib/db";
import Space from "@/models/space.model";
import Submission from "@/models/submission.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure the database is connected

    const { spaceId, name, email, description } = await req.json();
    console.log(spaceId, name, email, description);

    // Create the new submission
    const newSubmission = await Submission.create({
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
