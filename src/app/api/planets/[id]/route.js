import planetModel from "@/models/Planet";
import { deleteRoute, getRoute, patchRoute } from "@/utils/apiRoutes";

export const GET = async (request, { params }) => {
    const id = params.id;
    return await getRoute(planetModel, request, id);
};
export const DELETE = async (request, { params }) => {
    const id = params.id;
    return await deleteRoute(planetModel, id);
}
export const PATCH = async (request, { params }) => {
    const id = params.id;
    return await patchRoute(planetModel, request, id);
}