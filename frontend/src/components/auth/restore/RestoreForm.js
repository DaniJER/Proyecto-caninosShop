'use client'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

export const RestoreForm = () => {

    const {register,handleSubmit, formState:{errors,isSubmitting}, reset} = useForm()

    const onSubmit = async (data)=>{
        const {email} = data;
        try {
            // todo: enviar formulario al servidor 
            await new Promise(resolve => setTimeout(resolve, 2000)); // simulador
            // todo: manejar respuesta
            console.log(email)
            reset()
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className=" bg-white rounded-lg shadow-lg ">
        <div className='w-full lg:w-[400px] p-5'>
            <h2 className='text-center text-2xl font-bold'>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-5'>
                <input 
                    type='email'
                    {...register('email',{
                        required:'El correo es obligatorio',
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Correo electrónico no válido',
                        },
                    })}
                    placeholder='correo@gmail.com'
                    className='peer block w-full rounded-md bg-gray-100 py-[9px] px-2 text-base outline-2 border border-gray-400 placeholder:text-gray-500'
                />
                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                <button
                    type='submit'
                    className={clsx('bg-black text-white rounded-xl p-2 my-4 font-semibold',{
                        'cursor-not-allowed opacity-50':isSubmitting
                    })}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Restableciendo...' : 'Restablecer'}
                </button>
                
            </form>

            <span className='flex justify-between '>
                <Link href={'/auth/login'} className='text-blue-500 font-medium hover:text-blue-600 hover:font-semibold'>Iniciar sesión</Link>
                <Link href={'/auth/register'} className='text-blue-500 font-medium hover:text-blue-600 hover:font-semibold'>Registrarse</Link>
            </span>
         </div>
    </div>
  )
}
