import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function getAllEntries() {
    const res = await fetch(`${process.env.API_URL}/entries`)
    return res.json()
}

export async function getAllPersonalEntries() {
    const res = await fetch(`${process.env.API_URL}/entries/personal`)
    return res.json()
}

export async function getAllGroupEntries() {
    const res = await fetch(`${process.env.API_URL}/entries/group`)
    return res.json()
}

export async function addEntry(entry) {
    return await fetch(`${process.env.API_URL}/entry`, {
        method: 'POST',
        body: entry
    })
}

export async function getEntryById(id) {
    const res = await fetch(`${process.env.API_URL}/entry/${id}`)
    return res.json()
}