"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import { firstLetterLowerCase } from "@/Components/Functions/Functions"
import Container from "@/Components/Container/Container";
import styles from "./discoverer.module.scss"
import Link from "next/link";


const DiscovererPage = ({params}) => {
    const apiUrl = process.env.API_URL1
    const [discoverer, setDiscoverer] = useState('');
    const id  = params.id

    useEffect(() => {
        axios.get(`${apiUrl}/discoverers/${id}`)
            .then(res => setDiscoverer(res.data))
            .catch(res => toast.error(res.message))
    }, [id])

    if (!discoverer) {
        return ""
    }
    const { name, country, birthplace, occupation, contribution, photos } = discoverer

    return (
        <Container>
            <div className={styles.discoverer}>
                {/* {photos[0] ? <Link href="/gallery/discoverers"><img className="medium-img" src={photos[0].url}></img> </Link> : ""} */}
                <Link href={`/form/discoverer/${id}`} className="create-link discoverer-link">Edit Discoverer</Link>
                <h2 className={styles.discovererTitle} > {name}</h2>
                <span className={styles.item} ><span className="bold">Occupation: </span>{occupation}</span>
                <span className={styles.item} ><span className="bold">Country: </span>{country}</span>
                <span className={styles.item} ><span className="bold">Birthplace: </span>{birthplace}</span>
                <p>{name} {firstLetterLowerCase(contribution)}</p>
            </div>
        </Container>
    )
}

export default DiscovererPage