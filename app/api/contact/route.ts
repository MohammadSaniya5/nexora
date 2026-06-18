import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET() {
  try {
    const keys = await kv.keys("message:*");
    if (!keys.length) return NextResponse.json([]);
    const items = await Promise.all(keys.map((k) => kv.get(k)));
    const messages = items
      .filter(Boolean)
      .sort((a: unknown, b: unknown) => {
        const ma = a as { createdAt: string };
        const mb = b as { createdAt: string };
        return new Date(mb.createdAt).getTime() - new Date(ma.createdAt).getTime();
      });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, roll, email, subject, message } = body;
    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }
    const id = uuid();
    const msg = { id, name, roll, email, subject, message, createdAt: new Date().toISOString() };
    await kv.set(`message:${id}`, msg);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}