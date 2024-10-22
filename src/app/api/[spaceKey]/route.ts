import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Space from "@/models/space.model";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ spaceKey: string }> }
) {
  const spaceKey = (await params).spaceKey;
  const session = await auth();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const space = await Space.find({ spaceUrlKey: spaceKey });

    if (!space) {
      return NextResponse.json(
        { message: "No space found with this url" },
        { status: 404 }
      );
    }
    return NextResponse.json({ space }, { status: 200 });
  } catch (error) {
    console.log("ERROR>>>", error);
    return NextResponse.json(
      { message: "Failed to fetch space", error },
      { status: 500 }
    );
  }
}
