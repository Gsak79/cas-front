import Entry from "@/ui/entry";
import {getAllGroupEntries, getAllPersonalEntries} from "@/api/entryApi";

export default async function Page() {
    const personalEntries = await getAllPersonalEntries()
    const groupEntries = await getAllGroupEntries()

    return (
        <div>
            <section className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[800px] bg-white rounded-md shadow-md p-8">
                    <h2 className="text-3xl font-semibold text-gray-800 capitalize">Experiencias personales</h2>

                    <div className="grid gap-8 mt-8 md:mt-16 grid-cols-2">
                        {
                            personalEntries.map(entry => (
                                <Entry key={entry._id} entry={entry} />
                            ))
                        }
                    </div>
                    <hr className="my-8" />

                    <h2 className="text-3xl font-semibold text-gray-800 capitalize mt-10">Experiencias grupales</h2>

                    <div className="grid gap-8 mt-8 md:mt-16 grid-cols-2">
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