import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

import email from "../../assets/email.svg";
import key from "../../assets/key.svg";
import user from "../../assets/user.svg";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = ({ name, email, password }) => {
    const response = axios.post("/user/register", { name, email, password });

    toast.promise(response, {
      loading: "Creating user",
      success: (data) => {
        console.log(data);

        navigate("/otp");

        return <p>User Created</p>;
      },
      error: (err) => {
        if (!err?.response) {
          return "No server response";
        } else if (err.response?.status === 409) {
          return "Email already taken";
        } else {
          return "Registration failed";
        }
      },
    });
  };

  const validateSignUp = (values) => {
    const error = {};
    const emailre =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if (!values.name) error.name = toast.error("Name required");

    if (!values.email) error.email = toast.error("Email required");

    if (!emailre.test(values.email)) error.email = toast.error("Invalid email");

    if (!values.password) error.password = toast.error("Password required");

    if (values.password.length < 6)
      error.password = toast.error("Minimum 6 characters required");

    if (!values.rePassword)
      error.rePassword = toast.error("Re-enter password required");

    if (values.password !== values.rePassword)
      error.password = toast.error("Password does not match");

    return error;
  };

  const formik = useFormik({
    initialValues: {
      name: "ritik",
      email: "ritik@gmail.com",
      password: "123456",
      rePassword: "123456",
    },
    validate: validateSignUp,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
      values.name = "";
      values.email = "";
      values.password = "";
      values.rePassword = "";
    },
  });

  return (
    <div className="mx-auto h-1/2">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <Card className="w-fit md:pt-4">
        <h1 className="text-3xl font-bold">Create account</h1>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            icon={user}
            {...formik.getFieldProps("name")}
            placeholder="First and last name"
          />

          <Input
            type="email"
            icon={email}
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />

          <Input
            type="password"
            icon={key}
            {...formik.getFieldProps("password")}
            placeholder="Password"
            className="mb-0"
          />
          <div className="flex flex-row mt-0 mb-1">
            <p className="text-[12px] ml-1 inline text-center m-0 text-slate-400">
              Password must be atleast 6 characters.
            </p>
          </div>

          <Input
            type="password"
            icon={key}
            {...formik.getFieldProps("rePassword")}
            placeholder="Re-enter password"
          />

          <Button type="submit">Register</Button>
        </form>
        <div className="mt-2 text-slate-300">
          Already Registered? <Link to="/signin">Click Here</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
