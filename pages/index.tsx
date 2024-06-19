import React, { useEffect } from "react";
// import "./Form.css";
import styles from "../styles/Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import Vector1 from "../public/Vector2.svg";
import Vector2 from "../public/Vector1.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const LogIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const credentials = {
    userName: "admin",
    email: "admin@gmail.com",
    password: "admin9",
  };

  useEffect(() => {
    document.title = "Log In";
    // localStorage.removeItem("response");
    const checkLogin = async () => {
      const user = sessionStorage.getItem("token");
      if (user) {
        router.push("/basicDetails");
      }
    };
    checkLogin();
  }, []);
  // let { error_msg } = useSelector((state) => state.logIn);
  // console.log(error_msg);
  // const user = JSON.parse(localStorage.getItem("response"));

  const handleFormSubmit = (values: any) => {
    console.log(values);
    try {
      console.log(values, "Yo form submit garda ko values ho.");
      const form_data = { email: values.email, password: values.password };
      // dispatch(LogInAction(form_data));
      if (
        values.email === credentials.email &&
        values.password === credentials.password
      ) {
        router.push("/basicDetails");
      } else {
        window.alert("Wrong credentials please check your email and password again.");
      }

      // console.log(loginState, "Yo loginState console ho login.js page ma.");

      // setTimeout(async () => {
      //   // const user = await JSON.parse(localStorage.getItem("response"));
      //   const token = sessionStorage.getItem("token");
      //   if (token) {
      //     router.push("/basicDetails");
      //   }
      // }, 500);
    } catch (err) {
      console.log("Catching error if not able to login.", err);
    }
  };

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[a-z._-]{1,12}\.com$/,
        "Email pattern is not correct"
      ),
    password: Yup.string().required("Password is required"), // .min(8, "Too short.").matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
  });

  return (
    <>
      <div className={styles.imagediv}>
        <Image src={Vector1} alt="effect" className={styles.backimage} />
        {/* <Image src={Vector2} alt="effect" className={styles.frontimage} /> */}
      </div>
      <div className={styles.maindiv}>
        <h1 className={styles.formheading}>Welcome to Basobaas</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LogInSchema}
          onSubmit={handleFormSubmit} // Call a function to store the input values on submit.
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <form className={styles.loginform} onSubmit={handleSubmit}>
              <div className={styles.formemaildiv}>
                <input
                  name="email"
                  type="text"
                  className={styles.input}
                  placeholder="Email"
                  // value={email}
                  onChange={handleChange("email")} // handle input change
                />
                {errors.email && touched.email ? (
                  <div className={styles.formemailerrordiv}>{errors.email}</div>
                ) : // : loginState.status === false ? (
                //   <div className={styles.formemailerrordiv">{loginState.msg}</div>
                // )
                null}
                {/* <ErrorMessage name="email" /> */}
              </div>
              <div className={styles.formpassworddiv}>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  // value={pwd}
                  onChange={handleChange("password")} // On input change, change the error message.
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div className={styles.formpassworderrordiv}>
                    {errors.password}
                  </div>
                ) : null}
              </div>
              {/* <button className={styles.forgetpass" onClick={<FormDialog/>}>Forgot your password?</button> */}
              {/* <LoginForgotPasswordForm /> */}
              <button type="submit" value="LogIn" className={styles.button}>
                Login
              </button>
              {/* <ToastContainer position="topleft" autoClose={6000} /> */}
            </form>
          )}
        </Formik>
        <p className={styles.loginformregisterlink}>
          {/* Don't have an account yet?{" "} */}
          {/* <Link exact to="/signup">
            Sign Up
          </Link> */}
        </p>
      </div>
    </>
  );
};

export default LogIn;
