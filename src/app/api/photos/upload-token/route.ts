import { auth } from "@/lib/auth/auth";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";

export const POST = auth(
  async (request: NextAuthRequest): Promise<NextResponse> => {
    const body = (await request.json()) as HandleUploadBody;

    try {
      const jsonResponse = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => {
          if (!request.auth) {
            throw new Error("Not authenticated");
          }
          return {
            allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
          };
        },
        onUploadCompleted: async ({ blob }) => {
          console.log("Upload completed", blob.pathname);
        },
      });

      return NextResponse.json(jsonResponse);
    } catch (error) {
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 400 }
      );
    }
  }
);
