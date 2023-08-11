import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./styles.scss";

const SignupSchema = yup.object().shape({
    name: yup.string().required(),
    url: yup.string().url().required(),
    thumbnailUrl: yup.string().url().required()
});

function FormItem({ category, onAddPhoto }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = (data) => {
        const { name, url, thumbnailUrl } = data
        const addPhotoData = {
            name,
            url,
            thumbnailUrl,
            category
        }
        onAddPhoto(addPhotoData)
        reset()
    };

    return (
        <div className="form-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input {...register("name")} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Url</label>
                    <input {...register("url")} />
                    {errors.url && <p>{errors.url.message}</p>}
                </div>
                <div>
                    <label>Thumbnail Url</label>
                    <input {...register("thumbnailUrl")} />
                    {errors.thumbnailUrl && <p>{errors.thumbnailUrl.message}</p>}
                </div>
                <input type="submit" value="Add Photo" />
            </form>

        </div>

    );
}
export default FormItem