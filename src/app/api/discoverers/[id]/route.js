import { NextResponse } from "next/server";
import connect from "@/utils/db";
import discovererModel from "@/models/Discoverer";

export const GET = async (request, {params}) => {
    const id = params.id
    try {
        await connect();
        const discoverer = await discovererModel.findById(id).lean();
        return new NextResponse(JSON.stringify(discoverer), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const DELETE = async (request, { params }) => {
    try {
        const id = params.id;
        await connect();
        const deletedDiscoverers = await discovererModel.findByIdAndDelete(id).lean();
        if (!deletedDiscoverers) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("Discoverer has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const id = params.id;
        const updateData = await request.json();
        await connect();
        const updatedDiscoverer = await discovererModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updatedDiscoverer) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("Discoverer has been updated", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}