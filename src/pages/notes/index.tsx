import React from 'react';
import { FiArrowLeft, FiClock, FiFileText } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api';

import history from '../../services/history';
import { DeleteNote } from './deleteNote';
import { EditNote } from './editNote';

type NoteType = {
  id: number;
  title: string;
  created_at: string;
  body: string;
}

export const Notes = () => {

  const { state: note } = useLocation<NoteType>();

  const handleDeleteNote = async() => {
      await api.delete(`/notes/delete/${note.id}`).then(() => {
        history.goBack()
      }).finally(() => {
        toast.success('Nota excluida com sucesso')
      })
  }
  
  const handleEditNote = async(data) => {
    const { body, title } = data;

    await api.put(`/notes/edit/${note.id}`, { body, title}).then(() => {
      history.goBack();
    })
  }

  return (
    <div className="flex py-4 px-9 flex-1 flex-col">
    <ToastContainer pauseOnFocusLoss={false} toastClassName={'drop-shadow-lg'} position={'bottom-right'}/>
    
      <div className='flex flex-row justify-center items-center w-full py-6'>
        <button onClick={() => history.goBack()} className='flex-row flex items-center bg-gray-100  hover:bg-gray-200 transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
        <FiArrowLeft className='mr-2' />
        Voltar
        </button>
        <div className='flex justify-center flex-1 flex-row items-center'>
          <FiFileText className='text-2xl mr-4'/>
          <h1 className='text-2xl font-bold'>{note.title}</h1>
        </div>

        <EditNote note={note} handleEditNote={handleEditNote} />
        <DeleteNote handleDelete={handleDeleteNote} />
      </div>
      
      <div className='w-full h-[1px] bg-slate-300 mb-8'/>
     
      <div className='flex self-end flex-row items-center mb-8 '>
        <FiClock className='mr-3'/>
        <span >Criado em: {new Date(note.created_at).toLocaleString()}</span>
      </div>
      <span className='whitespace-pre-line'>
            {note.body}
          </span>

    </div>
  )
}