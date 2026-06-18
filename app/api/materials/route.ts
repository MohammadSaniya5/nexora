import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keys = await kv.keys("material:*");
    if (!keys.length) return NextResponse.json([]);
    const items = await Promise.all(keys.map((k) => kv.get(k)));
    const materials = items
      .filter(Boolean)
      .sort((a: unknown, b: unknown) => {
        const ma = a as { uploadedAt: string };
        const mb = b as { uploadedAt: string };
        return new Date(mb.uploadedAt).getTime() - new Date(ma.uploadedAt).getTime();
      });
    return NextResponse.json(materials);
  } catch {
    return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await kv.del(`material:${id}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}