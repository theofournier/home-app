import { auth } from "@/lib/auth/auth";
import { updatePhoto } from "@/lib/services/queries/photo/updatePhoto";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const PUT = auth(
  async (
    request: NextAuthRequest,
    { params }: { params?: { id?: string } }
  ): Promise<NextResponse> => {
    if (!request.auth) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (!params || !params.id) {
      return NextResponse.json({ error: "No photo id" }, { status: 404 });
    }
    const id = params.id;

    if (!request.body) {
      return NextResponse.json({ error: "No body" }, { status: 400 });
    }

    const body = await request.json();
    const urlCompress = body["urlCompress"];

    if (!urlCompress) {
      return NextResponse.json({ error: "No url" }, { status: 400 });
    }

    try {
      await updatePhoto(id, {
        url_compressed: urlCompress,
      });

      return NextResponse.json({});
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
  }
);
