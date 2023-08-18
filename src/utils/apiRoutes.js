import { NextResponse } from "next/server";
import connect from "@/utils/db";

export const getRoute = async (model, request, id) => {
    try {
        await connect();
        let expands = ""
        if (request) {
            const url = new URL(request.url);
            expands = url.searchParams.getAll('_expand');        
        }
        let query;

        if (id) {
            query = model.findById(id);
            if (expands.length > 0) {
                query = query.populate(expands.join("Id ") + "Id");
            }
        } else {
            query = model.find({});
            if (expands.length > 0) {
                query = query.populate(expands.join("Id ") + "Id");
            } else {
                query = query.lean();
            }
        }
        const data = await query;
        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}

export const postRoute = async (model, request) => {
    try {
        await connect();
        const body = await request.json();
        const newItem = new model(body);
        await newItem.save();
        return new NextResponse(`${model.modelName} has been created`, { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const deleteRoute = async (model, id) => {
    try {
        await connect();
        const deletedItem = await model.findByIdAndDelete(id).lean();
        if (!deletedItem) {
            return new NextResponse("Data not found", { status: 404 });
        }
        return new NextResponse(`${model.modelName} has been deleted`, { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
};

export const patchRoute = async (model, request, id) => {
    const data = await request.json();
    try {
        await connect();
        const updatedData = await model.findByIdAndUpdate(id, data, { new: true }).lean();
        if (!updatedData) {
            return new NextResponse("Data not found", { status: 404 });
        }
        return new NextResponse(`${model.modelName} has been updated`, { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
};