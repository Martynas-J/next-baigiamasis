import starModel from "@/models/Star";
import { deleteRoute, getRoute, patchRoute } from "@/utils/apiRoutes";

export const GET = async (request, { params }) => {
    const id = params.id;
    return await getRoute(starModel, request, id);
};

export const DELETE = async (request, { params }) => {
    const id = params.id;
    return await deleteRoute(starModel, id);
}
export const PATCH = async (request, { params }) => {
        const id = params.id;
        return await patchRoute(starModel, request, id);
}