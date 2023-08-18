import starModel from "@/models/Star";
import { getRoute, postRoute } from "@/utils/apiRoutes";

export const GET = async (request) => {
    return await getRoute(starModel, request);
}

export const POST = async (request) => {
    return await postRoute(starModel, request);
}