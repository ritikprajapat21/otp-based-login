import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import axios from "../../axios";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignIn = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = ({ email, password }) => {
    const err = {};

    const response = axios.post(
      "/user/auth",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    toast.promise(response, {
      loading: "Verifying...",
      success: (res) => {
        setAuth({
          email: res.data.user.email,
          name: res.data.user.name,
          accessToken: res.data.accessToken,
        });

        // To navigate to home or from user redirected
        navigate("/otp", { replace: true });

        return "Verified";
      },
      error: (err) => {
        if (!err?.response) {
          toast.error("No server response");
        } else if (err.response?.status === 404) {
          toast.error("Username does not exist");
          err.email = "";
          err.password = "";
        } else if (err.response?.status === 400) {
          toast.error("Password does not match");
          err.password = "";
        } else {
          toast.error("Authentication failed");
        }

        return (
          <p>
            Cannot verify... <br />
            Check Credentials!
          </p>
        );
      },
    });

    return err;
  };

  const validateSignIn = (values) => {
    const error = {};
    const emailre =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if (!values.email) {
      error.email = toast.error(<b>Email required!</b>);
    } else if (!emailre.test(values.email)) {
      error.email = toast.error(<b>Invalid email!</b>);
      values.email = "";
    }

    if (!values.password) {
      error.password = toast.error(<b>Password required!</b>);
      values.password = "";
    } else if (values.password.length < 6) {
      error.password = toast.error(<b>Password must 6 character long</b>);
      values.password = "";
    }

    return error;
  };

  const formik = useFormik({
    initialValues: {
      email: "ritik@gmail.com",
      password: "123456",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateSignIn,
    onSubmit: (values) => handleSubmit(values),
  });

  if (auth?.email) {
    return (
      <div className="mx-auto">
        <Card className="w-96 text-center flex items-center p-4 h-52">
          <p className="font-bold text-center text-lg md:text-2xl">
            You are already logged in
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto h-1/2">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <Card className="w-fit">
        <h1 className="text-3xl font-bold mb-3">Log In</h1>

        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            {...formik.getFieldProps("email")}
            placeholder="E-mail"
          />

          <Input
            type="password"
            {...formik.getFieldProps("password")}
            placeholder="Password"
          />

          <Button type="submit" className="mt-2">
            Log in
          </Button>
        </form>
        <div className="mt-2 text-slate-300">
          Not Registerd yet? <Link to="/signup">Click Here</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
