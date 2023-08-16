"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SystemItem from "@/Components/SystemItem/SystemItem";
import Container from "@/Components/Container/Container";
import styles from "./system.module.scss"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SystemsPage = () => {

  const session = useSession()

  const router = useRouter()
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/dashboard/login");
    }
  }, [session.status, router]);

  const [systems, setSystems] = useState('');
  const apiUrl = process.env.API_URL1
  useEffect(() => {
    axios.get(`${apiUrl}/systems`)
      .then(res => setSystems(res.data))
      .catch(res => toast.error(res.message))
  }, [])
  if (!systems) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${apiUrl}/systems/${id}`)
      .then(() => {
        toast.info("System was deleted!")
        setSystems(prevState => {
          let newState = [...prevState]
          return newState.filter(((system) => system._id !== id))
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
              systems.map(system => <SystemItem key={system._id} system={system} onDelete={deleteHandler} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}


export default SystemsPage