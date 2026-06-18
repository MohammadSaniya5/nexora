import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  try {
    const keys = await kv.keys("subject:*");
    if (!keys.length) return NextResponse.json([]);
    const items = await Promise.all(keys.map((k) => kv.get(k)));
    const subjects = items
      .filter(Boolean)
      .sort((a: unknown, b: unknown) => {
        const sa = a as { name: string };
        const sb = b as { name: string };
        return sa.name.localeCompare(sb.name);
      });
    return NextResponse.json(subjects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name required" }, { status: 400 });
    const id = uuid();
    const subject = { id, name: name.trim(), createdAt: new Date().toISOString() };
    await kv.set(`subject:${id}`, subject);
    return NextResponse.json({ success: true, subject });
  } catch {
    return NextResponse.json({ error: "Failed to add subject" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await kv.del(`subject:${id}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}