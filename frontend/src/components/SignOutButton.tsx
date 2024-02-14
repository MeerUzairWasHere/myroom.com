import { useForm } from "react-hook-form"
import {  useNavigate } from "react-router-dom"
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from "react-query"
import toast from "react-hot-toast"

const SignOutButton = () => {
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { handleSubmit}= useForm()

    const mutation = useMutation(apiClient.logout,{
        onSuccess:async ()=>{
          toast.success('Signed Out!');
          await queryClient.invalidateQueries("validate-token")
          navigate("/")
        },
        onError:(error:Error)=>{
            console.log(error.message)
             toast.error("Something went wrong!");
        }
    });

    const onSubmit = handleSubmit(()=>{
      mutation.mutate()

    })
  return (
     <form onSubmit={onSubmit}>
              <button className="text-blue-600 h-full px-3 font-bold bg-white hover:bg-gray-100 " type="submit">Sign Out</button>
            </form>
  )
}
export default SignOutButton