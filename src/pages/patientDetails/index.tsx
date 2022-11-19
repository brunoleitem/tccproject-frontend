import React, { useState, useEffect} from 'react';
import { FiArrowLeft, FiEdit, FiPlusCircle, FiUser, FiXCircle } from 'react-icons/fi';
import { useLocation, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';
import { DeletePatient } from './deletePatient';
import { EditPatient } from './editPatient';
import { NewNote } from './newNote';
import { PatientNote } from './patientNote';

type ParamsType = {
  id: string;
}

type NotesType = {
  id: number;
  title: string;
  created_at: string;
  body: string;
}

type PatientType = {
  id: number;
  name: string;
  doctor_id: number;
  Note: NotesType[];
}

export const PatientDetails:React.FC = () => {
  const { id } = useParams<ParamsType>();
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientType>();

  useEffect(() => {
    getPatient();
  }, [])

  const getPatient = async () => {
    await api.get(`/patients/${id}`).then(response => {
      setPatient(response.data);
      setLoading(false)
    })
  }

  const handleEditPatient = async (data: any) => {
    await api.patch(`/patients/${id}`, { name: data.name }).then(response => {
      setPatient(response.data);
      setLoading(false)
      toast.success('Usuário alterado')
    })
  }

    
  const handleDelete = async () => {
    await api.delete(`/patients/${id}`).then(() => {
      history.goBack();
      toast.success('Usuário excluido com sucesso')
    })
  }

  const handleNewNote = async (data: any) => {
    console.log(data);
    await api.post(`/notes/create/${id}`, { title: data.title, body: data.body}).then(() => {
      toast.success('Nota criada')
      getPatient();
    })
  }

  return loading ? 
  <div className="justify-center flex items-center h-[calc(100vh-96px)]">
    <ClipLoader 
      color='#000'
      loading={loading}
      size={40}
    />
  </div> : 
  (
    <div className="flex py-4 px-9 flex-1 flex-col">
    <ToastContainer pauseOnFocusLoss={false} toastClassName={'drop-shadow-lg'} position={'bottom-right'}/>
      <div className='flex flex-row justify-center items-center w-full py-6'>
        <button onClick={() => history.goBack()} className='flex-row flex items-center bg-gray-100  hover:bg-gray-200 transition-colors duration-200 py-1 px-3 text-sm rounded-md'>
        <FiArrowLeft className='mr-2' />
        Voltar
        </button>
        <div className='flex justify-center flex-1 flex-row items-center'>
          <FiUser className='text-2xl mr-4'/>
          <h1 className='text-2xl font-bold'>{patient?.name}</h1>
        </div>

        <EditPatient patient={patient} handleEditPatient={handleEditPatient} />

        <DeletePatient handleDelete={handleDelete} />

      </div>

      <div className='w-full h-[1px] bg-slate-300 mb-8'/>
      <div className='flex flex-row justify-between  mb-4'>
        <h1 className='text-2xl font-bold'>Notas</h1>
        <NewNote handleNewNote={handleNewNote} />
      </div>

      {patient?.Note.map(note => (
        <PatientNote key={note.id} note={note} />
      ))}
    </div>
  )
}