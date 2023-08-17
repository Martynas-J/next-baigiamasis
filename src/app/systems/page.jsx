"use client"
import SystemItem from "@/Components/SystemItem/SystemItem";
import Container from "@/Components/Container/Container";
import styles from "./system.module.scss"
import Link from "next/link";

import GetData from "@/Components/GetData/GetData";
import Loading from "../loading";
import useSWR from "swr";
import DelData from "@/Components/DelData/DelData";

const SystemsPage = () => {
  const systems = GetData("systems")

  const { data, mutate } = useSWR(`/api/systems`)
  const deleteHandler = async (id) => {
    await DelData(id, "systems")
    mutate()
  }

  return (
    <Container>
      <div className={styles.systemsWrapper}>
        <h1 className="page-title">Systems</h1>
        <Link href="/form/system/new" className="create-link">Add New System</Link>
        <div className={styles.systemWrapper}>
          {
            systems ? (
              systems.length > 0 ? (
                systems.map(system => (
                  <SystemItem key={system._id} system={system} onDelete={deleteHandler} />
                ))
              ) : (
                <h2>No data</h2>
              )
            ) : (
              <Loading />
            )
          }
        </div>
      </div>
    </Container>

  )
}

export default SystemsPage