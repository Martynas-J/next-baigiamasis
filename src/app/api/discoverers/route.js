import { NextResponse } from "next/server";
import connect from "@/utils/db";
import discovererModel from "@/models/Discoverer";

export const GET = async () => {
    try {
        await connect();
        const discoverer = await discovererModel.find({}).lean()
        return new NextResponse(JSON.stringify(discoverer), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const POST = async (request) => {
    const body = await request.json()
    const newDiscoverer = new discovererModel(body)
    try {
        await newDiscoverer.save()
        return new NextResponse("Discoverer has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}