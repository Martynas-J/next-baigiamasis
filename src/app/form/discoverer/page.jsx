"use client"
import Container from "@/Components/Container/Container"
import UniversalForm from "@/Components/Form/UniversalForm"
import { API_URL, HUMAN_IMG_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const DiscovererFormPage = ({params}) => {
    const  id  = params.id
    const navigate = useRouter
    const [discoverer, setDiscoverer] = useState('');

    useEffect(() => {
        if (id && id !== "new") {
            axios.get(`${API_URL}/discoverers/${id}?_embed=photos`)
                .then(res => {
                    const { name, country, birthplace, occupation, contribution, photos, id } = res.data
                    const newData = {
                        name,
                        country,
                        birthplace,
                        occupation,
                        contribution,
                        url: photos.length > 0 ? photos[0].url : HUMAN_IMG_URL,
                        thumbnailUrl: photos.length > 0 ? photos[0].thumbnailUrl : HUMAN_IMG_URL,
                        id,
                        photoId: photos.length > 0 ? photos[0].id : '',
                    }
                    return setDiscoverer(newData)
                })
                .catch(res => toast.error(res.message))
        }
    }, [id])

    const inputs = [
        { type: 'text', name: 'name', label: 'Name', value: '', required: true },
        { type: 'text', name: 'country', label: 'Country', value: '', required: true },
        { type: 'text', name: 'birthplace', label: 'Birthplace', value: '', required: true },
        { type: 'text', name: 'occupation', label: 'Occupation', value: '', required: true },
        { type: 'text', name: 'contribution', label: 'Contribution', value: '', required: true },
        { type: 'url', name: 'url', label: 'Photo URL', value: '', required: false },
        { type: 'url', name: 'thumbnailUrl', label: 'Thumbnail Photo URL', value: '', required: false },
    ];

    const addDiscovererHandler = (data) => {
        let { name, country, birthplace, occupation, contribution, url, thumbnailUrl, photoId } = data
        url = url ? url : HUMAN_IMG_URL
        thumbnailUrl = thumbnailUrl ? thumbnailUrl : HUMAN_IMG_URL
        const newDiscoverer = { name, country, birthplace, occupation, contribution }
        if (discoverer) {
            axios
                .patch(`${API_URL}/discoverers/${discoverer.id}`, newDiscoverer)
                .then((response) => {
                    const discovererId = response.data.id;
                    const photoData = { name, url, thumbnailUrl, discovererId, category: "discoverers" };
                    if (photoId) {
                        return axios.patch(`${API_URL}/photos/${photoId}`, photoData)
                    } else {
                        return axios.post(`${API_URL}/photos`, photoData);
                    }
                })
                .then(() => {
                    toast.success("Discoverer was Edited");
                    setDiscoverer("");
                    navigate("/discoverers")
                })
                .catch((res) => toast.error(res.messages));
        } else {
            axios.post(`${API_URL}/discoverers`, newDiscoverer)
                .then((response) => {
                    const discovererId = response.data.id;
                    const photoData = { name, url, thumbnailUrl, discovererId, category: "discoverers" };
                    return axios.post(`${API_URL}/photos`, photoData);
                })
                .then(() => {
                    toast.success('Discoverer was added');
                    navigate("/discoverers")
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    }
    return (
        <Container>
            <div className="form-wrapper">
                <h1 className="page-title">Discoverer Form</h1>
                <UniversalForm
                    inputs={inputs}
                    onAddData={addDiscovererHandler}
                    newData={discoverer ? discoverer : ""}
                />
            </div>
        </Container>
    )
}

export default DiscovererFormPage