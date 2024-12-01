import { ClienteConRelaciones } from "@/app/lib/modelos";
import { Button, Modal, Table, TextInput } from "flowbite-react"
import { ChangeEvent, useEffect, useState } from "react"
import check from '@/../public/images/check.webp'
import Image from "next/image";


type ModalClienteProps = {
    onClose: () => void;
    resolveSelection: (cliente: ClienteConRelaciones) => void;
    show: boolean;
};


function ModalClientes(props: ModalClienteProps) {

    const { onClose, resolveSelection, show } = props

    const [clientes, setClientes] = useState<ClienteConRelaciones[]>([])
    const [filter_clientes, setFilter_Clientes] = useState<ClienteConRelaciones[]>([])

    const [formData, setformData] = useState({
        cedula_filter: '',
        nombre_filter: ''
    })


    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updateFormData = { ...formData, [name]: value };

        setformData(updateFormData)


        const filter = clientes.filter((cliente) => {

            const cedula_validation = updateFormData.cedula_filter
                ? cliente.cedula
                    .toLowerCase()
                    .includes(formData.cedula_filter.toLowerCase())
                : true;

            const nombre_validation = updateFormData.nombre_filter
                ? cliente.nombre
                    .toLowerCase()
                    .includes(updateFormData.nombre_filter.toLowerCase())
                : true;

            return cedula_validation && nombre_validation;
        });

        setFilter_Clientes(filter);
    };

    useEffect(() => {

        const getData = async () => {
            const response = await fetch('/api/clientesList');
            const clientes = await response.json();



            setClientes(clientes)
            setFilter_Clientes(clientes)

        }

        getData();

        return () => {

        }
    }, [])

    if (!show) {
        return null;
    }

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>Lista de clientes</Modal.Header>
            <Modal.Body>

                <div className="flex py-3 gap-1">
                    <TextInput
                        className="w-[40%]"
                        name="cedula_filter"
                        type="text"
                        placeholder="Buscar x Cedula"
                        value={formData.cedula_filter}
                        onChange={handleChanges}
                    />

                    <TextInput
                        className="w-[60%]"
                        name="nombre_filter"
                        type="text"
                        placeholder="Buscar x Nombre"
                        value={formData.nombre_filter}
                        onChange={handleChanges}
                    />
                </div>


                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Cedula</Table.HeadCell>
                        <Table.HeadCell>Nombre</Table.HeadCell>
                        <Table.HeadCell>Seleccionar</Table.HeadCell>
                    </Table.Head>

                    <Table.Body className="divide-y">

                        {filter_clientes.map((cliente) => (
                            <Table.Row
                                key={cliente.cedula}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"

                            >
                                <Table.Cell>{cliente.cedula}</Table.Cell>
                                <Table.Cell>{cliente.nombre}</Table.Cell>
                                <Table.Cell onClick={() => resolveSelection(cliente)} className="flex justify-center cursor-pointer"> <Image src={check} alt="check" width={20} /> </Table.Cell>
                            </Table.Row>
                        ))}

                    </Table.Body>
                </Table>

            </Modal.Body>
            <Modal.Footer className="justify-center">
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
export default ModalClientes