'use client'

import { ChangeEvent, useState } from "react";
import { Label, HR, TextInput, Button, Spinner } from "flowbite-react"
import { Roboto_Condensed } from "next/font/google";
import { useRouter } from "next/navigation";
import { verificarAcceso } from "../../lib/data";
import '@/app/(admin)/admin/page.css'


import Image from "next/image";

import denegado from '@/../public/images/denegado.webp'

const roboto = Roboto_Condensed({
  style: 'normal',
  subsets: ['latin'],
  weight: '500'

})



export default function Home() {


  const navegate = useRouter()
  const [accessDenegate, setAccessDenegate] = useState(false)
  const [userDontExist, setuserDontExist] = useState(false)
  const [loading, setLoading] = useState(false)


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

    try {
      setLoading(true)

      const response = await fetch(`/api/login/${dataForm.login}/${dataForm.password}`);
      const user = await response.json();
      if (user) {

        console.log('user')
        verificarAcceso(dataForm.password, user.password).then((acceso) => {

          console.log(acceso)

          if (acceso) {
            navegate.push("/admin/menu")
            setLoading(false)
          } else {

            setAccessDenegate(true)
          }
        })

      } else {
        console.log('no user')
        setLoading(false)
        setuserDontExist(true)

      }
    } catch (error) {

      setAccessDenegate(true)
      console.log(error)
    }

  }




  return (


    <div className="flex flex-col w-full md:w-1/4 m-auto bg-white bg-opacity-60  rounded-md border-solid border-2 border-green-700 p-4">

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
        <TextInput onChange={handleChanges} value={dataForm.password} name="password" placeholder="Digite su clave" required type="password" />



        <div className="flex justify-center p-4">
          <Button onClick={verificarUsuario}> Ingresar </Button>
        </div>
      </fieldset>

      {loading && <div className="text-center"> <Spinner size="xl" aria-label="Cargando..." color="purple" />  </div>}


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
