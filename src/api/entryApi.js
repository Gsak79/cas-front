import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function getAllEntries() {
    const res = await fetch(`${process.env.API_URL}/entries`, {cache:"no-store"})
    return res.json()
}

export async function getAllPersonalEntries() {
    const res = await fetch(`${process.env.API_URL}/entries/personal`, {cache:"no-store"})
    return res.json()
}

export async function getAllGroupEntries() {
    const res = await fetch(`${process.env.API_URL}/entries/group`, {cache:"no-store"})
    return res.json()
}

export async function addEntry(entry) {
    return await fetch(`${process.env.API_URL}/entry`, {
        method: 'POST',
        body: entry
    })
}

export async function editEntry(id, entry) {
    return await fetch(`${process.env.API_URL}/entry/${id}`, {
        method: 'PUT',
        body: entry
    })

}

export async function getEntryById(id) {
    const res = await fetch(`${process.env.API_URL}/entry/${id}`)
    return res.json()
}

export async function deleteEntry(id) {
    return await fetch(`${process.env.API_URL}/entry/${id}`, {
        method: 'DELETE'
    })
}