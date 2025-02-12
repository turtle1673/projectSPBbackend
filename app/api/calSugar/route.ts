import { NextResponse } from "next/server";
import { calHeartRate, calSugar } from "@/app/actions";

export async function POST(req: Request) {
  const { value1,age } = await req.json();
  const resul = await calSugar(value1);
  const hrt = await calHeartRate(age)
  return NextResponse.json({ resul,hrt });
}
