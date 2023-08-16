"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Container from "@/Components/Container/Container";
import Link from "next/link";

const SystemPage = ({ params }) => {
    const [system, setSystem] = useState('');
    const id = params.id;
    const apiUrl = process.env.API_URL1
    useEffect(() => {
        axios.get(`${apiUrl}/systems/${id}`)
            .then(res => setSystem(res.data))
            .catch(res => toast.error(res.message))
    }, [])
    if (!system) {
        return ""
    }
    const { name, galaxy, galaxyGroup, planets, stars } = system

    let planetsText = ""
    let starsText = ""

    if (planets.length > 1) {
        planetsText = "Planets: "
    } else if (planets.length === 1) {
        planetsText = "Planet: "
    }

    if (stars.length > 1) {
        starsText = "Stars: "
    } else if (stars.length === 1) {
        starsText = "Star: "
    }
    return (
        <Container>
            <div className="system">
                <h2 className="system-title"> {name}</h2>
                <ul>
                    {planets ? <li><span className="bold">{planetsText}</span>{planets}</li> : ""}
                    {stars ? <li><span className="bold">{starsText}</span>{stars}</li> : ""}
                    <li><span className="bold">Galaxy: </span>{galaxy ? galaxy : ""}</li>
                    <li><span className="bold">Galaxy Group: </span>{galaxyGroup ? galaxyGroup : ""}</li>
                </ul>
                <Link href={`/form/system/${id}`} className="create-link">Edit System</Link>
            </div>
        </Container>

    )
}

export default SystemPage