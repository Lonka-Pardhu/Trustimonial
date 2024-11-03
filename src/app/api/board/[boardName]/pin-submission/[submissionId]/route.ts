import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Space from "@/models/space.model";
import Submission from "@/models/submission.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ boardName: string; submissionId: number }> }
) {
  const submissionId = (await params).submissionId;
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submission = await Submission.findById(submissionId);

  if (!submission) {
    return NextResponse.json(
      { message: "Submission not found" },
      { status: 404 }
    );
  }

  const isPinned = submission.pinned;

  if (isPinned) {
    // Unpin: remove the submission ID from pinned arrays and set pinned to false
    await Submission.findByIdAndUpdate(submissionId, { pinned: false });
  } else {
    await Submission.findByIdAndUpdate(submissionId, { pinned: true });
  }

  return NextResponse.json(
    {
      message: isPinned
        ? "Submission unpinned successfully"
        : "Submission pinned successfully",
    },
    { status: 200 }
  );
}
