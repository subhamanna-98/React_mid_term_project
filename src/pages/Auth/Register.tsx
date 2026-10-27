 
 
//  import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { toast } from "sonner";

// import type { SignUpPayload } from "../../types/interface/LoginInterface";
// import { RegisterSchema } from "../../services/validation/RegisterValidation";
// import { RegisterInputField } from "../../services/json/inputfeild/registerInput";
// import DynamicVomponante from "../../componantes/DynamicVomponante";
// import Api from "../../api/apiIntanse";
// import { Endpoint } from "../../services/heper/endpoint";
 
 
//  const Register = () => {
//   const navigate = useNavigate();
//   const [loading, setIsLoading] = useState<boolean>(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<SignUpPayload>({
//     resolver: yupResolver(RegisterSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: SignUpPayload) => {
//     setIsLoading(true);
//     try {
//       const response = await Api.post(Endpoint.auth.register, data);
//       console.log("Register response:", response);
//       if(response.status === 200){
//       toast.success("Account created successfully! Please login.");
//       reset();
//       navigate("/login");
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error?.response?.data?.message || error?.message || "Registration failed";
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <Container maxWidth="xs" sx={{ mt: 8 }}>
//       <Card>
//         <CardContent sx={{ p: 4 }}>
//           <Typography
//             variant="h5"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: "bold" }}
//           >
//             REGISTER
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
//           >
//             {RegisterInputField?.map((field) => (
//               <div key={field.name}>
//                 <DynamicVomponante
//                   label={field.label}
//                   name={field.name}
//                   placeholder={field.placeholder}
//                   register={register}
//                   type={field.type}
//                   errors={errors}
//                 />
//               </div>
//             ))}

//             <Button
//               type="submit"
//               variant="contained"
//               disabled={loading}
//               fullWidth
//               sx={{ mt: 2 }}
//             >
//               {loading ? "Registering..." : "Register"}
//             </Button>
//           </Box>

//           <Typography
//             variant="body2"
//             align="center"
//             sx={{ mt: 2.5, cursor: "pointer" }}
//             onClick={() => navigate("/login")}
//           >
//             Already have an account?{" "}
//             <span style={{ color: "#1976d2", fontWeight: 600 }}>Login</span>
//           </Typography>
//         </CardContent>
//       </Card>
//     </Container>
//   )
// }
// export default Register



import  { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerValidationSchema, type RegisterFormInputs } from "../../services/validation/RegisterValidation";
import { registerUser } from "../../services/authService";
import DynamicInput from "../../componantes/DynamicInput";
import { RegisterInputField } from "../../services/json/inputfeild/registerInput";



export const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res.message || "Account created successfully!");
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-[85vh] py-10 px-4 bg-gray-50">
      <Paper
        elevation={3}
        className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <Typography
          variant="h4"
          className="font-extrabold text-center text-gray-900 mb-2"
        >
          Create Account
        </Typography>
        <Typography variant="body2" className="text-center text-gray-500 mb-6">
          Sign up to explore, buy and rent cars on CarHut
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {RegisterInputField.map((field) => (
            <DynamicInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              register={register}
              errors={errors}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.4,
              backgroundColor: "#dc2626",
              "&:hover": { backgroundColor: "#b91c1c" },
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <Typography variant="body2" className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;