import discovererModel from "@/models/Discoverer";
import { getRoute, postRoute } from "@/utils/apiRoutes";

export const GET = async () => {
    return await getRoute(discovererModel);
}

export const POST = async (request) => {
    return await postRoute(discovererModel, request);
}