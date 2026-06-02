import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, program, email, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "이름과 연락처는 필수입니다." },
        { status: 400 }
      );
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;

    if (!appsScriptUrl || appsScriptUrl.includes("여기에_")) {
      return NextResponse.json(
        { error: "APPS_SCRIPT_URL이 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, program, email, message }),
    });

    if (!response.ok) {
      throw new Error(`Apps Script 응답 오류: ${response.status}`);
    }

    const result = await response.json();

    // Apps Script 응답: { ok: true, row: number } 또는 { ok: false, error: string }
    if (!result.ok) {
      throw new Error(result.error || "저장 실패");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
