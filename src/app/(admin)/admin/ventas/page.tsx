'use client'

import React, { ChangeEvent, useState } from "react";
import { Label, HR, TextInput, Button, FlowbiteTextInputTheme } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import lupa from '@/../public/images/lupa.svg'
import { Datepicker, Table } from "flowbite-react";
import './ventas.css'
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
    monto_compra: 0,
    puntos: 0,
    vencidos: 0
  })

  const [errorClienteNoValido, seterrorClienteNoValido] = useState(false);
  const [clienteValidado, setclienteValidado] = useState(false);
  const [montoIncorrecto, setmontoIncorrecto] = useState(false);
  const [clienteNoExiste, setclienteNoExiste] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comprasCliente, setcomprasCliente] = useState<ClienteConRelaciones | undefined>();
  const [fechaselected, SetFechaSelected] = useState<Date | null>(new Date())


  const handleDateChanges = (date: Date | null) => {

    if (date) {

      // const formattedDate = `${date.getFullYear()}-${String(
      //   date.getMonth() + 1
      // ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

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

    if (name == "monto_compra") {
      const monto_compra_num = Number(value).valueOf()
      const porcentaje = 0.05
      const puntos_obtenidos = Math.floor(monto_compra_num * porcentaje)

      if (monto_compra_num > 0) {
        setmontoIncorrecto(false)
        dataNew = { ...dataNew, puntos: puntos_obtenidos }
      } else {
        setmontoIncorrecto(true)
      }

    }

    setDataForm(dataNew)




  }

  const guardarDatos = async () => {


    if (clienteValidado) {


      const compras = {
        cedula: dataForm.cedula,
        fecha: fechaselected!,
        montoCompra: dataForm.monto_compra,
        puntos: dataForm.puntos,
        vencido: false
      }

      console.log(compras)

      try {

        const response = await fetch('/api/compra_clientes', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(compras)
        })


        if (response.ok) {

          buscarCliente(dataForm.cedula)


          toast.success('Compra incluida ! ', {
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

        toast.error('Compra NO incluida ! ' + error, {
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
      seterrorClienteNoValido(true)

    }

    if (dataForm.monto_compra <= 0) {
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
      const response = await fetch(`/api/compra_clientes/${id}`, {
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



  return (


    <div className="flex flex-col max-w-5xl m-auto bg-white bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 p-4">

      <ToastContainer />

      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>REGISTRO DE VENTAS A CLIENTES</p>
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
            <div className="flex justify-center align-middle bg-slate-300 rounded-r-md cursor-pointer hover:bg-cyan-600 "
              onClick={() => setOpenModal(true)}>
              <Image src={lupa} width={20} alt="lupa" />
            </div>
          </div>
          {clienteNoExiste ? <span className="mt-1  text-red-600 font-bold  text-xs">Cliente no existe!</span> : <></>}
        </div>
        <div className="mt-1 py-2">
          <Label htmlFor="nombre">Nombre Cliente: </Label>
          <TextInput value={dataForm.nombre} name="nombre" type="text" placeholder="Nombre de usuario" disabled />
        </div>
      </div>


      <div className="layout md:grid md:grid-cols-[3fr_2fr_1fr_3fr] md:gap-3">
        <div className="fecha">
          <div className=" block mt-2">
            <Label htmlFor="login">Fecha compra: </Label>
          </div>
          <Datepicker
            value={fechaselected}
            onChange={handleDateChanges} />

        </div>
        <div className="monto">
          <div className="block mt-2">
            <Label htmlFor="login">Monto: </Label>
          </div>
          <TextInput
            onChange={handleChanges}
            value={dataForm.monto_compra}
            name="monto_compra"
            type="number"
            required
            color={montoIncorrecto ? "failure" : ""}
            helperText={montoIncorrecto ? <span className="mt-1  text-red-600 font-bold  text-xs">Monto incorrecto</span> : <></>}
          />

        </div>

        <div className="porcentaje">
          <div className="block mt-2">
            <Label htmlFor="porcentaje">% Puntos: </Label>
          </div>
          <TextInput
            onChange={handleChanges}
            value={5}
            name="porcentaje"
            type="number"
            placeholder="Nombre de usuario"
            required
            disabled />

        </div>
        <div className="puntos">
          <div className="block mt-2">
            <Label htmlFor="puntos">Puntos Obtenidos: </Label>
          </div>
          <TextInput onChange={handleChanges} value={dataForm.puntos} name="puntos" type="number" placeholder="Nombre de usuario" required disabled />
        </div>

      </div>

      <div className="overflow-x-auto my-4 max-h-64 ">

        <Table hoverable>
          <Table.Head className="sticky top-0 z-10">
            <Table.HeadCell>Fecha</Table.HeadCell>
            <Table.HeadCell>Monto Compra</Table.HeadCell>
            <Table.HeadCell>Puntos</Table.HeadCell>
            <Table.HeadCell>Vencidos</Table.HeadCell>
            <Table.HeadCell>Editar</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {comprasCliente && comprasCliente.compras.map((compras) => (

              <Table.Row key={compras.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{convertDateToDDMMYYYY(compras.fecha)} </Table.Cell>
                <Table.Cell>{compras.montoCompra.toString()} </Table.Cell>
                <Table.Cell>{compras.puntos.toString()} </Table.Cell>
                <Table.Cell className={compras.vencido ? 'text-red-700 font-bold animate-pulse' : 'text-green-700 font-bold '} >{compras.vencido ? 'Vencido!' : 'Vigentes'} </Table.Cell>
                <Table.Cell>
                  <p onClick={() => eliminarCompra(compras.id)}
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



  );
}
