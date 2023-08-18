import systemModel from "@/models/System";
import { getRoute, postRoute } from "@/utils/apiRoutes";

export const GET = async () => {
    return await getRoute(systemModel);
}

export const POST = async (request) => {
    return await postRoute(systemModel, request);
}