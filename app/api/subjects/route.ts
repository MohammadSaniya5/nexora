import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

type Subject = {
  id: string;
  name: string;
  createdAt: string;
};

const KV_KEY = "subjects";

export async function GET() {
  try {
    const subjects =
      (await kv.get<Subject[]>(KV_KEY)) ?? [];

    subjects.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("GET /api/subjects error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch subjects",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          error: "Subject name is required",
        },
        {
          status: 400,
        }
      );
    }

    const subjects =
      (await kv.get<Subject[]>(KV_KEY)) ?? [];

    // Prevent duplicate subjects
    const exists = subjects.some(
      (subject) =>
        subject.name.toLowerCase() ===
        name.trim().toLowerCase()
    );

    if (exists) {
      return NextResponse.json(
        {
          error: "Subject already exists",
        },
        {
          status: 409,
        }
      );
    }

    const newSubject: Subject = {
      id: uuid(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    subjects.push(newSubject);

    subjects.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    await kv.set(KV_KEY, subjects);

    return NextResponse.json({
      success: true,
      subject: newSubject,
    });
  } catch (error) {
    console.error("POST /api/subjects error:", error);

    return NextResponse.json(
      {
        error: "Failed to add subject",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Missing subject id",
        },
        {
          status: 400,
        }
      );
    }

    const subjects =
      (await kv.get<Subject[]>(KV_KEY)) ?? [];

    const updatedSubjects = subjects.filter(
      (subject) => subject.id !== id
    );

    await kv.set(KV_KEY, updatedSubjects);

    return NextResponse.json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/subjects error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete subject",
      },
      {
        status: 500,
      }
    );
  }
}