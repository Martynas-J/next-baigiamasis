import { NextResponse } from "next/server";
import connect from "@/utils/db";
import planetModel from "@/models/Planet";


export const GET = async (request) => {
    const url = new URL(request.url)
    const shouldEmbed = url.searchParams.get('_expand');
    try {
        await connect();
        let planets;
        if (shouldEmbed) {
            planets = await planetModel.find().populate(`${shouldEmbed}Id`);
        } else {
            planets = await planetModel.find({}).lean();
        }
        return new NextResponse(JSON.stringify(planets), { status: 200 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}
export const POST = async (request) => {
    const body = await request.json()
    const newPlanet = new planetModel(body)
    try {
        await newPlanet.save()
        return new NextResponse("Planet has been created", { status: 201 });
    } catch (err) {
        return new NextResponse("Database Error :(", { status: 500 });
    }
}