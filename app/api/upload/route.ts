import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const uploadedAt = formData.get("uploadedAt") as string;

    if (!file || !title || !subject || !category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Validate file type
    const allowed = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|ppt|pptx|doc|docx)$/i)) {
      return NextResponse.json({ message: "Invalid file type. Only PDF, PPT, PPTX, DOC, DOCX allowed." }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`nexora/${uuid()}-${file.name}`, file, {
      access: "public",
    });

    const id = uuid();
    const material = {
      id,
      title: title.trim(),
      subject: subject.trim(),
      category: category.trim(),
      description: description?.trim() || "",
      url: blob.url,
      uploadedAt: uploadedAt || new Date().toISOString(),
    };

    await kv.set(`material:${id}`, material);

    return NextResponse.json({ success: true, material });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Upload failed. Please try again." }, { status: 500 });
  }
}