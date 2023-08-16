import { NextResponse } from "next/server";
import connect from "@/utils/db";
import starModel from "@/models/Star";

export const GET = async (request, {params}) => {
    const id = params.id
    try {
        await connect();
        const star = await starModel.findById(id).populate("discovererId systemId").lean();
        console.log(star)
        return new NextResponse(JSON.stringify(star), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const DELETE = async (request, { params }) => {
    try {
        const id = params.id;
        await connect();
        const deletedStars = await starModel.findByIdAndDelete(id).lean();
        if (!deletedStars) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("Stars has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Klaida trinant įrašą :(", { status: 500 });
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const id = params.id;
        const updateData = await request.json();
        await connect();
        const updatedStar = await starModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updatedStar) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse(JSON.stringify(updatedStar), { status: 200 });
    } catch (err) {
        return new NextResponse("Klaida atnaujinant įrašą :(", { status: 500 });
    }
}