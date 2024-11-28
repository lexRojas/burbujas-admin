'use client'

import { ChangeEvent, useState } from "react";
import { Label, HR, TextInput, Button } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import { verificarAcceso } from "../../lib/data";
import '@/app/(admin)/admin/page.css'

import Image from "next/image";

import denegado from '@/../public/images/denegado.png'

const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})



export default function Home() {

  const navegate = useRouter()
  const [accessDenegate, setAccessDenegate] = useState(false)
  const [userDontExist, setuserDontExist] = useState(false)

  const [dataForm, setDataForm] = useState({
    login: '',
    password: '',
  })


  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    setAccessDenegate(false)
    setuserDontExist(false)
    setDataForm({
      ...dataForm,
      [name]: e.target instanceof HTMLInputElement && type == 'checkbox'
        ? e.target.checked
        : value
    })
  }


  const verificarUsuario = async () => {

    const response = await fetch(`/api/usuarios/${dataForm.login}`);
    const user = await response.json();
    if (user) {

      verificarAcceso(dataForm.password, user.password).then((acceso) => {

        if (acceso) {
          navegate.push("/admin/menu")
        } else {
          setAccessDenegate(true)
        }
      })

    } else {

      setuserDontExist(true)

    }

  }




  return (


    <div className="flex flex-col w-full md:w-3/4 m-auto bg-white bg-opacity-60  rounded-md border-solid border-2 border-green-700 p-4">

      <div className="m-2 block ">
        <p className={`${roboto.className} p-1  text-xl text-center  text-blue-700 `}>INGRESE SUS DATOS DE USUARIO</p>
      </div>
      <HR className="m-1 bg-black" />
      <fieldset className="p-4">

        <div className="block mt-2">
          <Label htmlFor="login">Digite su login: </Label>
        </div>
        <TextInput
          onChange={handleChanges}
          value={dataForm.login}
          name="login"
          type="text"
          placeholder="Nombre de usuario"
          required
          color={userDontExist ? "failure" : ""}
          helperText={
            userDontExist ? (
              <>
                <span className="font-medium">Oops!</span> Username already taken!
              </>
            ) : undefined}
        />

        <div className="block mt-2">
          <Label htmlFor="password">Digite su clave de acceso: </Label>
        </div>
        <TextInput onChange={handleChanges} value={dataForm.password} name="password" placeholder="**********" required type="password" />



        <div className="flex justify-center p-4">
          <Button onClick={verificarUsuario}> Ingresar </Button>
        </div>
      </fieldset>


      {accessDenegate && <div className="flex flex-row p-3">
        <div>
          <Image src={denegado} alt="denegado" className="logo" />
        </div  >
        <div className="flex items-center translate-x-3  align-middle text-lg text-red-900 font-bold pl-3">
          <p>Usuario o clave incorrecta</p>
        </div>
      </div>
      }


    </div>
  );
}
