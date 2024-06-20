import { NextRequest, NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
    console.log('----------')
    try {
        const client = await clientPromise;
        const db = client.db('sample_mflix');
        const movies = await db.collection('nomad').find({}).limit(5).toArray();

        console.log(movies)
        const response = NextResponse.json(movies);
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        return response;
        
    } catch (error) {
        return NextResponse.error();
    }
}