'use client';
import Link from 'next/link';
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import ReCAPTCHA from 'react-google-recaptcha';
import { LuUser2 } from "react-icons/lu";
import { TbLock } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';


export const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

  return (
    
    <form  className="flex flex-col max-w-sm">
        
        <div className="flex items-center text-lg mb-5 ">
            <LuUser2 className='absolute ml-3' size={24}/>
            <input 
            className="bg-gray-100 pl-10 py-2 rounded-xl w-full text-base "
            type="email"
            name='email'
            placeholder="Usuario" 
                
            />
        </div>


        <div className="relative flex items-center text-lg mb-5">
        <TbLock className="absolute ml-3" size={24} />
        <input
            className="bg-gray-100 pl-10 py-2 rounded-xl w-full text-base pr-12"
            type={showPassword ? "text":"password"}
            name="password"
            placeholder="Contraseña"
            autoComplete='off'
        />
        
            {   
                showPassword 
                ? <AiOutlineEyeInvisible size={24} className="absolute right-3 cursor-pointer" title='Ocultar' onClick={toggleShowPassword}/> 
                : <AiOutlineEye size={24} className="absolute right-3 cursor-pointer" title='Mostrar' onClick={toggleShowPassword}/>
            }
        </div>
          
          <button
          type='submit'
          className='bg-black text-white rounded-xl p-2 mb-3 font-semibold'
          >
           Iniciar sesion
          </button>

          <Link
          href="/auth/register" 
          className='bg-black text-white rounded-xl p-2 text-center font-semibold '
          >
          Registrarme
        </Link>
        <Link
          href="#" 
          className=' text-blue-600 rounded-xl p-2 text-center font-medium '
          >
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="flex justify-center my-5">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            style={{ background: !'transparent'  }}
          />
        </div>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-2 text-gray-800">Iniciar sesion con</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className='flex justify-center items-center gap-2 border border-black rounded-lg mx-16 p-2 mb-2'>
            <button className='btn btn-danger btn-block' >
                <FcGoogle size={30} className='bg-white rounded-full'/>
            </button>

            <button className='btn btn-danger btn-block' >
                <BsFacebook color='#0866FF' size={30} className='bg-white rounded-full'/>
            </button>

        </div>

        <p className='max-w-96 text-center'>
            Al hacer clic en cualquier de los botones de inicio de sesión
            acepta los términos y condiciones de la política de privacidad.
        </p>

      </form>
  )
}
