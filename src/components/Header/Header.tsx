import React, { useContext } from 'react';
import { AuthContext } from '../../hooks/auth';
import { FiBook, FiChevronDown, FiHome, FiUser } from 'react-icons/fi';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import history from '../../services/history'
import { useLocation } from 'react-router-dom';
type UserType = {
  name: string;
  avatar: string;
}

export const Header: React.FC = () => {
  const user: UserType = JSON.parse(localStorage.getItem('user')!);
  const location = useLocation();
  const { signOut } = useContext(AuthContext);


  return (
    <div className='bg-[#181818] py-5 px-10 flex flex-row shadow-md' >
      <div className='flex flex-1 items-center justify-center'>
        <div className='flex-row flex flex-1 '>
          <button onClick={() => history.push('/dashboard')} className={`${location.pathname === '/dashboard' ? 'border-b-2 border-white' : null} flex flex-col text-white items-center mr-12 transition duration-200 hover:scale-105`} >
            <FiHome />
            <p className='mt-1'>Home</p>
          </button>
          
          <button onClick={() => history.push('/patients')}  className={`${location.pathname === '/patients' ? 'border-b-2 border-white' : null} flex flex-col text-white items-center mr-12 transition duration-200 hover:scale-105`}>
            <FiUser />
            <p className='mt-1'>Pacientes</p>
          </button>
    
        </div>
        
        <div className=' flex items-center'>
          <h1 className='text-white font-bold'>Dr. {user.name}</h1>
          
          <DropdownMenu.Root >
          <DropdownMenu.Trigger className='focus:outline-none flex flex-row items-center'>
            <img src={user.avatar} className="h-14 w-14 border-2 border-slate-50 rounded-full object-cover ml-4 mr-4" />
            <FiChevronDown color='white' />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className='bg-white p-1 rounded-lg min-w-[110px] shadow-md'>
            <DropdownMenu.Item onSelect={() => signOut()} className='text-sm rounded-lg items-center px-2 outline-none focus:cursor-pointer focus:bg-red-400 focus:text-white'>
              Logout
            </DropdownMenu.Item>

              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    
      
    </div>
  )
}

