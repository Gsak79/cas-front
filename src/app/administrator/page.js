"use client";
import {deleteEntry, getAllEntries} from "@/api/entryApi";
import DashboardRow from "@/ui/dashboardRow";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Dashboard() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const entriesData = await getAllEntries();
            setEntries(entriesData);
        }
        fetchData();
    }, []);

    async function handleDelete(id) {
        await deleteEntry(id);
        const updatedEntries = await getAllEntries();
        setEntries(updatedEntries);
    }

    return (
        <div>
            <section className="flex items-center justify-center p-12">
                <div className="mx-auto w-full bg-white rounded-md shadow-md p-8">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-4">Entradas</h1>
                        <Link href={`administrator/create`} className="hover:shadow-form rounded-md bg-[#6A64F1] h-10 py-2 px-8 text-center text-base font-semibold text-white outline-none">Nueva entrada</Link>
                    </div>

                    <table className="border-collapse w-full">
                        <thead>
                        <tr>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300  hidden lg:table-cell">Título</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 w-1 hidden lg:table-cell">Experiencia</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 w-1/4 hidden lg:table-cell">Fecha</th>
                            <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 w-1 hidden lg:table-cell">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            entries.map(entry => (
                                <DashboardRow key={entry._id} entry={entry} handleDelete={handleDelete}></DashboardRow>
                            ))
                        }

                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )

}