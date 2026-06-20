import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const subjects = await sql`
      SELECT
        id,
        name,
        created_at AS "createdAt"
      FROM subjects
      ORDER BY name ASC;
    `;

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

    const existing = await sql`
      SELECT id
      FROM subjects
      WHERE LOWER(name) = LOWER(${name.trim()});
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        {
          error: "Subject already exists",
        },
        {
          status: 409,
        }
      );
    }

    const newSubject = {
      id: uuid(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    await sql`
      INSERT INTO subjects (
        id,
        name,
        created_at
      )
      VALUES (
        ${newSubject.id},
        ${newSubject.name},
        ${newSubject.createdAt}
      );
    `;

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

    await sql`
      DELETE FROM subjects
      WHERE id = ${id};
    `;

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