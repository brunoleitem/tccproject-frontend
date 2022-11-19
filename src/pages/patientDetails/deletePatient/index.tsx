import React from 'react';
import { FiTrash } from 'react-icons/fi';
import * as AlertDialog from '@radix-ui/react-alert-dialog';


export const DeletePatient = ({ handleDelete }: any) => {


  return (
    <AlertDialog.Root>
  <AlertDialog.Trigger>
    <div className='flex-row flex items-center bg-red-500  hover:bg-red-600 text-white transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
      <FiTrash className='mr-2' />
      Excluir
    </div>
  </AlertDialog.Trigger>
  <AlertDialog.Portal>
  <AlertDialog.Overlay className='bg-black fixed inset-0 opacity-50' />
  <AlertDialog.Content className='bg-white -translate-x-1/2 rounded-xl p-6 w-[500px] shadow-md fixed top-1/4 left-1/2 ' >
   <AlertDialog.Title className='font-bold  text-lg'>Deseja excluir esse paciente?</AlertDialog.Title>
   <AlertDialog.Description className='mb-4 leading-normal font-light'>Essa ação não pode ser desfeita</AlertDialog.Description>
   <div className='flex justify-end'>
   <AlertDialog.Cancel asChild>
    <button className=' bg-gray-400  hover:bg-gray-500 text-white transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
      Cancelar
    </button>
   </AlertDialog.Cancel>
   <AlertDialog.Action asChild>
    <button onClick={handleDelete} className='ml-1 bg-red-500  hover:bg-red-600 text-white transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
      Excluir
    </button>
   </AlertDialog.Action>
   </div>
  </AlertDialog.Content>
</AlertDialog.Portal>
</AlertDialog.Root>

  )
}

