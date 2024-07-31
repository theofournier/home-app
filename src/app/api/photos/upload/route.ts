import { auth } from "@/lib/auth/auth";
import { uploadPhotoServer } from "@/lib/services/vercelBlob";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const POST = auth(
  async (request: NextAuthRequest): Promise<NextResponse> => {
    if (!request.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const photoName = searchParams.get("photoname");

    if (!photoName) {
      return NextResponse.json(
        { error: "No photo filename in query", photoName },
        { status: 400 }
      );
    }
    if (!request.body) {
      return NextResponse.json(
        { error: "No photo in body", photoName },
        { status: 400 }
      );
    }

    try {
      const result = await uploadPhotoServer(photoName, request.body);

      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message, photoName },
        { status: 400 }
      );
    }
  }
);
