import Link from "next/link";
import moment from "moment";
import 'moment/locale/es';
moment.locale('es')

export default function Entry({entry}) {
    return (
        <div className="lg:flex">
            <img className="object-fill w-full h-56 rounded-lg lg:w-64" src={entry.images[0]?.url} alt="" />

                <div className="flex flex-col justify-between py-6 lg:mx-6">
                    <Link href={`/entry/${entry._id}`} className="text-xl font-semibold text-gray-800 hover:underline">
                        {entry.title}
                    </Link>

                    <span className="text-sm text-gray-500 capitalize">{`${moment(entry.date1).format('MMMM d, YYYY')} - ${moment(entry.date3).format('MMMM d, YYYY')}`}</span>
                </div>
        </div>
    )
}
