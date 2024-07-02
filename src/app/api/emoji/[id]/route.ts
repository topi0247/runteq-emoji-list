import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const mattermostUrl = `https://chat.runteq.jp/api/v4/emoji/${id}/image`;

  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(mattermostUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": response.headers.get("Content-Type") || "image/png",
          "Content-Length": buffer.length.toString(),
        },
      });
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
