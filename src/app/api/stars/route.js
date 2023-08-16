import { NextResponse } from "next/server";
import connect from "@/utils/db";
import starModel from "@/models/Star";

export const GET = async (request) => {
    const url = new URL(request.url)
    const shouldEmbed = url.searchParams.get('_expand');
    try {
        await connect();
        let stars;
        if (shouldEmbed) {
            stars = await starModel.find().populate(`${shouldEmbed}Id`);
        } else {
            stars = await starModel.find({}).lean();
        }
        return new NextResponse(JSON.stringify(stars), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const POST = async (request) => {
    const body = await request.json()
    const newStar = new starModel(body)
    try {
        await newStar.save()
        return new NextResponse("Star has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}