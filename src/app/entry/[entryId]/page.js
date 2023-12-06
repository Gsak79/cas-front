import {getEntryById} from "@/api/entryApi";
import moment from "moment";
import 'moment/locale/es';
import Link from "next/link";
moment.locale('es')

export default async function EntryDetails({ params }) {
    const entry = await getEntryById(params.entryId)

    return (
        <div>
            <section className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[800px] bg-white rounded-md shadow-md p-8">
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-semibold text-gray-800">{`${entry.experience}: ${entry.title}`}</h2>
                        <Link href={`/`} className="hover:shadow-form rounded-md bg-[#6A64F1] h-10 py-2 px-8 text-center text-base font-semibold text-white outline-none">Regresar</Link>
                    </div>

                    <div className="mt-2 md:mt-4">
                        <h3 className="text-xl">Meta:</h3>
                        <p className="text-gray-600 text-justify">{entry.meta}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Permisos:</h3>
                        <p className="text-gray-600 text-justify">{entry.permisos}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Pasos a seguir:</h3>
                        <p className="text-gray-600 text-justify">{entry.pasos}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Dificultades:</h3>
                        <p className="text-gray-600 text-justify">{entry.dificultades}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Riesgo y solución:</h3>
                        <p className="text-gray-600 text-justify">{entry.riesgos}</p>
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-2xl mt-4 font-medium text-gray-800 capitalize">Etapa 1 - Investigación - {moment(entry.date1).format('MMMM d, YYYY')}</h3>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Descripción:</h3>
                        <p className="text-gray-600 text-justify">{entry.description1}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Reflexión:</h3>
                        <p className="text-gray-600 text-justify">{entry.reflexion1}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Resultado de aprendizaje:</h3>
                        <p className="text-gray-600 text-justify">{entry.resultado1}</p>
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-2xl mt-4 font-medium text-gray-800 capitalize">Etapa 2 - Planificación - {moment(entry.date2).format('MMMM d, YYYY')}</h3>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Descripción:</h3>
                        <p className="text-gray-600 text-justify">{entry.description2}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Reflexión:</h3>
                        <p className="text-gray-600 text-justify">{entry.reflexion2}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Resultado de aprendizaje:</h3>
                        <p className="text-gray-600 text-justify">{entry.resultado2}</p>
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-2xl mt-4 font-medium text-gray-800 capitalize">Etapa 3 - Acción - {moment(entry.date3).format('MMMM d, YYYY')}</h3>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Descripción:</h3>
                        <p className="text-gray-600 text-justify">{entry.description3}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Reflexión:</h3>
                        <p className="text-gray-600 text-justify">{entry.reflexion3}</p>
                    </div>
                    <div className="mt-4 md:mt-8">
                        <h3 className="text-xl">Resultado de aprendizaje:</h3>
                        <p className="text-gray-600 text-justify">{entry.resultado3}</p>
                    </div>
                    <hr className="my-8" />
                    <h3 className="text-2xl mt-4 font-medium text-gray-800">Evidencia</h3>
                    <div className="flex flex-col gap-8 justify-center items-center mt-4">
                        {entry.images.map((image, index) => (
                            <img
                                key={index}
                                className="object-contain w-full h-72 rounded-lg"
                                src={image.url}
                                alt=""
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )

}