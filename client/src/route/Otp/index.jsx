import { useFormik } from "formik";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";

const OTP = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.email) {
      axios.post("/otp", {
        email: auth.email,
      });
    } else {
      navigate("/signin");
    }
  }, [auth, navigate]);

  const validateOtp = (values) => {
    const error = {};
    if (!parseInt(values.otp)) {
      error.otp = toast.error("OTP must be a number");
    }
    return error;
  };

  const handleSubmit = (values) => {
    console.log(values);
    const response = axios.post("/otp/verify", {
      email: auth.email,
      otp: values.otp,
    });

    toast.promise(response, {
      loading: "Verifying...",
      success: (res) => {
        // To navigate to home or from user redirected
        navigate("/", { replace: true });

        return "Entering...";
      },
      error: (err) => {
        console.log(err.response.data.message);
        if (!err?.response) {
          return "No server response";
        } else {
          return err.response.data.message;
        }
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateOtp,
    onSubmit: handleSubmit,
  });

  return (
    <div className="mx-auto h-1/2">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <Card className="w-fit">
        <h1 className="text-3xl font-bold mb-3">OTP Verification</h1>
        <p className="text-slate-300 text-sm mb-6">
          OTP has been sent to your registered email
        </p>

        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            {...formik.getFieldProps("otp")}
            placeholder="Enter your OTP"
          />
          <Button type="submit" className="mt-2">
            Log in
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default OTP;
