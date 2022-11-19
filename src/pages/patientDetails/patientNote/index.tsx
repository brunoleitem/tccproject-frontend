import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FiClock, FiEdit, FiFileText, FiXCircle } from 'react-icons/fi';
import { DeleteNote } from '../../notes/deleteNote';
import { EditNote } from '../../notes/editNote';
import history from '../../../services/history';

type NoteType = {
  id: number;
  title: string;
  created_at: string;
  body: string;
}

type PatientNote = {
  note: NoteType;
}

export const PatientNote: React.FC<PatientNote> = ({ note }) => {

  const handleOnPress = () => {
    history.push(`/notes/${note.id}`, note);
  };

  return (
  <div className='flex flex-row'>
    <button onClick={() => handleOnPress()} className='flex my-[2px] items-center justify-between bg-slate-400 hover:bg-slate-600 rounded-md transition duration-200 hover:text-white cursor-pointer py-3 px-5 w-full'>
      <h1 className='font-medium'>{note.title}</h1>
      <div className='flex flex-row items-center'>
        <FiClock className='mr-2'/>
        <h1>{new Date(note.created_at).toLocaleString()}</h1>
      </div>
    </button>
  </div>
  )
}
