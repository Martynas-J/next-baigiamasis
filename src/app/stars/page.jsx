"use client"
import StarItem from "@/Components/StarItem/StarItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./stars.module.scss"
import useSWR from "swr";
import DelData from "@/Components/DelData/DelData";
import GetData from "@/Components/GetData/GetData";
import Loading from "../loading";


const StarsPage = () => {

  const stars = GetData("stars")
  const { data, mutate } = useSWR(`/api/stars`)
  const deleteHandler = async (id) => {
    await DelData(id, "stars")
    mutate()
  }
  return (
    <Container>
      <div className={styles.starsWrapper}>
        <h1 className="page-title">Stars</h1>
        <Link href="/form/star/new" className="create-link">Add New Star</Link>
        <div className={styles.starWrapper}>
        {
            stars ? (
              stars.length > 0 ? (
                stars.map(star => (
                  <StarItem key={star._id} star={star} onDelete={deleteHandler} />
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

export default StarsPage