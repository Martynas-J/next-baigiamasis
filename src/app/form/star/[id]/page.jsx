"use client"
import UniversalForm from "@/Components/Form/UniversalForm"
import { API_URL} from "@/Components/Config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/Components/Container/Container";
import { useRouter } from "next/navigation";

const StarFormPage = ({params}) => {
    const  id  = params.id
    const navigate = useRouter();

    const [star, setStar] = useState('');
    const [systems, setSystems] = useState('');
    const [discoverers, setDiscoverers] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/systems`)
            .then(res => setSystems(res.data))
            .catch(res => toast.error(res.message))

        axios.get(`${API_URL}/discoverers`)
            .then(res => setDiscoverers(res.data))
            .catch(res => toast.error(res.message))

        if (id && id !== "new") {
            axios.get(`${API_URL}/stars/${id}?_embed=photos`)
                .then(res => {
                    let { name, discovererId, galaxy, galaxyGroup, systemId } = res.data
                    const newData = {
                        name,
                        discovererId,
                        galaxy,
                        galaxyGroup,
                        systemId,
                    }
                    return setStar(newData)
                })
                .catch(res => toast.error(res.message))
        }
    }, [id])

    if (!systems || !discoverers) {
        return ""
    }

    const allSystems = systems.map(item => ({ id: item.id, name: item.name }))
    const allDiscoverers = discoverers.map(item => ({ id: item.id, name: item.name }))

    const inputs = [
        { type: 'text', name: 'name', label: 'Name', value: '', required: true },
        { type: 'select', name: 'systemId', label: 'System', options: allSystems, value: '', required: true },
        { type: 'select', name: 'discovererId', label: 'Discoverer', options: allDiscoverers, value: '', required: true },
        { type: 'text', name: 'galaxy', label: 'Galaxy', value: '', required: true },
        { type: 'text', name: 'galaxyGroup', label: 'Galaxy Group', value: '', required: true },
    ];
    const addStarHandler = (data) => {
        let { name, discovererId, galaxy, galaxyGroup, systemId } = data
        discovererId = Number(discovererId)
        systemId = Number(systemId)
        const newStar = { name, discovererId, galaxy, galaxyGroup, systemId }

        if (star) {
            axios.patch(`${API_URL}/stars/${id}`, newStar)
                .then(() => {
                    toast.success("Star was Edited");
                    setStar("");
                    navigate("/stars")
                })
                .catch((res) => toast.error(res.messages));
        } else {
            axios.post(`${API_URL}/stars`, newStar)
                .then(() => {
                    toast.success('Star was added');
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    }
    return (
        <Container>
            <div className="form-wrapper">
                <h1 className="page-title">Star Form</h1>
                <UniversalForm
                    inputs={inputs}
                    onAddData={addStarHandler}
                    newData={star ? star : ""}
                />
            </div>
        </Container>
    )
}

export default StarFormPage