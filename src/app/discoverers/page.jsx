"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DiscovererItem from "@/Components/DiscovererItem/DiscovererItem"
import Container from "@/Components/Container/Container";
import styles from "./discoverers.module.scss"
import Link from "next/link";

const DiscoverersPage = () => {
  const apiUrl = process.env.API_URL1
  const [discoverers, setDiscoverers] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/discoverers`)
      .then(res => setDiscoverers(res.data))
      .catch(res => toast.error(res.message))
  }, [])

  if (!discoverers) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${apiUrl}/discoverers/${id}`)
      .then(() => {
        toast.info("Discoverer was deleted!")
        setDiscoverers(prevState => {
          let newState = [...prevState]
          return newState.filter(((discoverer) => discoverer._id !== id))
        })
      })
      .catch(err => {
        toast.error(err.message);
      });
  }
  return (
    <Container>
      <div className={styles.discoverersWrapper}>
        <h1 className="page-title">Discoverers</h1>
        <Link href="/form/discoverer/new" className="create-link">Add New Discoverer</Link>
        <div className={styles.discovererWrapper}>
          {
            discoverers.length > 0 ?
              discoverers.map(discoverer =>
                <DiscovererItem key={discoverer._id} discoverer={discoverer} onDelete={deleteHandler} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}

export default DiscoverersPage