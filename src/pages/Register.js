import React from "react";
import Cookies from "js-cookie";
import * as yup from 'yup';
import { useFormik } from 'formik';
import ReCAPTCHA from "react-google-recaptcha";



function Register(){
    let token = Cookies.get("_token");
if(token){
 // window.location.href = "/"; 
}




const validationSchema = yup.object().shape({
    name: yup.string().required('نام کاربری الزامی است'),
  });
  


      
  const formik = useFormik({
    initialValues: {
      name:''
            },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });





    return (
        <div className='bg-[url("https://shirazchap.org/img/loginback1.jpg")] bg-cover'>
            <div class="w-full flex flex-wrap">

<div class="w-full flex flex-col">

    <div className='flex w-2/3 bg-[url("https://shirazchap.org/img/photo-long-3.jpg")] bg-cover mt-8 rounded-3xl m-auto flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32'>
    <img src="https://shirazchap.org/img/logo1.png" alt="شیرازچاپ" className="w w-56 m-auto" />
        <form class="grid grid-cols-2 gap-2 md:pt-8"  onSubmit={formik.handleSubmit}>
            <div class="flex flex-col pt-4">
                <label for="name" class="text-center font-iransans">نام و نام خانوادگی</label>
                <input type="text" id="name" placeholder="John Smith" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                {formik.touched.name && formik.errors.name ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.name}</div> : null}

            </div>

            <div class="flex flex-col pt-4">
                <label for="email" class=" text-center">پست الکترونیک</label>
                <input type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="flex flex-col pt-4">
                <label for="password" class="text-center">نام شرکت</label>
                <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div class="flex flex-col pt-4">
                <label for="confirm-password" class=" text-center">تلفن همراه</label>
                <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
                <label for="confirm-password" class=" text-center">تلفن ثابت</label>
                <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
                <label for="confirm-password" class=" text-center">آدرس</label>
                <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
                <label for="confirm-password" class=" text-center">کلمه عبور</label>
                <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex flex-col pt-4">
                <label for="confirm-password" class=" text-center">تکرار کلمه عبور</label>
                <input type="password" id="confirm-password" placeholder="Password" class="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <ReCAPTCHA sitekey="6LdMhUolAAAAAC4Mfp9iGXdo3YuJ_z56Q519GNtx" />

            <input type="submit" value="بررسی اطلاعات" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8" />
        </form>
        <div class="text-center pt-12 pb-12">
            <p>Already have an account? <a href="login" class="underline font-semibold">Log in here.</a></p>
        </div>
    </div>

</div>


</div>

        </div>
    )
}

export default Register;