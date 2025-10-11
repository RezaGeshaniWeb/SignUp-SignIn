import { sign } from "jsonwebtoken";
import { verifyPassword } from "../../../../../utils/auth";
import User from "../../../../../models/User";
import { serialize } from "cookie";
import { NextResponse } from "next/server";
import connectDB from "../../../../../utils/connectDB";

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

  const { email, password } = body;
  const secretKey = process.env.SECRET_KEY;
  
  const expiration = 24 * 60 * 60;
  
  const token = sign({ email }, secretKey, { expiresIn: expiration });

  const serialized = serialize("token", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });

  if (!email || !password) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Please enter both email and password.",
      },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      {
        status: "failed",
        message: "User doesn't exist!",
      },
      { status: 404 }
    );
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Username or Password is incorrect!",
      },
      { status: 422 }
    );
  }

  return NextResponse.json(
    {
      status: "success",
      message: "Logged In!",
      data: { email: user.email },
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
