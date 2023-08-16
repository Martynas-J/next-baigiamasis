"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, PLANET_IMG_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import Container from "@/Components/Container/Container";
import Link from "next/link";

const PlanetPage = ({params}) => {

    const apiUrl = process.env.API_URL1
    const [planet, setPlanet] = useState('');
    const id  = params.id

    useEffect(() => {
        axios.get(`${apiUrl}/planets/${id}?_expand=discoverer&_expand=system`)
            .then(res => setPlanet(res.data))
            .catch(res => toast.error(res.message))
    }, [id])

    if (!planet) {
        return ""
    }

    const { name, discovererId, systemId, galaxy, satellites } = planet
    let starsElement = ""
    let satellitesText = "has no satellites"

    if (systemId.stars.length > 0) {
        const starsNr = systemId.stars.split(",").length
        starsElement = starsNr > 1 ? `(${starsNr} Stars)` : `(${starsNr} Star)`
    }

    if (satellites.length > 0) {
        const satellitesNr = satellites.split(",").length
        satellitesText = satellitesNr > 1 ? ` satellites are ${satellites}` : ` satellite is ${satellites}`
    }

    return (
        <Container>
            <div className="planet">
                <Link href="/gallery/planets"><img className="medium-img" src={ PLANET_IMG_URL}></img> </Link>
                <Link href={`/form/planet/${id}`} className="create-link">Edit Planet</Link>
                <h2 className="planet-title"> {name}</h2>
                <p className="planet-content">
                    The scientist who made the most significant contributions to the discovery is <Link href={`/discoverers/${discovererId._id}`}>{discovererId.name} {discovererId.occupation}</Link>. {name} belongs to the <Link href={`/systems/${systemId._id}`}>{systemId.name}</Link> {starsElement} system, which is located in the {galaxy} Galaxy. {name} {satellitesText}.
                </p>
            </div>
        </Container>
    )
}
export default PlanetPage