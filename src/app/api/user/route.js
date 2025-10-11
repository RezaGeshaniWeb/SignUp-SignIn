import { NextResponse } from "next/server";
import { cookies } from 'next/headers'; 
import { verifyToken } from "../../../../utils/auth";

export async function GET(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; 

  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return NextResponse.json(
      {
        status: "failed",
        message: "You are not logged in.",
      },
      { status: 401 }
    );
  }

  try {
      const result = verifyToken(token, secretKey);

      if (result) {
        return NextResponse.json(
          {
            status: "success",
            data: result,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            status: "failed",
            message: "You are unauthorized.",
          },
          { status: 401 }
        );
      }
  } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
          {
            status: "failed",
            message: "Internal server error during verification.",
          },
          { status: 500 }
        );
  }
}
