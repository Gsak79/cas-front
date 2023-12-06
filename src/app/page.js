import Entry from "@/ui/entry";
import {getAllGroupEntries, getAllPersonalEntries} from "@/api/entryApi";

export default async function Page() {
    const personalEntries = await getAllPersonalEntries()
    const groupEntries = await getAllGroupEntries()

    return (
        <div>
            <header className="flex justify-center items-center w-full border bg-[#c66271] py-5">
                <h1 className="font-extrabold text-4xl">Mi Diario <span className="text-[#6d00a1]">CAS</span> <span className="font-light text-sm"> por Alvaro Sakuda</span></h1>
            </header>
            <section className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[800px] bg-white rounded-md shadow-md p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 capitalize">Experiencias personales</h2>

                    <div className="grid gap-8 mt-8 md:mt-16 grid-cols-1">
                        {
                            personalEntries.map(entry => (
                                <Entry key={entry._id} entry={entry} />
                            ))
                        }
                    </div>
                    <hr className="my-8" />

                    <h2 className="text-3xl font-semibold text-gray-800 capitalize mt-10">Experiencias grupales</h2>

                    <div className="grid gap-8 mt-8 md:mt-16 grid-cols-1">
                        {
                            groupEntries.map(entry => (
                                <Entry key={entry._id} entry={entry} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}