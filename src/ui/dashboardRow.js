import moment from "moment/moment";
import Link from "next/link";

export default function DashboardRow({entry, handleDelete}) {

    function onDelete(event) {
        event.preventDefault();
        handleDelete(entry._id);
    }

    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3  text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Título</span>
                <Link href={`/entry/${entry._id}`} className="text-blue-400 hover:text-blue-600 underline cursor-pointer">{entry.title}</Link>
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border capitalize border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Experiencia</span>
                {entry && entry.experience ? entry.experience.split(' ')[1] : ''}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Fecha</span>
                {`${moment(entry.date1).format('d/M/YYYY')} - ${moment(entry.date3).format('d/M/YYYY')}`}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Acciones</span>
                <Link href={`/administrator/edit/${entry._id}`} className="text-blue-400 hover:text-blue-600 underline cursor-pointer">Editar</Link>
                <a onClick={onDelete} className="text-blue-400 hover:text-blue-600 underline pl-6 cursor-pointer">Eliminar</a>
            </td>
        </tr>
    )
}