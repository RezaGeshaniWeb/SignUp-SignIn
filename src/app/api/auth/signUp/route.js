import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import connectDB from "../../../../../utils/connectDB";
import { hashPassword } from "../../../../../utils/auth";

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
  if (!email || !password) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Please enter both email and password.",
      },
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          status: "failed",
          message: "User exists already.",
        },
        { status: 409 }
      ); 
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ email, password: hashedPassword });

    console.log(newUser);

    return NextResponse.json(
      {
        status: "success",
        message: "User created.",
      },
      { status: 201 }
    ); 
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        message: "An unexpected error occurred during user creation.",
      },
      { status: 500 }
    );
  }
}
