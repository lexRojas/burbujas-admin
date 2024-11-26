"use client";

import { Accordion, Button } from "flowbite-react";
import LogoMB from "../../../../components/LogoTextMB";
import { useRouter } from "next/navigation";


export default function Component() {

    const navegate = useRouter()


    return (
        <div className="container   w-full  px-3 md:p-4 md:w-2/3  bg-neutral-50">
            <h1 className="pb-3 font-bold text-center mx-auto text-xl text-blue-900">Reglamento del Programa de Lealtad de Puntos - <LogoMB /></h1>
            <p className="text-justify pb-3"> <strong>Bienvenido al programa de lealtad de <LogoMB />.</strong> A través de este reglamento, establecemos
                las normas y condiciones para que nuestros clientes disfruten de los beneficios de acumular y canjear puntos por sus compras en nuestra tienda.
            </p>
            <p className="text-justify pb-3">   Tal como una alcancía que llenas poco a poco con monedas, tus compras en <LogoMB /> van sumando puntos que puedes usar para obtener beneficios en futuras adquisiciones. Este reglamento asegura que el uso de estos puntos sea justo y transparente para todos.</p>

            <Accordion collapseAll >
                <Accordion.Panel>
                    <Accordion.Title
                        className="hover:bg-orange-300 bg-teal-600 text-white ">
                        1. Obtención de Puntos</Accordion.Title>
                    <Accordion.Content className="bg-white">
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify" >
                            1.1 Para participar en el programa, es indispensable estar inscrito en nuestra página web oficial. Tu cuenta será la &quot;Alcancía digital&quot; donde se acumulan los puntos.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            1.2 Obtendrás puntos al comprar artículos en nuestras tiendas. Cada compra genera puntos equivalentes al 5% del monto de la compra. Es decir, si compras un monto de ₡10,000 colones, recibirás 500 puntos.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">

                            1.3 <strong>Promociones especiales: </strong> <LogoMB /> se reserva el derecho de etiquetar productos específicos con un porcentaje mayor de puntos, como un &quot;doble de monedas&quot; en días especiales.
                        </p>

                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            1.4 <strong>Restricción en el canje:</strong> Si utilizas puntos para pagar una compra, no ganarás puntos adicionales por ese monto.Restricción en el canje: Si utilizas puntos para pagar una compra, no ganarás puntos adicionales por ese monto.
                        </p>



                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="hover:bg-orange-300 bg-yellow-100 text-black ">
                        2. Procedimiento para hacer efectivos los puntos</Accordion.Title>
                    <Accordion.Content className="bg-white">
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            2.1 <strong> Uso exclusivo de puntos:</strong> Los puntos no se convierten en dinero. Solo pueden usarse para adquirir productos en nuestras tiendas o en comercios aliados si anunciamos acuerdos en nuestras redes sociales.

                        </p>

                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            2.2 <strong>Identificación necesaria:</strong> Para pagar con puntos, debes presentar tu cédula de identidad o cualquier documento emitido por <LogoMB /> que te acredite como titular de los puntos.
                        </p>

                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            2.3 <strong>Verificación del vendedor:</strong>El personal verificará la existencia de puntos a tu favor en el sistema y confirmará tu identidad antes de completar la transacción.
                        </p>

                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            2.4 <strong>Descuento aplicado:</strong>El valor de los puntos utilizados se reflejará como un descuento directo en tu compra, como si aplicáramos &quot;un vale de ahorro invisible&quot;.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="hover:bg-orange-300 bg-pink-300 text-black ">
                        3. Donde NO Aplican los Puntos</Accordion.Title>
                    <Accordion.Content className="bg-white">
                        <div className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            <p>3.1 No puedes usar puntos para:</p>
                            <ul className="list-disc pl-10 text-sm">
                                <li>Comprar artículos rebajados.</li>
                                <li>Pagar apartados.</li>
                                <li>Cubrir servicios públicos o recargas telefónicas.</li>
                            </ul>

                        </div>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            3.2 En caso de discrepancias entre los registros de <LogoMB /> y lo presentado por el cliente, la empresa se reserva el derecho de rechazar el uso de puntos si se sospecha de una alteración.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="hover:bg-orange-300 bg-blue-500 text-white ">
                        4. Vigencia de los Puntos</Accordion.Title>
                    <Accordion.Content className="bg-white">
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            4.1 Los puntos vencen al año de adquiridos, pero <LogoMB /> podría establecer fechas de vigencia mayores o menores en el futuro, notificándolo oportunamente en nuestras redes sociales.

                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            4.2 <strong>Fin del programa:</strong> Si se decide finalizar el programa, se notificará con antelación, permitiendo el uso de puntos acumulados antes de la fecha de término.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            4.3 Si un cliente no utiliza sus puntos y el programa termina, se asumirá que ha renunciado voluntariamente a ellos.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title className="hover:bg-orange-300 bg-orange-400 text-black ">
                        5. Disposiciones Adicionales</Accordion.Title>
                    <Accordion.Content className="bg-white">
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            5.1 <strong>Transferencia de puntos:</strong> Los puntos son personales e intransferibles. Solo el titular puede usarlos.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            5.2 <strong>Cancelación de puntos:</strong> En caso de devoluciones de productos adquiridos con puntos, <LogoMB /> se reserva el derecho de revertir la cantidad de puntos correspondientes.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            5.3 <strong>Actualización del reglamento:</strong> Este reglamento puede modificarse según las necesidades del programa. Las actualizaciones serán notificadas a través de nuestros canales oficiales.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400 text-justify">
                            5.4 <strong>Fraude o mal uso:</strong> En caso de detectarse un intento de fraude o uso indebido del programa, los puntos del cliente podrán ser anulados sin previo aviso.
                        </p>
                        <p className="mb-5 text-gray-500 dark:text-gray-400 text-justify">
                            5.5 <strong>Casos de fuerza mayor:</strong> <LogoMB /> no será responsable por la suspensión del programa debido a circunstancias fuera de su control, como desastres naturales o cambios regulatorios.
                        </p>
                        <hr />
                        <p className="mt-5 text-gray-500 dark:text-gray-400 text-justify">
                            Al participar en este programa, aceptas las condiciones aquí descritas. Así como en un juego de mesa, estas reglas nos permiten disfrutar del programa de manera justa para todos. ¡Gracias por ser parte de <LogoMB />! 🎈
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <div className="flex justify-center py-1">
                <Button className="m-4 " onClick={() => navegate.push("/")}> Regresar</Button>
            </div>
        </div>
    );
}
