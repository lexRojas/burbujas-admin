'use client'

import { ChangeEvent, useState } from "react";
import { Label, HR, TextInput, Button, Radio, Checkbox } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import { hashPassword } from "../../../lib/data";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})

interface Usuario {
  nombre: string,
  login: string,
  password: string,
  perfil: string,
  activo: boolean
}


export default function Home() {

  const navegate = useRouter();

  const blankForm = {
    nombre: '',
    login: '',
    password: '',
    perfil: 'administrador',
    activo: true

  }


  const [dataForm, setDataForm] = useState(blankForm)

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: e.target instanceof HTMLInputElement && type == 'checkbox'
        ? e.target.checked
        : value
    })
  }

  const encriptar = () => {


    hashPassword(dataForm.password).then((res) => {
      const passwordHashed = res
      if (passwordHashed!) {
        const usuario: Usuario = {

          nombre: dataForm.nombre,
          login: dataForm.login,
          password: passwordHashed,
          perfil: dataForm.perfil,
          activo: dataForm.activo
        }
        guardarDatos(usuario)

      }
    });

  }

  const guardarDatos = async (usuario: Usuario) => {
    try {

      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {

        showToastSucces('Usuario creado con exito! ')
        setDataForm(blankForm)

      } else {


        showToastError('3No fue posible crear el usuario, posiblemente esta ')


      }
    } catch (error) {


      showToastError('No fue posible crear el usuario, posiblemente esta duplicando el login, contacte el administrador')
      console.log('Error de red al enviar el formulario.', error);
    }
  }

  const showToastSucces = (mensaje: string) => {
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
      autoClose: 4000, // Tiempo de visibilidad en milisegundos (3 segundos)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    });
  };

  return (


    <div className="flex flex-col max-w-md m-auto bg-white bg-opacity-60 sm:w-full rounded-md border-solid border-2 border-green-700 ">

      {/* <ToastContainer toastClassName={() => 'flex align-middle bg-sky-500 text-2xl text-white'} /> */}
      <ToastContainer />

      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>INGRESE SUS DATOS DE USUARIO</p>
      </div>
      <HR className="m-1 bg-black" />



      <fieldset className="p-4">


        <div className="block mt-2">
          <Label htmlFor="nombre">Digite su nombre: </Label>
        </div>
        <TextInput onChange={handleChanges} value={dataForm.nombre} name="nombre" type="text" placeholder="Nombre de usuario" required />

        <div className="block mt-2">
          <Label htmlFor="login">Digite su login: </Label>
        </div>
        <TextInput onChange={handleChanges} value={dataForm.login} name="login" type="text" placeholder="Nombre de usuario" required />

        <div className="block mt-2">
          <Label htmlFor="password">Digite su clave de acceso: </Label>
        </div>
        <TextInput onChange={handleChanges} value={dataForm.password} name="password" placeholder="**********" required type="password" />

        <div className="block mt-2">
          <Label htmlFor="">Seleccione el perfil de usuario: </Label>
        </div>
        <div className="grid grid-cols-2 rounded-xl border p-2 mb-4 disabled">
          <div>
            <Radio id='administrador' name="perfil" value={dataForm.perfil = "administrador"} onChange={handleChanges} />
            <Label htmlFor="administrador" > Administrador</Label>
          </div>

          <div>
            <Radio id='vendedor' name="perfil" value={dataForm.perfil = "vendedor"} onChange={handleChanges} />
            <Label htmlFor="vendedor" > Vendedor</Label>
          </div>


        </div>

        <div className="block mt-2">

          <Checkbox id="activo" name="activo" checked={dataForm.activo} onChange={handleChanges} />
          <Label htmlFor="activo">  Activo </Label>
        </div>

        <div className="grid grid-cols-2 p-4 gap-3">
          <Button onClick={encriptar}> Guardar </Button>
          <Button onClick={() => navegate.push("/admin/menu")}> Cancelar </Button>
        </div>






      </fieldset>




    </div>



  );
}
