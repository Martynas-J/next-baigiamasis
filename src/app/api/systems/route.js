import { NextResponse } from "next/server";
import connect from "@/utils/db";
import systemModel from "@/models/System";

export const GET = async () => {
    try {
        await connect();
        const system = await systemModel.find({}).lean()
        return new NextResponse(JSON.stringify(system), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const POST = async (request) => {
    const body = await request.json()
    const newSystem = new systemModel(body)
    try {
        await newSystem.save()
        return new NextResponse("System has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}