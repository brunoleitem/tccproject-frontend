import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
interface IForm {
  name: string;
}

type CreateComponentProps = {
  handleCreate: any;
}


const schema = yup.object({
  name: yup.string().required('Você precisa informar seu email'),
})


export const CreateComponent: React.FC<CreateComponentProps> = ({ handleCreate }) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  
  const { register, handleSubmit } = useForm<IForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async(data: any) => {
    setOpen(false);
    handleCreate(data);
  }

  return (
    <Dialog.Root open={open}>
    <Dialog.Trigger onClick={() => setOpen(true)}>
      <div className='outline-none bg-blue-500 text-white py-1 px-3 hover:bg-blue-600 transition-colors duration-200 text-sm rounded-md flex-row flex items-center'>
        <FiPlusCircle className='text-lg mr-2' />
        Novo paciente
      </div>
    </Dialog.Trigger>
    <Dialog.Portal >
      <Dialog.Overlay className='bg-black fixed inset-0 opacity-50' />
      <Dialog.Content onInteractOutside={() => setOpen(false)} className='bg-white rounded-xl shadow-md fixed top-1/4 left-1/2 ml-[-186px]' >
        <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
          <h1 className='font-bold text-xl'>Criar novo paciente</h1>
          <div className='h-[1px] bg-slate-300 my-3'/>
            <input {...register('name')} placeholder='Nome' onChange={(e) => setName(e.target.value)}  className="py-1 mt-2 rounded-xl focus:border-blue-500 px-5 min-w-full border-slate-400 border-2 outline-none"/>
            <button type='submit' disabled={name.length <= 0} className='bg-blue-500 disabled:bg-slate-400 text-white w-full rounded-xl hover:bg-blue-600 transition duration-200 p-2 mt-4 text-sm'>
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