import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../hooks/auth";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";

interface IForm {
  user: string;
  password: string;
}

const schema = yup.object({
  user: yup.string().required('Você precisa informar seu email'),
  password: yup.string().required('Você precisa informar sua senha')
})

export const Login = () => {
  const [errorSignIn, setErrorSignIn] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<IForm>({
    resolver: yupResolver(schema)
  });
  const { signIn } = useContext(AuthContext)
  
  const onSubmit = async (data: any) => {
    try {
      await signIn(data)
    } catch (error: any) {
      setErrorSignIn(true);
      toast.error(error.response.data.Error)
    }
  }
  return (
    <div className="bg-gradient-to-br from-[#69FF97] to-[#00E4FF] justify-center flex items-center h-screen">
    <ToastContainer pauseOnFocusLoss={false} toastClassName={'drop-shadow-lg'} position={'bottom-right'}/>
      <form onSubmit={handleSubmit(onSubmit)} className="px-11 py-20 bg-white bg-opacity-30 shadow-[0_0px_80px_8px_rgba(0,0,0,0.25)]  flex rounded-3xl min-w-[400px] items-center flex-col justify-center">
        <h1 className="text-2xl text-black mb-11 font-bold">Login</h1>
          
          <p className="mt-5 self-start text-sm">{errors.user?.message}</p>
          <input
            placeholder="Usuario"
            {...register('user')}
            className="py-2 rounded-xl px-5 min-w-full outline-none"
          />
          
          <p className="mt-5 self-start text-sm">{errors.password?.message}</p>
          <input 
          placeholder="Senha"
            {...register('password')}
            className="py-2 rounded-xl px-5 min-w-full outline-none"
            type="password"
          />
        
        <button type="submit" className="mt-8 h-12 rounded-xl min-w-full bg-black transition duration-200 hover:scale-105 text-white font-bold">
          Entrar
        </button>

      </form>
    </div>
  )
}

