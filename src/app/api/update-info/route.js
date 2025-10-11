import { cookies } from "next/headers";
import connectDB from "../../../../utils/connectDB";
import { verifyPassword, verifyToken } from "../../../../utils/auth";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "failed",
        message: "Error in connecting to DB.",
      },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Invalid JSON format in request body.",
      },
      { status: 400 }
    );
  }

  const { name, lastName, password } = body;

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
      const user = await User.findOne({ email: result.email });

      if (!user) {
        return NextResponse.json(
          {
            status: "failed",
            message: "User Doesn't exist.",
          },
          { status: 404 }
        );
      }

      const isValid = await verifyPassword(password, user.password);

      if (!isValid) {
        return NextResponse.json(
          {
            status: "failed",
            message: "Password is Incorrect.",
          },
          { status: 422 }
        );
      }

      user.name = name;
      user.lastName = lastName;
      user.save();

      return NextResponse.json(
        {
          status: "success",
          data: { name, lastName, email: result.email },
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
