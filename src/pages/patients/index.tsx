import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import api from '../../services/api';
import { CreateComponent } from './CreateComponent';
import history from '../../services/history'

type PatientsType = {
  name: string;
  doctor_id: number;
  id: number;
}

export const Patients = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<PatientsType[]>([]);

  useEffect(() => {
    getPatients()
  }, [])

  const getPatients = async () => {
    await api.get('/patients/all').then(response => {
      setPatients(response.data);
      setLoading(false)
    })
  }

  const handleCreate = async(data: any) => {
    await api.post('/patients/create', { name: data.name }).then(response => {
      toast.success(`Paciente ${data.name} criado`)
      setPatients(response.data);
    }).catch(error => {
      toast.error(error.response.data.Erro)
    })
  }

  return loading ? (
    <div className="justify-center flex items-center h-[calc(100vh-96px)]">
    <ClipLoader 
      color='#000'
      loading={loading}
      size={40}
    />
  </div>
 ) : (
  <div className="flex py-4 px-9 flex-1 flex-col items-center ]">
    <ToastContainer pauseOnFocusLoss={false} toastClassName={'drop-shadow-lg'} position={'bottom-right'}/>
    <div className='flex flex-row items-center w-full py-6 justify-between '>
      <h1 className='flex-1 font-bold text-2xl'>Pacientes</h1>
      <CreateComponent handleCreate={handleCreate} />
    </div>
    <div className='w-full h-[1px] bg-slate-300 mb-8'/>
   {patients.map(patient => (
    <button onClick={() => history.push(`patient/${patient.id}`)} className='flex my-[2px] items-center justify-between bg-slate-400 hover:bg-slate-600 rounded-md transition duration-200 hover:text-white cursor-pointer py-3 px-5 w-full' key={patient.id}>
      <h1 className='font-medium'>{patient.name}</h1>
    </button>
   ))}
  </div>
 )
}