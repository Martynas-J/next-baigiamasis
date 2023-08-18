import systemModel from "@/models/System";
import { deleteRoute, getRoute, patchRoute } from "@/utils/apiRoutes";

export const GET = async (request, { params }) => {
    const id = params.id;
    return await getRoute(systemModel, request, id);
};

export const DELETE = async (request, { params }) => {
    const id = params.id;
    return await deleteRoute(systemModel, id);
}
export const PATCH = async (request, { params }) => {
    const id = params.id;
    return await patchRoute(systemModel, request, id);
}