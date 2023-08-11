"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import DiscovererItem from "@/Components/DiscovererItem/DiscovererItem"
import Container from "@/Components/Container/Container";
import styles from "./discoverers.module.scss"
import Link from "next/link";

const DiscoverersPage = () => {
  const [discoverers, setDiscoverers] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/discoverers?_embed=photos`)
      .then(res => setDiscoverers(res.data))
      .catch(res => toast.error(res.message))
  }, [])

  if (!discoverers) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/discoverers/${id}?_embed=photos`)
      .then(() => {
        toast.info("Discoverer was deleted!")
        setDiscoverers(prevState => {
          let newState = [...prevState]
          return newState.filter(((discoverer) => discoverer.id !== id))
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
                <DiscovererItem key={discoverer.id} discoverer={discoverer} onDelete={deleteHandler} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}

export default DiscoverersPage