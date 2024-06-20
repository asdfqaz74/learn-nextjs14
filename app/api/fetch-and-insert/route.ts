import { NextRequest, NextResponse } from "next/server";
import fetchDataAndInsertToMongoDB from "../../../lib/fetchAndInsert";

export async function GET(request: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
        await fetchDataAndInsertToMongoDB(apiUrl);
        return NextResponse.json({ message: "데이터 패치 및 삽입 완료"});
    } catch (error) {
        return NextResponse.json({ message: "데이터 패치 및 삽입 실패", error: error.message });
    }
}