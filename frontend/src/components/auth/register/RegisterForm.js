'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export const RegisterForm = () => {

    const {register,handleSubmit, formState:{errors,isSubmitting}, reset} = useForm()
    const [passwordError, setPasswordError] = useState('')

    const onSubmit = async (data)=>{
      
        const {
            name,
            lastName,
            typeId,
            numberId,
            phone,
            email,
            password,
            passwordConfirmation

        } = data;

        if (password !== passwordConfirmation){
            return setPasswordError('Las contraseñas no coinciden')
        }

        console.log({...data})

        // todo: enviar formulario al backend

        // todo: respuesta positiva del backend redirigir al inicio mostra notificacion registro exitoso

        // todo: respuestas negativas del backend manejarlas

        alert('se registro exitosamente') // todo: cambiar por notificacion (toast)
        setPasswordError('');
        reset();
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6" >
    <div className="flex-1 rounded-lg bg-transparent px-6 pb-4 pt-4">
      
      <div className="mt-2 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
            
            <input
                type="text"
                {...register('name',{
                    required:'El nombre es obligatorio',
                    minLength: { value: 3, message: 'Debe tener al menos 2 caracteres' },

                })}
                className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                    "border border-red-300 bg-red-100":errors.name
                })}
                placeholder='Nombres'

            />
            {errors.name && <p className="text-red-600 text-xs mt-1 ml-1">{errors.name.message}</p>}
        </div>
        <div className="col-span-6 sm:col-span-3">
        <input
            type="text"
            {...register('lastName',{
                required:'El apellido es obligatorio',
                minLength: { value: 3, message: 'Debe tener al menos 2 caracteres' },
            })}
            className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100":errors.lastName
            })}
            placeholder='Apellidos'
            />
            {errors.lastName && <p className="text-red-600 text-xs mt-1 ml-1">{errors.lastName.message}</p>}
        </div>

        <div className="col-span-6 sm:col-span-3">
            
        <select
                {...register('typeId',{
                    required:true,
                })}
                className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100":errors.typeId
                })}
                defaultValue={'cedula_de_cuidadania'}
                
            >
                <option value="cedula_de_cuidadania">Cedula de cuidadania</option>
                <option value="tarjeta_de_identidad">Tarjeta de identidad</option>
                <option value="cedula_de_extranjeria">Cedula de extranjeria</option>   
            </select>
        </div>

        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="number"
            {...register('numberId',{
                required:'El documento es obligatorio',
            })}
            className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100":errors.numberId
            })}
            placeholder='Numero de documento'
            />
            {errors.numberId && <p className="text-red-600 text-xs mt-1 ml-1">{errors.numberId.message}</p>}
        </div>

        <div className="col-span-6 sm:col-span-3">
        
            <input
            type="tel"
            {...register('phone',{
                required:'El telefono es obligatorio',
            })}
            className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100":errors.numberId
            })}
            placeholder='Telefono o celular'
            />
            {errors.phone && <p className="text-red-600 text-xs mt-1 ml-1">{errors.phone.message}</p>}
        </div>
        <div className="col-span-6 sm:col-span-3">
        <input
            type="email"
            {...register('email',{
                required:'El correo es obligatorio',

            })}
            className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100":errors.email
            })}
            placeholder='Correo electronico'
            />
            {errors.email && <p className="text-red-600 text-xs mt-1 ml-1">{errors.email.message}</p>}
        </div>
        
        <div className="col-span-6 sm:col-span-3">
            <input
            type="password"
            {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
            className="peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500"
            placeholder='Contraseña'
            />
            {errors.password && <p className="text-red-600 text-xs mt-1 ml-1">{errors.password.message}</p>}
        </div>
        <div className="col-span-6 sm:col-span-3">
            
            <input
            type="password"
            {...register('passwordConfirmation', { required: 'Debes confirmar tu contraseña' })}
            className={clsx("peer block w-full rounded-md bg-gray-100 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500",{
                "border border-red-300 bg-red-100": passwordError
            })}
            placeholder='Confirmar contraseña'
            />
            {errors.passwordConfirmation && <p className="text-red-600 text-xs mt-1 ml-1">{errors.passwordConfirmation.message}</p>}
        </div>

        {passwordError && (
            <div className="col-span-6">
              <p className="text-red-600 text-sm ">{passwordError}</p>
            </div>
        )}
      
      
    </div>

    <div className="col-span-6 sm:col-span-3 flex justify-center items-center mt-4">
            
        <button 
            type='submit'
            disabled={isSubmitting}
            className={clsx('bg-black px-6 py-4 rounded-lg text-white font-semibold',{
                'opacity-50 cursor-not-allowed':isSubmitting
            })}
        >
            {isSubmitting ? 'Registrando...' : 'Registrar'}
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
