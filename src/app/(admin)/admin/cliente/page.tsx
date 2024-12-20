'use client'

import React, { ChangeEvent, useEffect, useState } from "react";
import { Label, HR, TextInput, Spinner, Button } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import { Table } from "flowbite-react";
import './ventas.css'
import { typeSaldopuntos } from "../../../lib/modelos";
import { convertDateToDDMMYYYY } from "../../../../../scripts/tools";
import { ToastContainer } from "react-toastify";
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
  })


  const [comprasCliente, setcomprasCliente] = useState<typeSaldopuntos[] | undefined>();
  const [tableClientes, setTableCliente] = useState<typeSaldopuntos[] | undefined>();
  const [loading, setLoading] = useState(false)

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


  useEffect(() => {
    buscarClientes()

    return () => {
    }
  }, [])



  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {

      filtrarClientes()

    }
  }

  const filtrarClientes = () => {


    const clientesFiltrados = comprasCliente?.filter((cliente) => {

      let result: boolean = true

      if (dataForm.cedula.length > 0) {
        result = cliente.cedula.toLowerCase().includes(dataForm.cedula.toLowerCase())
      }

      if (dataForm.nombre.length > 0) {
        result = cliente.nombre.toLowerCase().includes(dataForm.nombre.toLowerCase()) && result
      }
      console.log(result)
      return result

    })

    setTableCliente(clientesFiltrados)

  }



  const buscarClientes = async () => {

    setLoading(true)
    try {

      const response = await fetch(`/api/saldo_puntos`)
      const cliente = await response.json()

      if (cliente) {
        setcomprasCliente(cliente)
        setTableCliente(cliente)

      }


    } catch (e) {
      console.log(e)

    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col max-w-6xl m-auto bg-white bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 p-4">
      <ToastContainer />
      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>LISTA DE CLIENTES</p>
      </div>
      <HR className="m-1 bg-black" />


      <div className="flex flex-row gap-3">

        <div className="basis-2/6 mt-1 py-2">
          <Label htmlFor="cedula">Cedula: </Label>
          <TextInput
            onChange={handleChanges}
            onKeyDown={handleKeyPress}
            value={dataForm.cedula}
            name="cedula"
            type="text"
            placeholder="Cedula"

          />
        </div>

        <div className="basis-4/6 mt-1 py-2">
          <Label htmlFor="nombre">Nombre Cliente: </Label>
          <TextInput

            onChange={handleChanges}
            onKeyDown={handleKeyPress}
            value={dataForm.nombre}
            name="nombre"
            type="text"
            placeholder="Nombre de usuario" />
        </div>

      </div>

      <div className="overflow-x-auto my-4 max-h-64  border">
        {loading && <div className="text-center"> <Spinner size="xl" aria-label="Cargando..." color="purple" />  </div>}
        <Table hoverable>
          <Table.Head className="sticky top-0 z-10">
            <Table.HeadCell>Cedula</Table.HeadCell>
            <Table.HeadCell>Nombre Completo</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Fecha de Ingreso</Table.HeadCell>
            <Table.HeadCell>Puntos </Table.HeadCell>
            <Table.HeadCell>Canjes</Table.HeadCell>
            <Table.HeadCell>Saldo</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {tableClientes && tableClientes.map((compras) => (

              <Table.Row key={compras.cedula} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{compras.cedula} </Table.Cell>
                <Table.Cell>{compras.nombre} </Table.Cell>
                <Table.Cell>{compras.telefono} </Table.Cell>
                <Table.Cell>{convertDateToDDMMYYYY(compras.fecha_ingreso)} </Table.Cell>
                <Table.Cell>{compras.total_puntos} </Table.Cell>
                <Table.Cell>{compras.total_puntos_usados} </Table.Cell>
                <Table.Cell>{compras.saldo} </Table.Cell>
                <Table.Cell> <Button size="xs">Borrar</Button> </Table.Cell>

              </Table.Row>

            ))}


          </Table.Body>
        </Table>
      </div>

    </div>



  );
}
