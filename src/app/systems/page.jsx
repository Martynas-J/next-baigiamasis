"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import SystemItem from "@/Components/SystemItem/SystemItem";
import Container from "@/Components/Container/Container";
import styles from "./system.module.scss"
import Link from "next/link";

const SystemsPage = () => {
  const [systems, setSystems] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/systems`)
      .then(res => setSystems(res.data))
      .catch(res => toast.error(res.message))
  }, [])
  if (!systems) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/systems/${id}?_embed=photos`)
      .then(() => {
        toast.info("System was deleted!")
        setSystems(prevState => {
          let newState = [...prevState]
          return newState.filter(((system) => system.id !== id))
        })
      })
      .catch(err => {
        toast.error(err.message);
      });
  }
  return (
    <Container>
      <div className={styles.systemsWrapper}>
        <h1 className="page-title">Systems</h1>
        <Link href="/form/system/new" className="create-link">Add New System</Link>
        <div className={styles.systemWrapper}>
          {
            systems.length > 0 ?
              systems.map(system => <SystemItem key={system.id} system={system} onDelete={deleteHandler} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}


export default SystemsPage