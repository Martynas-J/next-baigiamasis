"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import Container from "@/Components/Container/Container";
import styles from "./star.module.scss"
import Link from "next/link";

const StarPage = ({params}) => {
    const [star, setStar] = useState('');
    const  id  = params.id;
    const apiUrl = process.env.API_URL1

    useEffect(() => {
        axios.get(`${apiUrl}/stars/${id}?_expand=discoverer&_expand=system`)
            .then(res => setStar(res.data))
            .catch(res => toast.error(res.message))
    }, [id])

    if (!star) {
        return ""
    }
    const { name, discoverer, discovererId, systemId, galaxy, galaxyGroup } = star

    const discovererElement = discovererId ?
        <>
            One of the most notable figures in {name} exploration is <Link href={`/discoverers/${discovererId._id}`}>{discovererId.name} {discovererId.occupation}.</Link>
        </>
        : "No information about discoverer."

    let systemElement = " No information about system."
    let starsElement =""
    if (systemId) {
        if (systemId.stars.length > 0) {
            const starsNr = systemId.stars.split(",").length
            starsElement = starsNr > 1 ? `(${starsNr} Stars)` : `(${starsNr} Star)`
        }
        systemElement =
            <>
                {" " + name} belongs to the <Link href={`/systems/${systemId._id}`}>{systemId.name}</Link> {starsElement} system.
            </>
    }
    const galaxyElement = galaxy ? ` A particle of the universe is located in the ${galaxy} Galaxy.` : ""
    const galaxyGroupElement = galaxyGroup ? ` ${name} is located in the ${galaxyGroup} galaxy group.` : ""

    return (
        <Container>
            <div className={styles.star}>
                <h2 className="star-title"> {name}</h2>
                <p>
                    {discovererElement}
                    {systemElement}
                    {galaxyElement}
                    {galaxyGroupElement}
                </p>
                <Link href={`/form/star/${id}`} className="create-link">Edit Star</Link>
            </div>
        </Container>

    )
}

export default StarPage