'use client'

import React, { ChangeEvent, useState } from "react";
import { Label, HR, TextInput, Button, FlowbiteTextInputTheme } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import lupa from '@/../public/images/lupa.webp'
import { Datepicker, Table } from "flowbite-react";
import ModalClientes from "../../../../../components/ModalClientes";
import { ClienteConRelaciones } from "../../../lib/modelos";
import { Cliente } from "@prisma/client";
import { convertDateToDDMMYYYY } from "@/tools";
import { ToastContainer, toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})



export default function Home() {

  const navegate = useRouter();

  const [dataForm, setDataForm] = useState({
    cedula: '',
    nombre: '',
    fecha: '',
    puntosUsados: 0,
  })

  const [errorClienteNoValido, seterrorClienteNoValido] = useState(false);
  const [clienteValidado, setclienteValidado] = useState(false);
  const [montoIncorrecto, setmontoIncorrecto] = useState(false);
  const [clienteNoExiste, setclienteNoExiste] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comprasCliente, setcomprasCliente] = useState<ClienteConRelaciones | undefined>();
  const [fechaselected, SetFechaSelected] = useState<Date | null>(new Date())

  const [puntosDisponible, setPuntosDisponibles] = useState(0)
  const [puntosUsados, setPuntosUsados] = useState(0)
  const [puntosSaldo, setPuntosSaldo] = useState(0)


  const handleDateChanges = (date: Date | null) => {

    if (date) {
      SetFechaSelected(date)
    }
  }


  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    setclienteNoExiste(false)
    let dataNew = {
      ...dataForm,
      [name]: e.target instanceof HTMLInputElement && type == 'checkbox'
        ? e.target.checked
        : value
    }


    if (name == 'cedula') {
      dataNew = { ...dataNew, nombre: '' }
      setcomprasCliente(undefined)
      setclienteValidado(false)
    }

    if (name == "monto_puntos") {
      const monto_compra_num = Number(value).valueOf()

      if (monto_compra_num > 0) {
        setmontoIncorrecto(false)
        dataNew = { ...dataNew, puntosUsados: monto_compra_num }
      } else {
        setmontoIncorrecto(true)
      }

    }

    setDataForm(dataNew)




  }

  const guardarDatos = async () => {


    if (clienteValidado) {


      const puntos = {
        cedula: dataForm.cedula,
        fecha: fechaselected!,
        montoCompra: 0,
        puntosUsados: dataForm.puntosUsados,

      }


      if ((calcSaldoPuntos(comprasCliente!) - dataForm.puntosUsados) >= 0) {
        setmontoIncorrecto(false)

        try {

          const response = await fetch('/api/puntos_usados_clientes', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(puntos)
          })


          if (response.ok) {

            buscarCliente(dataForm.cedula)


            toast.success('Puntos incluidos ! ', {
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




      } else {
        setmontoIncorrecto(true)
      }


    } else {
      seterrorClienteNoValido(true)

    }

    if (dataForm.puntosUsados <= 0) {
      setmontoIncorrecto(true)
    }


  }


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      buscarCliente(dataForm.cedula)
    }
  }
  const my_input_theme: FlowbiteTextInputTheme =
  {
    "base": "flex",
    "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    "field": {
      "base": "relative w-full",
      "icon": {
        "base": "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
        "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
      },
      "rightIcon": {
        "base": "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
        "svg": "h-5 w-5 text-gray-500 dark:text-gray-400"
      },
      "input": {
        "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        "sizes": {
          "sm": "p-2 sm:text-xs",
          "md": "p-2.5 text-sm",
          "lg": "p-4 sm:text-base"
        },
        "colors": {
          "gray": "border-gray-300 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        },
        "withRightIcon": {
          "on": "pr-10",
          "off": ""
        },
        "withIcon": {
          "on": "pl-10",
          "off": ""
        },
        "withAddon": {
          "on": "rounded-r-lg",
          "off": "rounded-l-lg"
        },
        "withShadow": {
          "on": "shadow-sm dark:shadow-sm-light",
          "off": ""
        }
      }
    }
  }


  const handleClose = () => setOpenModal(false);
  const handleResolve = (clienteList: Cliente) => {

    dataForm.cedula = clienteList.cedula;
    dataForm.nombre = clienteList.nombre;

    setOpenModal(false)
    setclienteValidado(true)

    buscarCliente(clienteList.cedula)

  }



  const buscarCliente = async (cedula: string) => {


    try {

      const response = await fetch(`/api/clientes/${cedula}`)
      const cliente = await response.json()

      if (cliente) {
        dataForm.nombre = cliente.nombre;
        setcomprasCliente(cliente)
        setPuntosDisponibles(calcPuntosDisponibles(cliente))
        setPuntosUsados(calcPuntosUsados(cliente))
        setPuntosSaldo(calcSaldoPuntos(cliente))
        setclienteNoExiste(false)
        setclienteValidado(true)

      } else {
        setclienteNoExiste(true)
        setclienteValidado(false)
      }


    } catch (e) {
      console.log(e)

    }
  }

  const eliminarCompra = async (id: number) => {
    console.log(id)

    try {
      const response = await fetch(`/api/puntos_usados_clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }

      })

      if (response.ok) {
        console.log('elinado')
        buscarCliente(dataForm.cedula)
      }

    } catch (error) {

      console.log(error)


    }

  }

  const calcSaldoPuntos = (data: ClienteConRelaciones): number => {

    let puntosDisponibles = 0
    let puntosUsados = 0
    let saldo = 0

    puntosDisponibles = calcPuntosDisponibles(data)
    puntosUsados = calcPuntosUsados(data)

    saldo = puntosDisponibles - puntosUsados

    return saldo
  }

  const calcPuntosDisponibles = (data: ClienteConRelaciones): number => {

    let puntosDisponibles = 0

    data?.compras.map((compras) => {
      puntosDisponibles += compras.puntos
    })
    return puntosDisponibles
  }


  const calcPuntosUsados = (data: ClienteConRelaciones): number => {
    let puntosUsados = 0


    data?.puntosUsados.map((puntos) => {
      puntosUsados += puntos.puntosUsados
    })

    return puntosUsados
  }




  return (
    <div className="grid grid-rows-2 w-full m-0  md:grid-cols-[70%_30%] md:max-w-3xl md:m-auto md:gap-3">

      <div className="flex flex-col w-full  m-auto bg-red-300 bg-opacity-60  rounded-md border-solid border-2 border-green-700 p-4">

        <ToastContainer />

        <div className="m-2 block ">
          <p className={`${roboto.className} p-1  text-xl text-center  text-red-700 `}>REGISTRO DE CAMBIO DE PUNTOS</p>
        </div>
        <HR className="m-1 bg-black" />
        <div className="grid grid-row-[1fr_1fr] md:grid md:grid-cols-[max(15rem)_1fr] md:gap-3 ">
          <div className="mt-1 py-2">
            <Label htmlFor="cedula">Cedula: </Label>
            <div className="grid grid-cols-[80%_20%] ">
              <TextInput
                onChange={handleChanges}
                onKeyDown={handleKeyPress}
                value={dataForm.cedula}
                name="cedula"
                type="text"
                placeholder="Cedula"
                required
                theme={my_input_theme}
                color={clienteNoExiste ? "failure" : "success"}
              />
              <div className="flex justify-center p-3 h-[2.7rem]  border-green-700 border  align-middle bg-slate-300 rounded-r-md cursor-pointer hover:bg-cyan-600 "
                onClick={() => setOpenModal(true)}>
                <Image src={lupa} width={50} height={50} alt="lupa" />
              </div>
            </div>
            {clienteNoExiste ? <span className="mt-1  text-red-600 font-bold  text-xs">Cliente no existe!</span> : <></>}
          </div>
          <div className="mt-1 py-2">
            <Label htmlFor="nombre">Nombre Cliente: </Label>
            <TextInput value={dataForm.nombre} name="nombre" type="text" placeholder="Nombre de usuario" disabled />
          </div>
        </div>


        <div className="md:grid md:grid-cols-2 md:gap-3">
          <div className="block py-2 mt-1">
            <Label htmlFor="login">Fecha compra: </Label>
            <Datepicker
              value={fechaselected}
              onChange={handleDateChanges} />

          </div>
          <div className="block py-2 mt-1">
            <Label htmlFor="login">Puntos Usados: </Label>
            <TextInput
              onChange={handleChanges}
              value={dataForm.puntosUsados}
              name="puntosUsados"
              type="number"
              required
              color={montoIncorrecto ? "failure" : ""}
              helperText={montoIncorrecto ? <span className="mt-1  text-red-600 font-bold  text-xs">Monto supera los puntos disponibles</span> : <></>}
            />

          </div>

        </div>

        <div className="overflow-x-auto my-4 max-h-64 ">

          <Table hoverable>
            <Table.Head className="sticky top-0 z-10">
              <Table.HeadCell>Fecha</Table.HeadCell>
              <Table.HeadCell>Puntos</Table.HeadCell>
              <Table.HeadCell>Editar</Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              {comprasCliente && comprasCliente.puntosUsados.map((puntos) => (

                <Table.Row key={puntos.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{convertDateToDDMMYYYY(puntos.fecha)} </Table.Cell>
                  <Table.Cell>{puntos.puntosUsados.toString()} </Table.Cell>
                  <Table.Cell>
                    <p onClick={() => eliminarCompra(puntos.id)}
                      className=" border rounded-xl cursor-pointer bg-blue-900 hover:bg-red-600 text-white font-bold text-center ">Borrar</p>
                  </Table.Cell>
                </Table.Row>

              ))}


            </Table.Body>
          </Table>
        </div>

        {openModal && <ModalClientes
          onClose={handleClose}
          resolveSelection={handleResolve}
          show={openModal}
        />}

        <div className="grid grid-cols-2 p-4 gap-3">
          <Button onClick={guardarDatos}> Guardar </Button>
          <Button onClick={() => navegate.push("/admin/menu")}> Cancelar </Button>
        </div>

        {errorClienteNoValido &&

          <div className="p-2 border-2 rounded-md bg-red-300">

            <p className="font-bold">Cliente aun no ha sido validado por el sistema...!</p>

          </div>

        }
      </div>

      <div className="flex flex-col w-full  gap-5 m-auto bg-white bg-opacity-60 sm:w-full rounded-2xl border-solid border-2 border-green-700 p-4">
        <div>
          <p>Puntos Disponibles</p>
          <div className=" flex flex-col p-2 rounded-3xl border-4 border-blue-700 w-full text-center  text-4xl">
            <p className={roboto.className}>{puntosDisponible}</p>
          </div>
        </div>

        <div>
          <p>Puntos Canjeados </p>
          <div className=" flex flex-col p-2 rounded-3xl border-4 border-green-700 w-full text-center  text-4xl">
            <p className={roboto.className}>{puntosUsados}</p>
          </div>
        </div>

        <div>
          <p>SALDO: </p>
          <div className=" flex flex-col p-2 rounded-3xl border-4 border-yellow-500 w-full text-center  text-4xl">
            <p className={roboto.className}>{puntosSaldo}</p>
          </div>
        </div>

      </div>


    </div>



  );
}
