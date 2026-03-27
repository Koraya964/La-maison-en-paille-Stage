import { useState } from 'react'

const INITIAL = { prenom: '', nom: '', email: '', telephone: '', message: '' }

export function useInscriptionForm(onSuccess) {
    const [form, setForm] = useState(INITIAL)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target
        setForm(p => ({ ...p, [name]: value }))
        if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
    }

    function validate() {
        const e = {}
        if (!form.prenom.trim() || form.prenom.trim().length < 2) e.prenom = 'Prénom requis'
        if (!form.nom.trim() || form.nom.trim().length < 2) e.nom = 'Nom requis'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
        if (form.telephone && !/^[\d\s\+\-\(\)\.]{6,20}$/.test(form.telephone)) e.telephone = 'Numéro invalide'
        if (form.message.length > 2000) e.message = '2000 caractères max'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    async function submit(stageId) {
        if (!validate()) return
        setSubmitting(true)
        setServerError(null)
        try {
            const res = await fetch('/api/inscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage_id: stageId, ...form }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Erreur serveur')
            onSuccess()
        } catch (err) {
            setServerError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return { form, errors, submitting, serverError, handleChange, submit }
}