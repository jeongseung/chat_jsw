import React, { useEffect, useState } from 'react'

export default function useTrendData (term, category) {
    const [rankings, setRankings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRankings = async () => {
            setLoading(true)
            try {
                const res = await fetch(
                    `http://localhost:8090/gloring/rankings?categoryName=${encodeURIComponent(category)}&period=${encodeURIComponent(term)}`
                )
                if (!res.ok) throw new Error('데이터 요청 실패')
                const data = await res.json()
                setRankings(data.rankings || [])
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchRankings();
    }, [term, category])
    return { rankings, loading, error }
}