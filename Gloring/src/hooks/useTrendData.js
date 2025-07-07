import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useTrendData (term, category) {
    const [rankings, setRankings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true)
            setError(null);
            try {
                const res = await axios.get(
                    `http://43.201.67.86:8090/gloring/rankings`, {
                        params: {
                            categoryName: category,
                            period: term
                        }
                    }
                )
                setRankings(res.data.rankings || [])

            } catch (err) {
                console.error("데이터 요청 실패", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchRankings();
    }, [term, category])
    return { rankings, loading, error }
}