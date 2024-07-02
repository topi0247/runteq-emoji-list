import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { page: string } }
) {
  const { page } = params;
  const mattermostUrl = "https://chat.runteq.jp/api/v4/emoji";
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${mattermostUrl}?page=${page}&per_page=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const emojis = await response.json();
      return NextResponse.json(emojis);
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
