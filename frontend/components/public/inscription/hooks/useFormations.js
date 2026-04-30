import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export function useFormations() {
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFormations() {
            try {
                const res = await fetch(`${API}/api/stages/formations`);
                if (res.ok) {
                    const data = await res.json();
                    setFormations(data);
                }
            } catch {
                // silencieux
            } finally {
                setLoading(false);
            }
        }
        fetchFormations();
    }, []);

    return { formations, loading };
}