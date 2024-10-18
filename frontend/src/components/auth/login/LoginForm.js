'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import ReCAPTCHA from 'react-google-recaptcha';
import { LuUser2 } from "react-icons/lu";
import { TbLock } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export const LoginForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [captchaError, setCaptchaError] = useState('');
    const [loginError, setLoginError] = useState(''); 
    const recaptchaRef = useRef(null);

    const {register,handleSubmit, formState:{errors,isSubmitting}, reset} = useForm()

    const router = useRouter();

    const toggleShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

    const onSubmit = async (data) => {  
        const {email , password } = data;

        if (!captchaValue) {
          return setCaptchaError('Verifica que no eres un robot'); 
        }

        try {

          await new Promise(resolve => setTimeout(resolve, 2000)); // simulador

          // todo: pedir accedo al backend
          if (email !== 'prueba@gmail.com' || password !== '123456') {
            setLoginError('Correo y/o contraseña inválidos.');
            return;
          } 
  
          // todo: notificar al usuario el acceso toast
          toast.success('Inicio de sesion exitoso!');
          
          // todo: dependiendo de la respuesta cambiar de ruta
          router.replace('/') 
          
          // todo: resetear formulario
          reset()
          setCaptchaValue(null)
          setCaptchaError('')
          setLoginError('')
  
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
  
          console.log({ email, password, captchaValue });  
          
        } catch (error) {
          console.error(error)
        }
    }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-sm">
        
        <div className="flex items-center text-lg mb-5 ">
            <LuUser2 className='absolute ml-3' size={24}/>
            <input 
            
            type="email"
            {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'El correo electrónico no es válido'
                        }
            })}
            className={clsx("bg-gray-100 pl-10 py-2 rounded-xl w-full text-base",{
                "bg-red-200":errors.email
            })}
            placeholder="Correo electronico" 
                
            />
            
        </div>
        
        <div className="relative flex items-center text-lg ">
        <TbLock className="absolute ml-3" size={24} />
        <input
            className={clsx("bg-gray-100 pl-10 py-2 rounded-xl w-full text-base pr-12",{
              "bg-red-200":errors.password
            })}
            type={showPassword ? "text":"password"}
            {...register('password', {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'La contraseña debe tener al menos 6 caracteres'
                        }
            })}
            placeholder="Contraseña"
            autoComplete='off'
        />
        
            {   
                showPassword 
                ? <AiOutlineEyeInvisible size={24} className="absolute right-3 cursor-pointer" title='Ocultar' onClick={toggleShowPassword}/> 
                : <AiOutlineEye size={24} className="absolute right-3 cursor-pointer" title='Mostrar' onClick={toggleShowPassword}/>
            }
        </div>

        {loginError && (
                <p className="bg-white text-red-500 p-1 rounded-md text-center font-semibold text-sm mt-4">
                    {loginError}
                </p>
         )}

        <div className="flex justify-center flex-col items-center mt-4">
          <ReCAPTCHA
          ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(value)=>setCaptchaValue(value)}
          />
          {
            !captchaValue && captchaError && <p className=" bg-white text-red-500 p-1 rounded-md text-center font-semibold text-sm m-2">Por favor, verifica que no eres un robot.</p>
          }
          
        </div>

          <button
          type='submit'
          className={clsx('bg-black text-white rounded-xl p-2 my-3 font-semibold',{
            'opacity-50 cursor-not-allowed':isSubmitting
          })}
          disabled={isSubmitting}
          >
           {isSubmitting ? 'Iniciando...' : 'Iniciar sesion'}
          </button>

          <Link
          href="/auth/register" 
          className='bg-black text-white rounded-xl p-2 text-center font-semibold '
          >
          Registrarme
        </Link>
        <Link
          href="/auth/restore" 
          className=' text-blue-600 rounded-xl p-2 text-center font-medium '
          >
          ¿Olvidaste tu contraseña?
        </Link>

        <div className="flex items-center mb-5 mt-2">
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
