import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IForm {
  title: string;
  body: string;
}


const schema = yup.object({
  title: yup.string().required('Campo obrigatório'),
  body: yup.string().required('Campo obrigatório'),
})


export const NewNote = ({ handleNewNote }: any) => {
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async(data: any) => {
    handleNewNote(data);
    reset();
    setOpen(false);
  }
  
  return (
  <Dialog.Root open={open}>
    <Dialog.Trigger onClick={() => setOpen(true)}>
    <div className='outline-none bg-blue-500 text-white py-1 px-3 hover:bg-blue-600 transition-colors duration-200 text-sm rounded-md flex-row flex items-center'>
        <FiPlusCircle className='text-lg mr-2' />
        Nova nota
        </div>
    </Dialog.Trigger>
    <Dialog.Portal >
      <Dialog.Overlay className='bg-black fixed inset-0 opacity-50' />
      <Dialog.Content onInteractOutside={() => {setOpen(false); reset();}}  className='bg-white rounded-xl shadow-md fixed top-1/4 left-1/2 min-w-[650px] -translate-x-1/2' >
        <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
          <h1 className='font-bold text-xl'>Nova nota</h1>
          <div className='h-[1px] bg-slate-300 my-3'/>
            <p className='text-sm mb-1 text-red-400'>{errors.title?.message}</p>
            <input {...register('title') } placeholder='Título' className={`py-1 mb-2 rounded-xl ${errors.title?.message ? 'focus:border-red-500' : 'focus:border-blue-500'} px-5 min-w-full border-slate-400 border-2 outline-none`}/>
            <p className='text-sm mb-1 text-red-400'>{errors.body?.message}</p>
            <textarea {...register('body')} placeholder='Corpo' className={`resize-none min-h-[250px] py-1 mb-2 rounded-xl ${errors.body?.message ? 'focus:border-red-500' : 'focus:border-blue-500'} px-5 min-w-full border-slate-400 border-2 outline-none`}/>
            <button type='submit' className='bg-blue-500 disabled:bg-slate-400 text-white w-full rounded-xl hover:bg-blue-600 transition duration-200 p-2 text-sm'>
            Salvar
          </button>

        </form>
        <Dialog.Close asChild>
          </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}