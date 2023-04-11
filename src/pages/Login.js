import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingOverlay from 'react-loading-overlay';


const backRandom = Math.floor(Math.random() * 25+1);

function setErrorMessage(msg){
    
    toast(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        });

}
function Login(){

    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        username: yup.string().required('لطفا نام کاربری خود را وارد کنید'),
        password: yup.string().required('لطفا کلمه عبور خود را وارد نمایید'),
      //  ReCAPTCHA: yup.number().required('لطفا روی من ربات نیستم کلیک کنید'),
            });
      
      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        //  ReCAPTCHA:''
                },
        validationSchema,
             onSubmit:async (e) => {
                setIsLoading(true);

              const  usernamein = e.username;
               const passwordin = e.password;
                try {
                  const response = await axios.post("https://shirazchap.org/api/reactlogin", 
                  {usernamein,passwordin}
                  );
                  // ذخیره کوکی با نام jwt و مقدار توکن دریافتی از سرور
                 if(response.data.login === 'ok'){
                    setIsLoading(false);
                    setErrorMessage(response.data.user_name+' عزیز ، خوش آمدید');

                  Cookies.set("_token", response.data.token, { expires: 1 });
                  Cookies.set("user_name", response.data.user_name, { expires: 1 });
                  Cookies.set("user_staf", response.data.user_staf, { expires: 1 });
                  Cookies.set("user_id", response.data.user_id, { expires: 1 });
                  window.location.href = "/";
                 }
                } catch (error) {
                    setIsLoading(false);
                    setErrorMessage(error.response.data.error);
                }                  
    },
      });







    let token = Cookies.get("_token");
if(token){
  window.location.href = "/"; 
}

    
    const [isVerified, setIsVerified] = useState(false);

    const handleRecaptcha = (value) => {
        setIsVerified(true);
    }

return(

<div>
<LoadingOverlay active={isLoading} spinner text="لطفا صبر کنید ... ">

    <ToastContainer />
<div class="w-full flex flex-wrap bg-gradient-to-br from-gray-300 to-gray-50">
<div class="w-full flex flex-col sm:w-full md:w-full lg:w-1/2">



<div class=" md:m-auto sm:p-2 lg:p-8 sm:h-screen lg:h-auto flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 shadow-xl bg-gray-300 lg:w-3/4 m-auto rounded-lg">
<img src="https://shirazchap.org/img/logo1.png" alt="شیرازچاپ" className="lg:w-56 m-auto" />
    <form class="flex flex-col pt-2"  onSubmit={formik.handleSubmit}>
        <div class="flex flex-col p-2">
            <label for="email" class="text-lg pb-2 text-gray-600">نام کاربری</label>
            <input type="text" id="username" placeholder="ایمیل و یا تلفن همراه خود را وارد نمایید"
              onChange={formik.handleChange} 
              value={formik.values.username} 
              onBlur={formik.handleBlur} 
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            {formik.touched.username && formik.errors.username ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.username}</div> : null}

        </div>

        <div class="flex flex-col p-2">
            <label for="password" class="text-lg pb-2 text-gray-600">کلمه عبور</label>
            <input 
            type="password" 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            onBlur={formik.handleBlur} 
            id="password" placeholder="کلمه عبور خود را وارد نمایید" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            {formik.touched.password && formik.errors.password ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.password}</div> : null}        </div>
        <div class=" mt-2 p-2 ">
        <ReCAPTCHA sitekey="6LdMhUolAAAAAC4Mfp9iGXdo3YuJ_z56Q519GNtx" onChange={handleRecaptcha} />
        {formik.touched.ReCAPTCHA && formik.errors.ReCAPTCHA ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.ReCAPTCHA}</div> : null}

        <input type="submit" value="ورود" class="bg-black text-white font-bold p-2 mt-2 text-lg hover:bg-gray-700 w-full" />

</div>
    </form>
    <div class="text-center pt-3 pb-12">
        <p>حساب کاربری ندارید؟  <a href="register" class="underline font-semibold">ثبت نام کنید</a></p>
    </div>
</div>
</div>

<div class="w-1/2 sm:hidden md:hidden lg:block shadow-2xl">
    <img class="object-cover w-full h-screen hidden md:block" alt="شیرازچاپ" src={"/img/back"+backRandom+".jpg"} />
</div>
</div>
</LoadingOverlay>
</div>

    )
}

export default Login;