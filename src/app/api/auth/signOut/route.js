import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function GET(req) {
  const serialized = serialize("token", "", { path: "/", maxAge: 0 });

  return NextResponse.json(
    {
      status: "success",
      message: "Logged Out!",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    }
  );
}
