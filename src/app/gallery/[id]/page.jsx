"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import { firstLetterUpperCase } from "@/Components/Functions/Functions";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import classes from "./GalleryByCategoryPage.module.scss"
import FormItem from "@/Components/Form/FormItem";
import Container from "@/Components/Container/Container";

const GalleryByCategoryPage = ({params}) => {

    const { addPhotoButton, deleteButton } = classes

    const  category  = params.id
    const [photos, setPhotos] = useState('');
    const [addPhoto, setAddPhoto] = useState(false)

    useEffect(() => {
        axios.get(`${API_URL}/photos`)
            .then(res => setPhotos(res.data))
            .catch(res => toast.error(res.message))
    }, [])

    const deleteHandler = (id) => {
        axios.delete(`${API_URL}/photos/${id}`)
            .then(() => {
                toast.info("Photo Deleted")
                setPhotos(prevState => {
                    let newState = [...prevState]
                    return newState.filter(((photo) => photo.id !== id))
                })
            })
            .catch(res => toast.error(res.message))
    }
    const addFormHandler = () => {
        setAddPhoto(prevState => !prevState)
    }
    const addPhotoHandler = (newPhoto) => {
        axios.post(`${API_URL}/photos`, newPhoto)
            .then((res) => {
                const addedPhoto = res.data;
                setPhotos((prevPhotos) => [addedPhoto, ...prevPhotos]);
                toast.success("Photo Added");
            })
            .catch(res => toast.error(res.message))
        return true
    }
    if (!photos) {
        return ""
    }
    let images = []
    const photosByCategory = photos.filter(photo => photo.category === category)
    photosByCategory.map(photo => images.push({
        original: photo.url, thumbnail: photo.thumbnailUrl,
        description: <>{photo.name} <button className={deleteButton} onClick={() => deleteHandler(photo.id)}>X</button></>
    }))

    return (
        <Container>
            <div className="gallery-category-wrapper">
                <h1 className="page-title">{firstLetterUpperCase(category)} Gallery</h1>
                {addPhoto ? <FormItem category={category} onAddPhoto={addPhotoHandler} /> : ""}
                <button className={addPhotoButton} onClick={addFormHandler}>{addPhoto ? "Hide" : "Add Photo"}</button>
                <ReactImageGallery items={images} />
            </div>
        </Container>

    )
}

export default GalleryByCategoryPage