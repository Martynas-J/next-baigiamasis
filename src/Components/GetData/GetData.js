"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import useSWR from 'swr';

const GetData = (page) => {
    const session = useSession()
    const router = useRouter()
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const shouldFetch = session.status === "authenticated" && !router.isFallback;


    useEffect(() => {
        if (session.status === "unauthenticated") {
            router?.push("/dashboard/login");   
        }
    }, [session.status, router]);
    const { data} = useSWR(shouldFetch ? `/api/${page}` : null, fetcher)
    return data 
}

export default GetData