import React, { useState } from 'react';
import { FiEdit, FiPlusCircle } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IForm {
  title: string;
  body: string;
}

type NoteProps = {
  title: string;
  body: string;
}

type EditProps = {
  handleEditNote: any;
  note: NoteProps;
}


const schema = yup.object({
  title: yup.string(),
  body: yup.string(),
})

export const EditNote: React.FC<EditProps> = ({ note, handleEditNote }) => {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [open, setOpen] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IForm>({
    resolver: yupResolver(schema)
  });
  

  const onSubmit = async(data: any) => {
    handleEditNote(data);
    setOpen(false);
  }

  return (
  <Dialog.Root open={open}>
    <Dialog.Trigger onClick={() => setOpen(true)}>
    <div className='flex-row mr-1 flex items-center bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
  <FiEdit className='mr-2' />
  Editar
    </div>
    </Dialog.Trigger>
    
    <Dialog.Portal >
      <Dialog.Overlay className='bg-black fixed inset-0 opacity-50' />
      <Dialog.Content className='bg-white rounded-xl shadow-md fixed top-1/4 left-1/2 -translate-x-1/2' >
      <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
        <h1 className='font-bold text-xl'>Editar nota</h1>
        <div className='h-[1px] bg-slate-300 my-3'/>
          <input {...register('title')} value={title} onChange={(e) => setTitle(e.target.value)}  className="py-1 mt-2 rounded-xl focus:border-blue-500 px-5 min-w-full border-slate-400 border-2 outline-none"/>
          
          <textarea {...register('body')} value={body} onChange={(e) => setBody(e.target.value)}   className={` mt-2 resize-none min-h-[250px] py-1 mb-2 rounded-xl  focus:border-blue-500 px-5 min-w-full border-slate-400 border-2 outline-none`}/>
          <button type='submit' className='bg-blue-500 disabled:bg-slate-400 text-white w-full rounded-xl hover:bg-blue-600 transition duration-200 p-2 mt-4 text-sm'>
          Salvar
        </button>

      </form>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
}


