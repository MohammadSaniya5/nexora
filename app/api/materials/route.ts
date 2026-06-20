import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

type Material = {
  id: string;
  title: string;
  subject: string;
  category: string;
  url: string;
  description?: string;
  uploadedAt: string;
};

const KV_KEY = "materials";

export async function GET() {
  try {
    const materials =
      (await kv.get<Material[]>(KV_KEY)) ?? [];

    materials.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() -
        new Date(a.uploadedAt).getTime()
    );

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

    const materials =
      (await kv.get<Material[]>(KV_KEY)) ?? [];

    const updatedMaterials = materials.filter(
      (material) => material.id !== id
    );

    await kv.set(KV_KEY, updatedMaterials);

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