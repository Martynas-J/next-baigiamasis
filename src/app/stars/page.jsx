"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import StarItem from "@/Components/StarItem/StarItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./stars.module.scss"

const StarsPage = () => {
  const [stars, setStars] = useState('');
  const apiUrl = process.env.API_URL1
  useEffect(() => {
    axios.get(`${apiUrl}/api/stars?_expand=system`)
      .then(res => setStars(res.data))
      .catch(res => toast.error(res.message))
  }, [])
  if (!stars) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${apiUrl}/api/stars/${id}`)
      .then(() => {
        toast.info("Star was deleted!")
        setStars(prevState => {
          let newState = [...prevState]
          return newState.filter(((star) => star._id !== id))
        })
      })
      .catch(err => {
        toast.error(err.message);
      });
  }
  return (
    <Container>
      <div className={styles.starsWrapper}>
        <h1 className="page-title">Stars</h1>
        <Link href="/form/star/new" className="create-link">Add New Star</Link>
        <div className={styles.starWrapper}>
          {
            stars.length > 0 ?
              stars.map(star => <StarItem key={star._id} star={star} onDelete={deleteHandler} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}

export default StarsPage