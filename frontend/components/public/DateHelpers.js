export function formatDateCourt(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr)
        .toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
        .replace(".", "");
}

export function formatPlage(debut, fin) {
    return `${formatDateCourt(debut)} – ${formatDateCourt(fin)}`;
}