import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { sql } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED_EXTENSIONS = [
  "pdf",
  "ppt",
  "pptx",
  "doc",
  "docx",
];

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string)?.trim();
    const subject = (formData.get("subject") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const description =
      (formData.get("description") as string)?.trim() || "";

    if (!file || !title || !subject || !category) {
      return NextResponse.json(
        {
          error: "All required fields must be provided.",
        },
        {
          status: 400,
        }
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "";

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        {
          error:
            "Only PDF, PPT, PPTX, DOC and DOCX files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const MAX_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        {
          error: "Maximum file size is 20 MB.",
        },
        {
          status: 400,
        }
      );
    }

    // Upload to Blob

    const blob = await put(
      `nexora/${uuid()}-${file.name}`,
      file,
      {
        access: "public",
      }
    );

    const id = uuid();

    const uploadedAt = new Date().toISOString();

    // Save into Neon

    await sql`
      INSERT INTO materials (
        id,
        title,
        subject,
        category,
        description,
        url,
        uploaded_at
      )
      VALUES (
        ${id},
        ${title},
        ${subject},
        ${category},
        ${description},
        ${blob.url},
        ${uploadedAt}
      );
    `;

    return NextResponse.json({
      success: true,
      material: {
        id,
        title,
        subject,
        category,
        description,
        url: blob.url,
        uploadedAt,
      },
    });
  } catch (error) {
    console.error("Upload API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to upload file.",
      },
      {
        status: 500,
      }
    );
  }
}