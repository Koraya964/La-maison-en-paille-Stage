import { useState, useEffect } from 'react'

export function useStages(formationId) {
    const [stages, setStages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!formationId) { setStages([]); return }
        setLoading(true)
        fetch(`/api/stages?formation_id=${formationId}`)
            .then(r => r.json())
            .then(data => setStages(Array.isArray(data) ? data : []))
            .catch(() => setStages([]))
            .finally(() => setLoading(false))
    }, [formationId])

    return { stages, loading }
}