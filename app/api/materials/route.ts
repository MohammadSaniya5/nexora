import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const materials = await sql`
      SELECT
        id,
        title,
        subject,
        category,
        url,
        description,
        uploaded_at AS "uploadedAt"
      FROM materials
      ORDER BY uploaded_at DESC;
    `;

    return NextResponse.json(materials);
  } catch (error) {
    console.error("GET /api/materials error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch materials",
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
          error: "Missing material id",
        },
        {
          status: 400,
        }
      );
    }

    await sql`
      DELETE FROM materials
      WHERE id = ${id};
    `;

    return NextResponse.json({
      success: true,
      message: "Material deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/materials error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete material",
      },
      {
        status: 500,
      }
    );
  }
}