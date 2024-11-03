import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Submission from "@/models/submission.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const pinnedSubmissions = await Submission.find({ pinned: true });

    return NextResponse.json(
      { submissions: pinnedSubmissions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching pinned submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch pinned submissions" },
      { status: 500 }
    );
  }
}
