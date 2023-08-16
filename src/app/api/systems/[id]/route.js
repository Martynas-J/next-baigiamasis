import { NextResponse } from "next/server";
import connect from "@/utils/db";
import systemModel from "@/models/System";

export const GET = async (request, { params }) => {
    const id = params.id
    try {
        await connect();
        const system = await systemModel.findById(id).lean();
        return new NextResponse(JSON.stringify(system), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
// export const POST = async (request) => {
//     const body = await request.json()
//     const newSystem = new systemModel(body)
//     try {
//         await newSystem.save()
//         return new NextResponse("System has been created", { status: 201 });
//     } catch (err) {
//         return new NextResponse("Database Error :(", { status: 500 });
//     }
// }
export const DELETE = async (request, { params }) => {
    try {
        const id = params.id;
        await connect();
        const deletedSystem = await systemModel.findByIdAndDelete(id).lean();
        if (!deletedSystem) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse("System has been deleted", { status: 200 });
    } catch (err) {
        return new NextResponse("Klaida trinant įrašą :(", { status: 500 });
    }
}
export const PATCH = async (request, { params }) => {
    try {
        const id = params.id;
        const updateData = await request.json();
        await connect();
        const updatedSystem = await systemModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
        if (!updatedSystem) {
            return new NextResponse("Įrašas nerastas", { status: 404 });
        }
        return new NextResponse(JSON.stringify(updatedSystem), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}