'use client'


import { ChangeEvent, useState } from 'react'
import { Cliente } from '@prisma/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

//ruta: /singup 

export default function Signup() {


    const router = useRouter();



    const showToastSuccess = (mensaje: string) => {
        toast.success(mensaje, {
            position: 'top-right',
            autoClose: 3000, // Tiempo de visibilidad en milisegundos (3 segundos)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showToastError = (mensaje: string) => {
        toast.error(mensaje, {
            position: 'top-right',
            autoClose: 3000, // Tiempo de visibilidad en milisegundos (3 segundos)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const save_data = async (nuevoCliente: Cliente) => {

        try {
            const response = await fetch('/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCliente),
            });

            if (response.ok) {
                showToastSuccess('Cliente incluido!')
                setFormData(blankForm)
            } else {

                if (response.status == 409) {

                    showToastError("Cliente ya existe! ")
                }

            }

        } catch (error) {
            console.log(error)
            showToastError('Cliente no fue incluido!')

        }
    }


    const blankForm = {
        cedula: '',
        nombre: '',
        direccion: '',
        correo: '',
        telefono: '',
    }

    const [formData, setFormData] = useState(blankForm);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const nuevoCliente: Cliente = {
            cedula: formData.cedula,
            nombre: formData.nombre,
            direccion: formData.direccion,
            correo: formData.correo,
            telefono: formData.telefono
        };


        save_data(nuevoCliente)
    }

    return (




        <div className='md:max-w-md w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>

            <ToastContainer />


            <div className='flex justify-center font-bold text-blue-800  text-xl border-b-2 pb-2 mb-4 border-b-blue-300'>
                <p>Registro de Cliente</p>

            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="  relative z-0 w-full mb-5 group">
                    <input
                        value={formData.cedula!}
                        onChange={(e) => handleChange(e)}
                        type="number"
                        name="cedula"
                        id="cedula"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cedula (Pin)</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={formData.nombre} onChange={(e) => handleChange(e)} type="text" name="nombre" id="nombre" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre Completo</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={formData.direccion} onChange={(e) => handleChange(e)} type="text" name="direccion" id="direccion" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirección</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={formData.correo} onChange={(e) => handleChange(e)} type="email" name="correo" id="correo" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electrónico</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={formData.telefono!} onChange={(e) => handleChange(e)} type="text" name="telefono" id="telefono" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Teléfono</label>
                </div>
                <div className='grid gap-5 md:grid-cols-2 md:gap-6'>
                    <button type="submit" className=" shadow shadow-neutral-800 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Suscribirme</button>


                    <button className=" shadow shadow-neutral-800 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => router.push('/')}>Regresar</button>

                </div>

            </form>

        </div>


    )


}