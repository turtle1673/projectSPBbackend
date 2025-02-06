import { NextResponse } from "next/server";
import { calSugar } from "@/app/actions";

export async function POST(req: Request) {
  const { value } = await req.json();
  const result = await calSugar(value);
  return NextResponse.json({ result });
}
