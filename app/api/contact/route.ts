import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

type Message = {
  id: string;
  name: string;
  roll: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const KV_KEY = "messages";

export async function GET() {
  try {
    const messages =
      (await kv.get<Message[]>(KV_KEY)) ?? [];

    messages.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET Messages Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch messages",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = body.name?.trim();
    const roll = body.roll?.trim() || "";
    const email = body.email?.trim() || "";
    const subject = body.subject?.trim() || "";
    const message = body.message?.trim();

    if (!name || !message) {
      return NextResponse.json(
        {
          error: "Name and message are required",
        },
        {
          status: 400,
        }
      );
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          error: "Invalid email address",
        },
        {
          status: 400,
        }
      );
    }

    const newMessage: Message = {
      id: uuid(),
      name,
      roll,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    const messages =
      (await kv.get<Message[]>(KV_KEY)) ?? [];

    messages.unshift(newMessage);

    await kv.set(KV_KEY, messages);

    return NextResponse.json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("POST Message Error:", error);

    return NextResponse.json(
      {
        error: "Failed to save message",
      },
      {
        status: 500,
      }
    );
  }
}