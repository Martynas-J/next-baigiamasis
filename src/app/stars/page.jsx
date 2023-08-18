"use client"
import StarItem from "@/Components/StarItem/StarItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./stars.module.scss"
import DelData from "@/Components/DelData/DelData";
import GetData from "@/Components/GetData/GetData";
import useSWR from "swr";
import ListContainer from "@/Components/ListContainer/ListContainer";

const StarsPage = () => {
  const stars = GetData("stars?_expand=system")

  const { data, mutate } = useSWR(`/api/stars?_expand=system`)
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
        <ListContainer ListItem={StarItem} items={stars} onDelete={deleteHandler} />
        </div>
      </div>
    </Container>

  )
}

export default StarsPage