import { prismaInstance } from "@/lib/prismaInit";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  try {
    const body = await req.json();
    const { jobId, userId } = body;

    // Fetch the user with matching email and password
    const workingOnJobs = await prismaInstance.workingOnJobs.findFirst({
      where: {
        userId,
        jobId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (workingOnJobs) {
      // User found, return user data without password
      return NextResponse.json(workingOnJobs);
    } else {
      // Invalid credentials
      return NextResponse.json(
        [],
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    // Return a generic error message in case of server issues
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
