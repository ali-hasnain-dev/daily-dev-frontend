import { NextRequest, NextResponse } from "next/server";
import { getLinkPreview } from "link-preview-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data: ImagePreviewType = (await getLinkPreview(body.url, {
      imagesPropertyType: "og",
      followRedirects: "follow",
    })) as ImagePreviewType;

    return NextResponse.json({ status: 200, data });
  } catch (error) {
    return NextResponse.json({ status: 400, message: "Not found" });
  }
}
