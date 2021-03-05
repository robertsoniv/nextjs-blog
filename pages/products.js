import { useCallback, useEffect, useState } from "react"
import Layout from "../components/layout"
import { useOrderCloud } from '../lib/ordercloud-provider'
import {useRouter} from 'next/router'
import { Me } from "ordercloud-javascript-sdk"
import Link from "next/link"
import utilStyles from "../styles/utils.module.css"

export default function Products() {
    const { query } = useRouter()
    const {isAuthenticated} = useOrderCloud()
    const [data, setData] = useState()

    const retrieveProducts = useCallback(async () => {
        try {
            const response = await Me.ListProducts()
            setData(response)
        } catch (ex) {
            console.error('[Products Error]:', JSON.stringify(ex, null, 2))
        }
    }, [query])

    useEffect(() => {
        if (isAuthenticated) {
            retrieveProducts()
        }
    }, [isAuthenticated])

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">{data ? (
            <ul className="grid grid-cols-3 gap-4 pt-12">
                {data.Items.map((p, i) => (
                    <li className="list-none p-4 bg-white shadow-md hover:shadow-xl hover:scale-105 transform transition-all" key={i}>
                        <Link href={`/products/${p.ID}`}>
                            <a className="text-red-500 hover:text-red-700">{p.Name}</a>
                        </Link>
                        <br/>
                        <small className={utilStyles.lightText}>{p.Description}</small>
                    </li>
                ))}
            </ul>
        ) : (
            <h1>Loading Products</h1>
        )}</div>
    )
}