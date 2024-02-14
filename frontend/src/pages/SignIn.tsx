import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from '../api-client'
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export type SignInFormData = {
  email:string;
  password:string;
}

const SignIn = () => {

 const navigate = useNavigate()
    const {register,handleSubmit,formState:{errors}}= useForm<SignInFormData>()
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.login,{
        onSuccess:async()=>{
          toast.success('Signed In!');
          await queryClient.invalidateQueries("validate-token")
          navigate("/")
        },
        onError:(error:Error)=>{
            console.log(error.message)
             toast.error("Something went wrong!");
        }
    });

    const onSubmit = handleSubmit((values:SignInFormData)=>{
        mutation.mutate(values)

    })
  return (
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Sign In</h2>
         <label  className="text-gray-700 text-sm font-bold flex-1"  >
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal"  {...register("email",{
                    required:"This field is required!"
                })} />
                    {errors?.email && <span className="text-red-500">{errors.email.message}</span> }
            </label>
         <label  className="text-gray-700 text-sm font-bold flex-1"  >
                Password
                <input autoComplete="true" type="password" className="border rounded w-full py-1 px-2 font-normal"  {...register("password",{
                    required:"This field is required!",minLength:{
                        value:6,
                        message:"Password must be atleast 6 characters"
                    }
                })} />
                    {errors?.password && <span className="text-red-500">{errors.password.message}</span> }
            </label>
       
            <span className="flex justify-between">
                <span>Not have an Account? <Link to="/sign-up" className="text-blue-700 underline">Sign up here</Link> </span>
                <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Login
                </button>
            </span>
    </form>
  )
}
export default SignIn