import discovererModel from "@/models/Discoverer";
import { deleteRoute, getRoute, patchRoute } from "@/utils/apiRoutes";

export const GET = async (request, { params }) => {
    const id = params.id;
    return await getRoute(discovererModel, request, id);
};
export const DELETE = async (request, { params }) => {
    const id = params.id;
    return await deleteRoute(discovererModel, id);
}
export const PATCH = async (request, { params }) => {
    const id = params.id;
    return await patchRoute(discovererModel, request, id);
}