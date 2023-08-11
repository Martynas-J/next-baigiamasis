"use client"
import UniversalForm from "@/Components/Form/UniversalForm"
import { useRouter } from "next/navigation";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/Components/Container/Container";

const SystemFormPage = ({ params }) => {
    const router = useRouter()
    const id = params.id
    const [system, setSystem] = useState('');

    useEffect(() => {
        if (id && id !== "new") {
            axios.get(`${API_URL}/systems/${id}?_embed=photos`)
                .then(res => {
                    const { name, galaxy, galaxyGroup, stars, planets } = res.data
                    const newData = { name, galaxy, galaxyGroup, stars, planets }
                    return setSystem(newData)
                })
                .catch(res => toast.error(res.message))
        }
    }, [id])


    const inputs = [
        { type: 'text', name: 'name', label: 'Name', value: '', required: true },
        { type: 'text', name: 'planets', label: 'Planets (for example Planet1, Planet2)', value: '', required: false },
        { type: 'text', name: 'stars', label: 'Stars (for example Star1, Star2)', value: '', required: false },
        { type: 'text', name: 'galaxy', label: 'Galaxy', value: '', required: true },
        { type: 'text', name: 'galaxyGroup', label: 'Galaxy Group', value: '', required: true },
    ];
    const addSystemHandler = (data) => {
        let { name, galaxy, galaxyGroup, stars, planets } = data
        stars = stars ? stars : ""
        planets = planets ? planets : ""
        const newSystem = { name, galaxy, galaxyGroup, stars, planets }
        if (system) {
            axios.patch(`${API_URL}/systems/${id}`, newSystem)
                .then(() => {
                    toast.success("System was Edited");
                    setSystem("");
                    router?.push("/systems")
                })
                .catch((res) => toast.error(res.messages));
        } else {
            axios.post(`${API_URL}/systems`, newSystem)
                .then(() => {
                    toast.success('System was added');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    }
    return (
        <Container>
            <div className="form-wrapper">
                <h1 className="page-title">System Form</h1>
                <UniversalForm
                    inputs={inputs}
                    onAddData={addSystemHandler}
                    newData={system ? system : ""}
                />
            </div>
        </Container>
    )
}

export default SystemFormPage