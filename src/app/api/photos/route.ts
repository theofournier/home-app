import { auth } from "@/lib/auth/auth";
import { createPhotos } from "@/lib/services/queries/photo/createPhotos";
import { nanoid } from "nanoid";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const POST = auth(
  async (request: NextAuthRequest): Promise<NextResponse> => {
    if (!request.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!request.body) {
      return NextResponse.json({ error: "No body" }, { status: 400 });
    }

    const body = await request.json();
    const url = body["url"];
    const urlCompress = body["urlCompress"];

    if (!url) {
      return NextResponse.json({ error: "No url" }, { status: 400 });
    }

    try {
      await createPhotos([
        {
          id: nanoid(15),
          url,
          url_compressed: urlCompress,
          width: 0,
          height: 0,
        },
      ]);

      return NextResponse.json({});
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
  }
);
