import { auth } from "@/lib/auth/auth";
import { createPhotos } from "@/lib/services/queries/createPhotos";
import { uploadPhotoServer } from "@/lib/services/vercelBlob";
import { nanoid } from "nanoid";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const POST = auth(
  async (request: NextAuthRequest): Promise<NextResponse> => {
    if (!request.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const photoName = searchParams.get("photoname");

    // From server
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

      await createPhotos([
        {
          id: nanoid(15),
          url: result.blobResult.url,
          height: 0,
          width: 0,
        },
      ]);
      return NextResponse.json(result);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message, photoName },
        { status: 400 }
      );
    }
  }
);
