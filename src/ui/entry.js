import Link from "next/link";

export default function Entry({entry}) {
    return (
        <div className="lg:flex">
            <img className="object-cover w-10 h-5 rounded" src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <Link href={`/entry/${entry._id}`} className="text-xl font-semibold text-gray-800 hover:underline">
                        {entry.title}
                    </Link>

                    <span className="text-sm text-gray-500">On: 20 October 2019</span>
                </div>
        </div>
    )
}
