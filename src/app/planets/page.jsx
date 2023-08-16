"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import PlanetItem from "@/Components/PlanetItem/PlanetItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./planets.module.scss"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PlanetsPage = () => {

  const session = useSession()

  const router = useRouter()
  useEffect(() => {
      if (session.status === "unauthenticated") {
          router?.push("/dashboard/login");
      }
  }, [session.status, router]);

  const apiUrl = process.env.API_URL1
  const [planets, setPlanets] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/planets?_expand=system`)
      .then(res => setPlanets(res.data))
      .catch(res => toast.error(res.message))
  }, [])
  if (!planets) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${apiUrl}/planets/${id}`)
      .then(() => {
        toast.info("Planet was deleted!")
        setPlanets(prevState => {
          let newState = [...prevState]
          return newState.filter(((planet) => planet._id !== id))
        })
      })
      .catch(err => {
        toast.error(err.message);
      });
  }
  return (
    <Container>
      <div className={styles.planetsWrapper}>
        <h1 className="page-title">Planets</h1>
        <Link href="/form/planet/new" className="create-link">Add New Planet</Link>
        <div className={styles.planetWrapper}>
          {
            planets.length > 0 ?
              planets.map(planet => <PlanetItem key={planet._id} onDelete={deleteHandler} planet={planet} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container> 

  )
}

export default PlanetsPage