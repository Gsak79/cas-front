"use client";
import {addEntry, editEntry, getAllEntries, getEntryById} from "@/api/entryApi";
import Link from "next/link";
import UploadedImage from "@/ui/uploadedImage";
import {areAllFilesImages} from "@/utils/utils";
import {useEffect, useState} from "react";
import moment from "moment";

export default function EditEntry({params}) {

    useEffect(() => {
        async function fetchData() {
            const entriesData = await getEntryById(params.entryId);
            setTitle(entriesData.title);
            setMeta(entriesData.meta);
            setPermisos(entriesData.permisos);
            setPasos(entriesData.pasos);
            setDificultades(entriesData.dificultades);
            setRiesgo(entriesData.riesgos);
            setDescriptionEtapa1(entriesData.description1);
            setDescriptionEtapa2(entriesData.description2);
            setDescriptionEtapa3(entriesData.description3);
            setReflexionEtapa1(entriesData.reflexion1);
            setReflexionEtapa2(entriesData.reflexion2);
            setReflexionEtapa3(entriesData.reflexion3);
            setResultadoEtapa1(entriesData.resultado1);
            setResultadoEtapa2(entriesData.resultado2);
            setResultadoEtapa3(entriesData.resultado3);
            setDate1(entriesData.date1);
            setDate2(entriesData.date2);
            setDate3(entriesData.date3);
            setExperience(entriesData.experience);
            setSelectedImages(entriesData.images);
        }
        fetchData();
    }, []);

    const [selectedImages, setSelectedImages] = useState([]);
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [date3, setDate3] = useState('');
    const [title, setTitle] = useState('');
    const [experience, setExperience] = useState('Seleccionar');
    const [meta, setMeta] = useState('');
    const [permisos, setPermisos] = useState('');
    const [pasos, setPasos] = useState('');
    const [dificultades, setDificultades] = useState('');
    const [riesgo, setRiesgo] = useState('');
    const [descriptionEtapa1, setDescriptionEtapa1] = useState('');
    const [descriptionEtapa2, setDescriptionEtapa2] = useState('');
    const [descriptionEtapa3, setDescriptionEtapa3] = useState('');
    const [reflexionEtapa1, setReflexionEtapa1] = useState('');
    const [reflexionEtapa2, setReflexionEtapa2] = useState('');
    const [reflexionEtapa3, setReflexionEtapa3] = useState('');
    const [resultadoEtapa1, setResultadoEtapa1] = useState('');
    const [resultadoEtapa2, setResultadoEtapa2] = useState('');
    const [resultadoEtapa3, setResultadoEtapa3] = useState('');

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        if (!areAllFilesImages(event.dataTransfer.files)) {
            alert('Solo se permiten imágenes');
            return;
        }
        const images = [...selectedImages, ...event.dataTransfer.files]
        setSelectedImages(images);
    }
    const handleFileChange = (event) => {
        event.preventDefault();
        if (!areAllFilesImages(event.target.files)) {
            alert('Solo se permiten imágenes');
            return;
        }
        const images = [...selectedImages, ...event.target.files]
        setSelectedImages(images);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(experience === 'Seleccionar'){
            alert('Debes seleccionar el tipo de experiencia');
            return;
        }

        const formData = new FormData();
        formData.append('date1', date1);
        formData.append('date2', date2);
        formData.append('date3', date3);
        formData.append('title', title);
        formData.append('description1', descriptionEtapa1);
        formData.append('description2', descriptionEtapa2);
        formData.append('description3', descriptionEtapa3);
        formData.append('reflexion1', reflexionEtapa1);
        formData.append('reflexion2', reflexionEtapa2);
        formData.append('reflexion3', reflexionEtapa3);
        formData.append('resultado1', resultadoEtapa1);
        formData.append('resultado2', resultadoEtapa2);
        formData.append('resultado3', resultadoEtapa3);
        formData.append('meta', meta);
        formData.append('permisos', permisos);
        formData.append('pasos', pasos);
        formData.append('dificultades', dificultades);
        formData.append('riesgos', riesgo);
        formData.append('experience', experience);

        const uploadedImages = [];

        for (let index = 0; index < selectedImages.length; index++) {
            if (selectedImages[index].publicId) {
                uploadedImages.push(selectedImages[index])
            } else {
                formData.append(`image-${index + 1}`, selectedImages[index]);
            }
        }
        formData.append('uploadedImages', JSON.stringify(uploadedImages));

        const response = await editEntry(params.entryId, formData)

        if (response.ok) {
            alert('Entrada editada correctamente');
            window.location.href = '/administrator';
        } else {
            alert('Error al editar la entrada');
        }
    }

    function deleteImage(index, uploaded) {
        const images = [...selectedImages];
        images.splice(index, 1);
        setSelectedImages(images);
    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white bg-opacity-100 rounded-md shadow-md">

                <form
                    className="py-6 px-9"
                    onSubmit={handleSubmit}
                >
                    <div className="flex justify-between">
                        <p className="mb-5 block text-3xl font-semibold text-[#07074D]">
                            Editar entrada
                        </p>
                        <Link href={`/administrator`} className="hover:shadow-form rounded-md bg-[#6A64F1] h-10 py-2 px-8 text-center text-base font-semibold text-white outline-none">Regresar</Link>
                    </div>

                    <p className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Datos generales
                    </p>
                    <div className="mb-5">
                        <label
                            htmlFor="date"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Tipo de experiencia:
                        </label>
                        <select className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={(e) => setExperience(e.target.value)} value={experience}>
                            <option value="Seleccionar">Seleccionar</option>
                            <option value={"Experiencia personal"}>Experiencia personal</option>
                            <option value={"Experiencia grupal"}>Experiencia grupal</option>
                        </select>

                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Título:
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            required={true}
                            value={title}
                            placeholder="Ejemplo: Actividad de Matemáticas con niños de 6 grado"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="meta"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Meta
                        </label>
                        <textarea
                            name="meta"
                            id="meta"
                            rows={3}
                            required={true}
                            placeholder="Ejemplo: La meta de esta experiencia es..."
                            value={meta}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            onChange={(e) => setMeta(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="permisos"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Permisos
                        </label>
                        <textarea
                            rows={3}
                            name="permisos"
                            id="permisos"
                            required={true}
                            value={permisos}
                            placeholder="Ejemplo: Los permisos que se solicitarán son..."
                            onChange={(e) => setPermisos(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="pasos"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Pasos a seguir
                        </label>
                        <textarea
                            rows={5}
                            name="pasos"
                            id="pasos"
                            required={true}
                            value={pasos}
                            placeholder="Ejemplo: Los pasos a seguir son..."
                            onChange={(e) => setPasos(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="dificultades"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Dificultades
                        </label>
                        <textarea
                            rows={3}
                            name="dificultades"
                            id="dificultades"
                            required={true}
                            value={dificultades}
                            placeholder="Ejemplo: Las dificultades que se presentaron fueron..."
                            onChange={(e) => setDificultades(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="riesgo"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Riesgo y solución
                        </label>
                        <textarea
                            rows={3}
                            name="riesgo"
                            id="riesgo"
                            required={true}
                            value={riesgo}
                            placeholder="Ejemplo: El riesgo que se presentó fue... y la solución fue..."
                            onChange={(e) => setRiesgo(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <p className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Etapa 1 - Investigación
                    </p>
                    <div className="mb-5">
                        <label
                            htmlFor="date1"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Fecha:
                        </label>
                        <input
                            type="date"
                            name="date1"
                            id="date1"
                            required={true}
                            value={moment(date1).format('yyyy-MM-DD')}
                            onChange={(e) => setDate1(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description1"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Descripción:
                        </label>
                        <textarea
                            name="description1"
                            id="description1"
                            rows={20}
                            required={true}
                            placeholder="Ejemplo: En esta etapa se investigó..."
                            value={descriptionEtapa1}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            onChange={(e) => setDescriptionEtapa1(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="reflexion1"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Reflexión
                        </label>
                        <textarea
                            rows={20}
                            name="reflexion1"
                            id="reflexion1"
                            required={true}
                            value={reflexionEtapa1}
                            placeholder="Opinión personal sobre la etapa 1"
                            onChange={(e) => setReflexionEtapa1(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="resultado1"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Resultado de aprendizaje
                        </label>
                        <textarea
                            rows={10}
                            name="resultado1"
                            id="resultado1"
                            required={true}
                            value={resultadoEtapa1}
                            placeholder="Cuál fue el resultado de aprendizaje que se evidenció en esta etapa y de que manera se evidenció"
                            onChange={(e) => setResultadoEtapa1(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <p className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Etapa 2 -Planificación
                    </p>
                    <div className="mb-5">
                        <label
                            htmlFor="date2"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Fecha:
                        </label>
                        <input
                            type="date"
                            name="date2"
                            id="date2"
                            required={true}
                            value={moment(date2).format('yyyy-MM-DD')}
                            onChange={(e) => setDate2(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description2"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Descripción:
                        </label>
                        <textarea
                            name="description2"
                            id="description2"
                            rows={20}
                            required={true}
                            placeholder="Ejemplo: En esta etapa se investigó..."
                            value={descriptionEtapa2}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            onChange={(e) => setDescriptionEtapa2(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="reflexion2"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Reflexión
                        </label>
                        <textarea
                            rows={20}
                            name="reflexion2"
                            id="reflexion2"
                            required={true}
                            value={reflexionEtapa2}
                            placeholder="Opinión personal sobre la etapa"
                            onChange={(e) => setReflexionEtapa2(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="resultado2"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Resultado de aprendizaje
                        </label>
                        <textarea
                            rows={10}
                            name="resultado2"
                            id="resultado2"
                            required={true}
                            value={resultadoEtapa2}
                            placeholder="Cuál fue el resultado de aprendizaje que se evidenció en esta etapa y de que manera se evidenció"
                            onChange={(e) => setResultadoEtapa2(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <p className="mb-5 block text-xl font-semibold text-[#07074D]">
                        Etapa 3 - Acción
                    </p>
                    <div className="mb-5">
                        <label
                            htmlFor="date3"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Fecha:
                        </label>
                        <input
                            type="date"
                            name="date3"
                            id="date3"
                            required={true}
                            value={moment(date3).format('yyyy-MM-DD')}
                            onChange={(e) => setDate3(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description3"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Descripción:
                        </label>
                        <textarea
                            name="description3"
                            id="description3"
                            rows={20}
                            required={true}
                            placeholder="Ejemplo: En esta etapa se investigó..."
                            value={descriptionEtapa3}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            onChange={(e) => setDescriptionEtapa3(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="reflexion3"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Reflexión
                        </label>
                        <textarea
                            rows={20}
                            name="reflexion3"
                            id="reflexion3"
                            required={true}
                            value={reflexionEtapa3}
                            placeholder="Opinión personal sobre la etapa"
                            onChange={(e) => setReflexionEtapa3(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="resultado3"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Resultado de aprendizaje
                        </label>
                        <textarea
                            rows={10}
                            name="resultado3"
                            id="resultado3"
                            required={true}
                            value={resultadoEtapa3}
                            placeholder="Cuál fue el resultado de aprendizaje que se evidenció en esta etapa y de que manera se evidenció"
                            onChange={(e) => setResultadoEtapa3(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-6 pt-4">
                        <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                            Subir imágenes
                        </label>

                        <div className="mb-8">
                            <input type="file" name="file" id="file" className="sr-only" onChange={handleFileChange} accept="image/*" multiple/>
                            <label
                                htmlFor="file"
                                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                                onDrop={handleDrop} onDragOver={handleDragOver}
                            >
                                <div>
              <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                Coloca tu imagen aquí
              </span>
                                    <span className="mb-2 block text-base font-medium text-[#6B7280]">
                O
              </span>
                                    <span
                                        className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]"
                                    >
                Abrir explorador de archivos
              </span>
                                </div>
                            </label>
                        </div>


                        <div className="flex flex-col gap-2">
                            {
                                selectedImages.map((image, index) => (
                                    <UploadedImage key={index} image={image} index={index} deleteImage={deleteImage} />
                                ))
                            }
                        </div>
                    </div>

                    <div>
                        <button
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Editar entrada
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}