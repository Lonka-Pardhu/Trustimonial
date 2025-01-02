import { dbConnect } from "@/lib/db";
import Submission from "@/models/submission.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const recentSubmissions = await Submission.find({})
      .sort({ createdAt: -1 })
      .limit(4);

    return NextResponse.json(
      { testimonials: recentSubmissions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
