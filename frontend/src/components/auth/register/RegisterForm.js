'use client'

import Link from 'next/link'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export const RegisterForm = () => {
  return (
    <form  className="w-full px-6">
    <div className="flex-1 rounded-lg bg-transparent px-6 pb-4 pt-4">
      
      <div className="mt-2 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="text"
            name="Name"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            placeholder='Nombre de usuario'
            />
        </div>
        <div className="col-span-6 sm:col-span-3">
        
            <select
                name="Type_id"
                className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
                required
                
            >
                <option value="" disabled selected>
                Tipo de documento
                </option>
                <option value="tarjeta_de_identidad">Tarjeta de identidad</option>
                <option value="cedula_de_cuidadania">Cedula de cuidadania</option>
                <option value="tarjeta_de_extranjeria">Tarjeta de extranjeria</option>   
            </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="email"
            name="Email"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Nombre completo'
            />
        </div>

        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="text"
            name="Number_id"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Numero de documento'
            />
        </div>

        <div className="col-span-6 sm:col-span-3">
        
            <input
            type="number"
            name="Last_name"
            min={0}
            minLength={3}
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Apellidos'
            />
        </div>
        <div className="col-span-6 sm:col-span-3">
        <input
            type="email"
            name="email"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Correo electronico'
            />
        </div>
        
        <div className="col-span-6 sm:col-span-3">
            <input
            type="password"
            name="Password"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Contraseña'
            />
        </div>
        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="password"
            name="PasswordConfirmation"
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-black"
            required
            placeholder='Confirmar contraseña'
            />
        </div>
      
      
    </div>

    <div className="col-span-6 sm:col-span-3 flex justify-center items-center mt-6">
            
        <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            style={{ background: !'transparent'  }}
          />
    </div>

    <div className="col-span-6 sm:col-span-3 flex justify-center items-center mt-4">
            
        <button 
            type='submit'
            className='bg-black px-6 py-4 rounded-lg text-white font-semibold'
        >
            Registrarse
        </button>
    </div>

        

        <p className="text-center text-sm text-gray-600 mt-4">
          {"¿Ya tienes una cuenta?"}
          <Link href="/auth/login" className="font-semibold text-gray-800 ml-1">
          {" "}Inicia seccion.
          </Link>
        </p>
      
    </div>
    
  </form>
  )
}
