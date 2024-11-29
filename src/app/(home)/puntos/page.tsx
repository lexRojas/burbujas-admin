"use client";

import { Button, Card, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import BubbleAnimation from "../../../../components/BurbujaPuntos";
import { useRouter } from "next/navigation";
import { typeSaldopuntos } from "@/app/lib/modelos";



export default function Component() {
    const [openModal, setOpenModal] = useState(true);
    const [verAnimacion, setVerAnimacion] = useState(false);
    const [verCaraTriste, setCaraTriste] = useState(false);

    const [cedula, setCedula] = useState('');
    const [puntos, setPuntos] = useState(0);


    const navegate = useRouter()

    useEffect(() => {
        const storedCedula = localStorage.getItem('cedula');
        if (storedCedula) {
            setCedula(storedCedula);
        }
    }, []);


    function onCloseModal() {
        setOpenModal(false);
        setCedula('');
    }

    const processUserData = async () => {

        console.log('hola desde process ..')

        setOpenModal(false);

        const response = await fetch(`/api/saldo_puntos/${cedula}`)

        if (response.ok) {
            const misaldo: typeSaldopuntos = await response.json()

            localStorage.setItem('cedula', cedula);

            if (misaldo) {

                setPuntos(misaldo.saldo)
                setVerAnimacion(true)
                setCaraTriste(false)
            } else {
                console.log('no hay puntos')

                setPuntos(0)
                setVerAnimacion(false)
                setCaraTriste(true)
            }

        } else {


            console.log('no hay puntos')

            setPuntos(0)
            setVerAnimacion(false)
            setCaraTriste(true)

        }



    }

    const VolverConsultar = () => {
        setVerAnimacion(false)
        setCaraTriste(false)
        setOpenModal(true)
    }


    return (
        <>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />

                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Digite su cédula o pin</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="cedula" value="Cédula: (pin)" />
                            </div>
                            <TextInput
                                id="cedula"
                                placeholder="109990999"
                                value={cedula}
                                onChange={(event) => setCedula(event.target.value)}
                                required
                                type="number"
                            />
                        </div>
                        <div >
                            <Button
                                className="w-full"
                                onClick={() => processUserData()}
                            >Aceptar</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Card className=" w-72 h-auto  max-w-sm">

                {verAnimacion && <BubbleAnimation puntos={puntos} />}

                {verCaraTriste && <>
                    <p className="mx-auto font-bold text-red-600  pb-3  animate-bounce ">No tienes puntos aun!</p>
                    <video loop autoPlay>
                        <source src='/media/emojis_llorando.mp4' type="video/mp4" />
                    </video>
                </>}

                <Button className="" onClick={() => VolverConsultar()}> Volver a Consultar</Button>
                <Button className="" onClick={() => navegate.push("/")}> Regresar</Button>
            </Card>










        </>
    );
}
