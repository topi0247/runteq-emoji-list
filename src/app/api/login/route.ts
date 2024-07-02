import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const mattermostUrl = "https://chat.runteq.jp/api/v4/users/login";

  try {
    const response = await fetch(mattermostUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: username,
        password: password,
      }),
    });

    if (response.ok) {
      const authToken = response.headers.get("token");
      return NextResponse.json({ authToken });
    } else {
      const errorResponse = await response.json();
      return NextResponse.json(
        { error: errorResponse.message },
        { status: response.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
