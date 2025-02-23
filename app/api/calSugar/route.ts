import { calSugar } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { value } = await req.json();
  const resul = await calSugar(value);
  return NextResponse.json({ resul });
}
