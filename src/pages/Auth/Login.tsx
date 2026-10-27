// import { useForm } from "react-hook-form"
// import type { LoginPayload } from "../../types/interface/LoginInterface"
// import { Box, Button, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { LoginSchema } from "../../services/validation/LoginValidation"
// import { LoginputFeild } from "../../services/json/inputfeild/loginInput"
// import DynamicVomponante from "../../componantes/DynamicVomponante"
// import { useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { Endpoint } from "../../services/heper/endpoint"
// import Api from "../../api/apiIntanse"
// import axios from "axios"
// import { toast } from "sonner"
// import Cookies from 'js-cookie'

//  const Login = () => {
//   const navigate = useNavigate()
//   const [loading,setIsloading] = useState<boolean>(false)
//   const[error,setIserror] = useState<string|null>(null)
//   const {register,handleSubmit,reset, formState: {errors}} = useForm<LoginPayload>({
//     resolver:yupResolver(LoginSchema),
//     defaultValues:{
//       email: "",
//       password: ""
//     }
//   })
//   const onSubmit = async(data: LoginPayload) => {
//   //   console.log("data",data);
//   //   // reset()
//   //   setIsloading(true);
//   // setIserror(null);
//   //   try {
//   //     // const respone = await Api.post(`${Endpoint.auth.login}, data`)
//   //     const respone = await axios.post("https://news-blog-api.onrender.com/api/auth/login",data)
//   //     // const respone  = await fetch ("https://news-blog-api.onrender.com/api/auth/login",{
//   //     //   method:"POST",
//   //     // headers:{
//   //     //     'Content-Type': 'application/json'
//   //     // },
//   //     // body: JSON.stringify(data)
//   //     // })
//   //     console.log("respone",respone);
//   //     if(respone.status === 201){
//   //      toast.success("login succesfully.");
//   //      reset()
//   //      Cookies.set("token", respone.data.accessToken)
//   //      Cookies.set("user", JSON.stringify(respone.data.user))
//   //      if(respone.data.user.role === "admin"){
//   //       navigate ("/admin/dashboard")
//   //      }else{
//   //       navigate("/")
//   //      }
//   //      }
//   //   } catch (error:any) {
//   //     // console.log(error.message);
//   //     // toast.error(error?.respone?.data?.message)
//   //     const errormessage = error?.respone?.data?.message
//   //     toast.error(errormessage)
//   //   }finally{
//   //     setIsloading(false)
//   //   }
//   // }
//   setIsloading(true);
//   setIserror(null);

//   try {
//     const response = await axios.post(
//       "https://news-blog-api.onrender.com/api/auth/login",
//       data
//     );

//     console.log("Full Response:", response);
//     console.log("Response Data:", response.data);

//     if (response.status === 200 || response.status === 201) {
//       toast.success("Login successfully.");

//       const token =
//         response.data?.token ||
//         response.data?.accessToken ||
//         response.data?.data?.token ||
//         response.data?.data?.accessToken;

//       const user = response.data?.user || response.data?.data?.user;

//       if (token) {

//         Cookies.set("token", token, { expires: 7 });
//       }

//       if (user) {
//         Cookies.set("user", JSON.stringify(user), { expires: 7 });
//       }

//       reset();

//       if (user?.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/");
//       }
//     }
//   } catch (error: any) {
//     console.error("Login Error:", error);

//     const errorMessage =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Something went wrong. Please try again.";
//     toast.error(errorMessage);
//   } finally {
//     setIsloading(false);
//   }
// };
//   return (
//     <Container>
//       <Card>
//         <CardContent>
//           <Typography>LOGIN</Typography>
//           <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//             {LoginputFeild?.map((field:any) =>
//             <div key={field.label}>
//               <DynamicVomponante label={field.label} name={field.name} placeholder={field.placeholder} register={register} type={field.type} errors={errors}/>
//             </div>
//             )}
//             <Button type="submit" variant="contained" disabled={loading}>
//               {loading ? <CircularProgress/> : "Login "}
//             </Button>
//           </Box>
//           <Typography onClick = {()=> navigate("/register")}>Create an account ? <span>signup</span></Typography>
//         </CardContent>
//       </Card>
//     </Container>
//   )
// }
// export default Login

import { useForm } from "react-hook-form";
// import type { LoginFormInputs } from "../../services/validation/loginValidation";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "sonner";
import Cookies from "js-cookie";
import Api from "../../api/apiIntanse";
import Endpoint from "../../services/heper/endpoint";
import { LoginInputField } from "../../services/json/inputfeild/loginInput";
import DynamicInput from "../../componantes/DynamicInput";
import {
  loginValidationSchema,
  type LoginFormInputs,
} from "../../services/validation/LoginValidation";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    try {
      
      const response = await Api.post(Endpoint.auth.login, data);

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data?.message || "Login successfully.");

        const token = response.data?.token || response.data?.accessToken;
        const user = response.data?.user;

        if (token) {
          Cookies.set("token", token, { expires: 7 });
        }

        if (user) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
        }

        reset();

        if (user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            LOGIN
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {LoginInputField?.map((field) => (
              <div key={field.name}>
                <DynamicInput
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  register={register}
                  type={field.type}
                  errors={errors}
                />
              </div>
            ))}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.3,
                backgroundColor: "#dc2626",
                "&:hover": { backgroundColor: "#b91c1c" },
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          <Typography
            align="center"
            sx={{ mt: 3, cursor: "pointer", color: "text.secondary" }}
            onClick={() => navigate("/register")}
          >
            Don't have an account?{" "}
            <span style={{ color: "#dc2626", fontWeight: "bold" }}>
              Sign Up
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
