import { NextResponse } from "next/server";
import connect from "@/utils/db";
import planetModel from "@/models/Planet";

export const GET = async (request, {params}) => {
    const id = params.id
    try {
        await connect();
        const planet = await planetModel.findById(id).populate("discovererId systemId").lean();
        return new NextResponse(JSON.stringify(planet), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const DELETE = async (request, { params }) => {
    try {
        const id = params.id;
        await connect();
        const deletedPlanets = await planetModel.findByIdAndDelete(id).lean();
        if (!deletedPlanets) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("Planet has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const id = params.id;
        const updateData = await request.json();
        await connect();
        const updatedPlanet = await planetModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updatedPlanet) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("Planet has been updated", { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}