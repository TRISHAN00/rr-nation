import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_CMS_API_BASE_URL;

export async function GET(request, { params }) {
  const { path } = await params;
  const suffix = path.join("/");
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();
  const url = `${BASE_URL}/api/${suffix}${query ? `?${query}` : ""}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch CMS data" }, { status: 502 });
  }
}