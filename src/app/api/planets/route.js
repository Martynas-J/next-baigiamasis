import planetModel from "@/models/Planet";
import { getRoute, postRoute } from "@/utils/apiRoutes";

export const GET = async () => {
    return await getRoute(planetModel);
}

export const POST = async (request) => {
    return await postRoute(planetModel, request);
}