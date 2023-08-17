"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import useSWR from 'swr';

const GetData = (page) => {
    const session = useSession()
    const router = useRouter()
    const apiUrl = process.env.API_URL1
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, mutate, error, isLoading } = useSWR(`/api/${page}`, fetcher)

    useEffect(() => {
        if (session.status === "unauthenticated") {
            router?.push("/dashboard/login");
        }
    }, [session.status, router]);

    return data
}

export default GetData