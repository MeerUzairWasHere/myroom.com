import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
 
export type RegisterFormData ={
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
}

const Register = () => {
    const navigate = useNavigate()
    const {register,watch,handleSubmit,formState:{errors}}= useForm<RegisterFormData>()
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.register,{
        onSuccess:async()=>{
          toast.success('Signed Up!');
          navigate("/")
          await queryClient.invalidateQueries("validate-token")
        },
        onError:(error:Error)=>{
            console.log(error.message)
             toast.error("Something went wrong!");
        }
    });

    const onSubmit = handleSubmit((values:RegisterFormData)=>{
        mutation.mutate(values)
        
    })
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
            <label  className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName",{
                    required:"This field is required!"
                })}  />
                {errors?.firstName && <span className="text-red-500">{errors.firstName.message}</span> }
            </label>
            <label  className="text-gray-700 text-sm font-bold flex-1"  >
                Last Name
                <input className="border rounded w-full py-1 px-2 font-normal"  {...register("lastName",{
                    required:"This field is required!"
                })} />
                    {errors?.lastName && <span className="text-red-500">{errors.lastName.message}</span> }
            </label>
        </div>
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
         <label  className="text-gray-700 text-sm font-bold flex-1"  >
                Confirm Password
                <input autoComplete="true" type="password" className="border rounded w-full py-1 px-2 font-normal"  {...register("confirmPassword",{
                     validate:(value)=>{
                            if(!value){
                                 return "This filed is required!"
                            }else if(watch("password")!== value){
                                return "Passwords do not match"
                            }
                     }
                })} />
                    {errors?.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span> }
            </label>
            <span className="flex justify-between items-center">
                 <span>Already have an Account? <Link  className="underline text-blue-700 " to="/sign-in">Sign in here</Link> </span>
                <button type="submit" className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>
    </form>
  )
}
export default Register