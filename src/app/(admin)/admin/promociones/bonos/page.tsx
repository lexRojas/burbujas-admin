'use client'

import { ChangeEvent, useEffect, useState } from "react";
import { HR, TextInput, Button, Spinner } from "flowbite-react";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { Datepicker, Table } from "flowbite-react";
import menu_bonos from '@/../public/images/bonos.webp'
import { Bonos } from "@prisma/client";
import { convertDateToDDMMYYYY } from "../../../../../../scripts/tools";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})

export default function Home() {

  const [bonos, setBonos] = useState<Bonos[] | null>();
  const [loading, setLoading] = useState(true)

  const [dataForm, setDataForm] = useState({
    descripcion: '',
    fecha_inicio: new Date(),
    fecha_final: new Date(),
    bono_puntos: 1,
    activo: true

  });

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;

    const dataNew = {
      ...dataForm,
      [name]: e.target instanceof HTMLInputElement && type == 'checkbox'
        ? e.target.checked
        : value
    }
    setDataForm(dataNew)
  }

  const handleDateChanges = (name: string, value: Date | null) => {


    const dataNew = {
      ...dataForm,
      [name]: value
    }



    setDataForm(dataNew)




  }



  const navegate = useRouter()


  useEffect(() => {
    getBonos()

    return () => {

    }
  }, [])

  const getBonos = async () => {
    try {

      setLoading(true)


      const response = await fetch(`/api/bonos`)
      const registros = await response.json()

      if (registros) {
        setBonos(registros)
        setLoading(false)

      } else {
        setBonos(undefined)
      }

    } catch (e) {
      console.log(e)
    }
  }


  const setIsChecked = (value: boolean, idx: number) => {
    if (bonos!) {
      const nuevoBonos: Bonos[] = bonos.map((bono) => {
        if (bono.id == idx) {
          bono.activo = value

          toggleBono(idx, value)


        }
        return (bono)
      })
      setBonos(nuevoBonos)
    }

  }


  const guardarDatos = async () => {

    try {


      const datos = {
        descripcion: dataForm.descripcion,
        fecha_inicio: dataForm.fecha_inicio,
        fecha_final: dataForm.fecha_final,
        bono_puntos: dataForm.bono_puntos,
        activo: true

      }

      console.log(JSON.stringify(datos))
      const response = await fetch('/api/bonos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      })


      if (response.ok) {
        getBonos()
        toast.success('Bono incluido ! ', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        });
      } else {

        console.log(response.statusText)


      }
    } catch (error) {

      toast.error('Puntos NO incluidos ! ' + error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });

    }



  }

  const eliminarBono = async (id: number) => {
    console.log(id)

    try {
      const response = await fetch(`/api/bonos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      if (response.ok) {
        console.log('elinado')
        getBonos()

      }

    } catch (error) {

      console.log(error)


    }

  }


  const toggleBono = async (id: number, activo: boolean) => {


    try {
      const response = await fetch(`/api/activar_bono/${id}/${activo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      if (response.ok) {

        toast.info(activo ? "Bono activado" : "Bono desactivado!!!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        });
      }

    } catch (error) {

      console.log(error)


    }

  }

  return (


    <div className="flex flex-col max-w-2xl  m-auto bg-white bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 ">
      <ToastContainer />

      <div className="m-2 flex justify-center items-center ">
        <Image src={menu_bonos} width={50} height={50} alt="usuarios" />
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>DEFINICION DE BONOS DE BIENVENIDA</p>
      </div>
      <HR className="m-1 bg-black" />
      <div className="flex flex-col p-2">


        <div className="block mt-2 md:mt-0 p-2">
          <label htmlFor="descripcion">Descripción</label>
          <TextInput type="text" name="descripcion" onChange={handleChanges} value={dataForm.descripcion} />
        </div>


        <div className="flex p-2 flex-col md:flex-row md:gap-2 ">
          <div className="block mt-2 md:mt-0">
            <label htmlFor="fecha_inicio">Fecha inicio</label>
            <Datepicker name="fecha_inicio" onChange={(value) => handleDateChanges('fecha_inicio', value)} value={dataForm.fecha_inicio} />
          </div>
          <div className="block mt-2 md:mt-0">
            <label htmlFor="fecha_final">Fecha final</label>
            <Datepicker name="fecha_final" onChange={(value) => handleDateChanges('fecha_final', value)} value={dataForm.fecha_final} />
          </div>
        </div>
        <div className="flex p-2 flex-col md:flex-row md:gap-2 ">

          <div className="block mt-2 md:mt-0">
            <label htmlFor="puntos">Cantidad Bono</label>
            <TextInput type="number" name="bono_puntos" onChange={handleChanges} value={dataForm.bono_puntos} min={1} max={10000} />
          </div>


          <div className="flex flex-row flex-grow gap-2 justify-evenly  items-end  mt-2 md:mt-0 ">
            <Button onClick={guardarDatos}> Guardar</Button>
            <Button onClick={() => navegate.push("/admin/promociones")}> Cancelar</Button>
          </div>


        </div>



        <HR className="m-1 bg-black" />
        <div className="overflow-x-auto my-4 max-h-64 border-2 ">
          <Table hoverable className="text-xs">
            <Table.Head className="sticky top-0 z-10">
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>Descripción</Table.HeadCell>
              <Table.HeadCell>F.Inicio</Table.HeadCell>
              <Table.HeadCell>F.Final</Table.HeadCell>
              <Table.HeadCell>Bono</Table.HeadCell>
              <Table.HeadCell>Activo</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {bonos && bonos.map((bono: Bonos) => (

                <Table.Row key={bono.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{bono.id} </Table.Cell>
                  <Table.Cell>{bono.descripcion} </Table.Cell>
                  <Table.Cell>{convertDateToDDMMYYYY(bono.fecha_inicio)} </Table.Cell>
                  <Table.Cell>{convertDateToDDMMYYYY(bono.fecha_inicio)} </Table.Cell>
                  <Table.Cell>{bono.bono_puntos} </Table.Cell>
                  <Table.Cell> <input type="checkbox" name="chk" id={`${bono.id}`} checked={bono.activo} onChange={(e) => setIsChecked(e.target.checked, bono.id)} /> </Table.Cell>
                  <Table.Cell>
                    <p onClick={() => eliminarBono(bono.id)} className=" border rounded-xl cursor-pointer bg-blue-900 hover:bg-red-600 text-white font-bold text-center p-1">Borrar</p>
                  </Table.Cell>
                </Table.Row>

              ))}


            </Table.Body>
          </Table>
          {loading &&
            <div className="flex justify-center items-center">
              <Spinner aria-label="Cargando...!" />
            </div>
          }



        </div>










      </div>



    </div>



  );
}
