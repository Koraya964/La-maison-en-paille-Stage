import { useState, useRef } from 'react'

const INITIAL = {
    prenom: '', nom: '', email: '', telephone: '',
    adresse: '', city: '', cedex: '', message: '', siret: '',
    entreprise_name: '', entreprise_email: '', entreprise_telephone: '',
    entreprise_adress: '', entreprise_cedex: '', entreprise_city: ''
}

const REGEX = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    cedex: /^[0-9]{5}$/,
    siret: /^[0-9]{14}$/,
    nom: /^[a-zA-ZÀ-ÿ\s\-']{2,50}$/,
    texte: /^[a-zA-ZÀ-ÿ0-9\s\-',.#]{2,100}$/,
}

function sanitize(value) {
    return value.replace(/[<>"`;]/g, '').trim()
}

function validateTel(value) {
    return /^\d{10}$/.test(value.replace(/[\s\+\-\(\)\.]/g, ''))
}

export function useInscriptionForm(onSuccess) {
    const [form, setForm] = useState(INITIAL)
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState(null)
    const [isEntreprise, setIsEntreprise] = useState(false)

    // hCaptcha
    const captchaRef = useRef(null)
    const [hcaptchaToken, setHcaptchaToken] = useState(null)

    function handleChange(e) {
        const { name, value } = e.target
        if (value.length > 500) return
        setForm(p => ({ ...p, [name]: value }))
        if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
    }

    function validate() {
        const e = {}
        const f = Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, sanitize(String(v ?? ''))])
        )

        if (!REGEX.nom.test(f.prenom))
            e.prenom = 'Prénom invalide (2-50 caractères, lettres uniquement)'
        if (!REGEX.nom.test(f.nom))
            e.nom = 'Nom invalide (2-50 caractères, lettres uniquement)'
        if (!REGEX.email.test(f.email))
            e.email = 'Email invalide'
        if (!validateTel(f.telephone))
            e.telephone = 'Numéro invalide (10 chiffres requis)'
        if (!REGEX.texte.test(f.adresse) || f.adresse.length < 10)
            e.adresse = 'Adresse invalide (10 caractères min)'
        if (!REGEX.cedex.test(f.cedex))
            e.cedex = 'Code postal invalide (5 chiffres)'
        if (!REGEX.texte.test(f.city))
            e.city = 'Ville invalide'

        if (isEntreprise) {
            if (f.entreprise_name.trim().length < 3 || f.entreprise_name.trim().length > 100)
                e.entreprise_name = "Nom d'entreprise requis (3-100 caractères)"
            if (!REGEX.email.test(f.entreprise_email))
                e.entreprise_email = 'Email entreprise invalide'
            if (!validateTel(f.entreprise_telephone))
                e.entreprise_telephone = 'Numéro entreprise invalide (10 chiffres requis)'
            if (!REGEX.texte.test(f.entreprise_adress) || f.entreprise_adress.length < 10)
                e.entreprise_adress = 'Adresse entreprise invalide (10 caractères min)'
            if (!REGEX.cedex.test(f.entreprise_cedex))
                e.entreprise_cedex = 'Code postal entreprise invalide (5 chiffres)'
            if (!REGEX.texte.test(f.entreprise_city))
                e.entreprise_city = 'Ville entreprise invalide'
            if (!REGEX.siret.test(f.siret))
                e.siret = 'SIRET invalide (14 chiffres)'
        }

        if (f.message.length > 2000)
            e.message = '2000 caractères max'

        // Vérification captcha
        if (!hcaptchaToken)
            e.captcha = 'Veuillez compléter la vérification anti-bot'

        setErrors(e)
        return Object.keys(e).length === 0
    }

    async function submit(stageId) {
        if (!validate()) return
        setSubmitting(true)
        setServerError(null)
        try {
            const sanitizedForm = Object.fromEntries(
                Object.entries(form).map(([k, v]) => [k, sanitize(String(v ?? ''))])
            )
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inscriptions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    stage_id: stageId,
                    is_entreprise: isEntreprise,
                    hcaptchaToken,
                    ...sanitizedForm,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Erreur serveur')
            onSuccess(data.statut)
        } catch (err) {
            setServerError(err.message)
            // Reset le captcha en cas d'erreur
            captchaRef.current?.resetCaptcha()
            setHcaptchaToken(null)
        } finally {
            setSubmitting(false)
        }
    }

    return {
        form, errors, submitting, serverError,
        handleChange, submit,
        isEntreprise, setIsEntreprise,
        captchaRef, hcaptchaToken, setHcaptchaToken,
    }
}