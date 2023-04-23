  import React, { useState, useEffect, useRef } from 'react';
  import axios from "axios";
  import LoadingOverlay from 'react-loading-overlay';
  import Header from '../components/Header';
  import Footer from '../components/Footer';
  import Select from 'react-select';
  import { useParams} from 'react-router-dom';
  import $, { getJSON, parseJSON } from 'jquery';
  import { FaChevronCircleLeft } from 'react-icons/fa';
  import { FaFolderOpen } from 'react-icons/fa';
  import { FaWindowClose } from 'react-icons/fa';
  import Modal from 'react-modal';
  import * as yup from 'yup';
  import { useFormik } from 'formik';
  import Cookies from "js-cookie";
  import { NumericFormat } from 'react-number-format';

  
  const LargeFormatOrderForm = () => {
    let token = Cookies.get("_token");
if(!token){
  window.location.href = "/login"; 
}

    let user_id = Cookies.get("user_id");


          const [isLoading, setIsLoading] = useState(false);
      const apiUrl = 'https://shirazchap.org/api/get_largeformats';
      const [media, setMedia] = useState([]);
      const [thicknessShow, setTicknesShow] = useState([]);
      const [deviceShow, setDeviceShow] = useState([]);
      const [qualityShow, setQualityShow] = useState([]);
      const [widthShow, setWidthShow] = useState([]);
      const [heightShow, setHeightShow] = useState([]);
      const [countShow, setCountShow] = useState([]);
      
      const params = useParams();
      const paramsId = params.id;
      const [modalIsOpen, setModalIsOpen] = useState(false);
      function openModal() {
        axios.post('https://shirazchap.org/api/getfiles?userid='+user_id)
        .then(response => {
          setFiles(response.data);
        // setMedia('جنس مدیا : '+defaultOptions.label);
          setIsLoading(false);
        })
        .catch(error => {
          console.log(error);
        })
       setModalIsOpen(true);
      }
      function closeModal() {
        setModalIsOpen(false);
      }
      
      function setFileToOrder(name){
        $('.fileDiv').empty();
        $('.fileDiv').append('<div class="w-full flex"><div class="w-full h-48">'
        +'<img class="rounded-lg" style="height:100%;padding:8px;" src="https://shirazchap.org/uploads/'+user_id+'/thumb_'+name+'" /></div>'
        +'<div class="w-full flex flex-col items-center justify-center">'
        +'<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="text-gray-400 text-8xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path></svg>'
        +'جهت تغییر فایل کلیک کنید</div>'
        +'</div>');
        formik.setFieldValue('files', name);

        setModalIsOpen(false);

      }


      const validationSchema = yup.object().shape({
        title: yup.string().required('لطفا عنوان سفارش را وارد کنید'),
        productid: yup.string().required('لطفا نوع مدیا را انتخاب نمایید'),
        deviceid: yup.string().required('لطفا نوع دستگاه را انتخاب نمایید'),
        thickness: yup.string().required('لطفا ضخامت مدیا را انتخاب نمایید'),
        quality: yup.string().required('لطفا کیفیت مورد نظر خود را انتخاب نمایید'),
        width: yup.string().required('لطفا عرض را انتخاب نمایید'),
        height: yup.string().required('لطفا طول را انتخاب نمایید'),
        files: yup.string().required('لطفا فایل مربوط به سفارش را انتخاب نمایید'),
        count: yup.number().required('لطفا تعداد سفارش را وارد نمایید'),
        delivery: yup.number().required('لطفازمان تحویل سفارش را مشخص نمایید'),
            });
      
      const formik = useFormik({
        initialValues: {
          title: '',
          user_id: user_id,
          productid: '',
          deviceid: '',
          thickness:'',
          quality:'',
          width:'',
          height:'',
          file:'',
          delivery:'',
          count:''
                },
        validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });



      const [medias, setMedias] = useState([]);
      const [files, setFiles] = useState([]);
      const [devices, setDevice] = useState([]);
      const [mediaOpt, setMediaOptions] = useState([]);
      const [mediaId, setMediaId] = useState([]);
      const [passId, setPassId] = useState([]);
      const [laminateDiv, setLaminateDiv] = useState([]);
      const [punchDiv, setPunchDiv] = useState([]);
      const [lifehDiv, setLifehDiv] = useState([]);
      const [standDiv, setStandDiv] = useState([]);
      const [PounchShow, setPunchCount] = useState([]);
      const [standShow, setStandShow] = useState([]);
      const [rulapShow, setRulapShow] = useState([]);
      const [ghabShow1, setGhabShow1] = useState([]);
      const [ghabShow2, setGhabShow2] = useState([]);
      const [ghabShow3, setGhabShow3] = useState([]);
      const [deliveryShow, setDeliveryShow] = useState([]);
      const [laminetShow, setLaminetShow] = useState([]);
      
      
     
function totals() {
  const w = formik.values.width/ 100;
  const h = formik.values.height / 100;
  const f = productFee;
  const c = formik.values.count;
  let t = w * h * f * c;
  const cP = formik.values.punchCount;
  const standCount = $('#standCount').val();
  const rulapCount = $('#rulapCount').val();
  const ghabWidth = $('#ghabWidth').val();
  const ghabHeight = $('#ghabHeight').val();
  const ghabCount = $('#ghabCount').val();
  const delivery = formik.values.delivery;
  
  if (cP > 0) {
    t += cP * 1000;
  }
  if(standCount > 0 ){
    t += standCount * 100000
  }
  if(rulapCount > 0 ){
    t += rulapCount * 420000
  }
  if(ghabWidth > 0  && ghabHeight > 0 && ghabCount > 0 ){

    var ghabprices = (((((parseInt(ghabWidth)+parseInt(ghabHeight))+14)*2/100) *25000)+20000)*ghabCount;

    t += ghabprices

  }
if(delivery === 1){
  t += (t*15)/100
}


  return t ;
}

                    

function setShowPunched(res){
  if(res === true){
    $('.punchCountDiv').show('slow');
    $('.lifehDiv').hide('slow');
  }else{
    $('.punchCountDiv').hide('slow');
    $('.lifehDiv').show('slow');
    $('#punchcount').val(null);
    setPunchCount('');
    formik.setFieldValue('punchCount',0)


  }
}



    function setShowLifehChiled(res){
      if(res === true){
    
   $('.punchDiv').hide('slow');
   $('.lifehChiled').empty();
   $('.lifehChiled').append(`<div class="flex gap-1 flex-col w-1/2">
   <div class="flex items-center w-full justify-center border border-gray-200 rounded dark:border-gray-700"><label for="derakhti" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">لیفه درختی</label><input id="derakhti" type="radio" name="lifehtype" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value=""></div>
   <div class="flex items-center w-full justify-center border border-gray-200 rounded dark:border-gray-700"><label for="darbasti" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">لیفه داربستی</label><input id="darbasti" type="radio" name="lifehtype" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" value=""></div>
   </div>
   <div class="flex flex-wrap w-1/2 gap-1 justify-center">
   <div class="w-2/5 py-3 gap-1 flex border border-gray-200 justify-center items-center rounded-lg"><label>بالا</label><input type="checkbox" /></div>
   <div class="w-2/5 py-3 gap-1 flex border border-gray-200 justify-center items-center rounded-lg"><label>پایین</label><input type="checkbox" /></div>
   <div class="w-2/5 py-3 gap-1 flex border border-gray-200 justify-center items-center rounded-lg"><label>چپ</label><input type="checkbox" /></div>
   <div class="w-2/5 py-3 gap-1 flex border border-gray-200 justify-center items-center rounded-lg"><label>راست</label><input type="checkbox" /></div>
   </div>
   
   `)

    }else{
      $('.punchDiv').show('slow');
      $('.lifehChiled').empty();
      
    }
  }


  function setShowStandChiled(type,res){
    if(type === false){
      $('.stand1').show('slow')
      $('.stand2').show('slow')
      $('.stand3').show('slow')
      $('.standCountDiv').hide('slow')
      $('.standOptions').hide('slow')
      $('.rulapCountDiv').hide('slow')
      $('.ghabfanariCountDiv').hide('slow')
      setStandShow('')
      $('#standCount').val(null)
      setRulapShow('')
      $('#rulapCount').val(null)




    }
    if(type === true && res === 1 ){
      $('.rulapCountDiv').hide('slow')
      $('.ghabfanariCountDiv').hide('slow')
      $('.standOptions').show('slow')
      $('.standCountDiv').show('slow')
      setRulapShow('')
      $('#rulapCount').val(null)
    }
    if(type === true && res === 2 ){
      $('.ghabfanariCountDiv').hide('slow')
      $('.standCountDiv').hide('slow')
      $('.standOptions').show('slow')
      $('.rulapCountDiv').show('slow')
      setStandShow('')
      $('#standCount').val(null)
    }
    if(type === true && res === 3 ){
      $('.standCountDiv').hide('slow')
      $('.rulapCountDiv').hide('slow')
      $('.standOptions').show('slow')
      $('.ghabfanariCountDiv').show('slow')
    }
    


  }

  const inputRef = useRef(null);




      useEffect(() => {
          setIsLoading(true);
        axios.get(apiUrl)
            .then(response => {
              setIsLoading(false);
              setMedias(response.data);
              setMediaOptions(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }, []);
      



    const [title, setTitle] = useState("");
    const [productid, setmedia] = useState("");
    const [thickness, setThickness] = useState("");
    const [quality, setQuality] = useState("");
    const [width, setWidth] = useState([]);
    const [height, setHeight] = useState("");
    const [length, setLength] = useState("");
    const [file, setFile] = useState(null);

  
    const mediaoptions =  mediaOpt.map(media => (
      { value:media.id, label:media.title }
    ))

    const customStyles = {
      content: {
        top: '10%',
        left: '10%',
        right: 'auto',
        bottom: 'auto',
        height:'fit-content',
        maxHeight:'60%',
        width:'80%',
        padding:'0px',
      },overlay: {
        background: "rgba(43, 43, 38, 0.6)"
      }
    };
    


  const defaultOption = mediaoptions.find(option => option.value === parseInt(paramsId) );
  useEffect(() => {
    const selectedMedia = paramsId;
    const defaultOptions = $('#productid').find(option => option.value === parseInt(paramsId) );

    setIsLoading(true);
    axios.post('https://shirazchap.org/api/getticknes?lid=' + selectedMedia)
    .then(response => {
      const thicknesses = response.data;
      setThicknesses(thicknesses);
    // setMedia('جنس مدیا : '+defaultOptions.label);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error);
    })



  }, []); // مقدار دوم [] به این معنی است که فقط در لحظه‌ای که کامپوننت مونت شده است، این کد اجرا شود.


  const [thicknessesed, setThicknesses] = useState([]);
  const [qualityed, setPass] = useState([]);
  const [thicknessId, setThicknessId] = useState([]);
  const [deviceId, setDeviceId] = useState([]);
  const [productFee, setFee] = useState([]);



  
  return (
      <div>  
            <LoadingOverlay active={isLoading} spinner text="لطفا صبر کنید ... ">

      <Header />
              <div className='row mt-8'>
  <div className="flex gap-4 container mx-auto max-w-screen-xl">

      <div className='w-8/12 p-8 bg-white'>
      <form className="flex space-x-4" onSubmit={formik.handleSubmit}>
        <div className="w-full">
          
          
          <div className="flex border items-center p-2 rounded-lg">
            <label className=' w-1/4' htmlFor="title">عنوان سفارش : </label>
            <div className='flex flex-col w-full'>
            <input
              type="text"
              id="title"
              name='title'
              ref={inputRef}
              onChange={formik.handleChange} 
              value={formik.values.title} 
              onBlur={formik.handleBlur} 
              placeholder="مثال : تابلو آقای محمدی"
              className="border rounded-lg w-full border-gray-300 p-2"
            />
            {
            formik.touched.title && formik.errors.title ? 
            <div className="text-red-400 text-sm mt-2 w-full">
              {formik.errors.title }
              </div>
            : null
            }
          </div>
          </div>
         
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="productid">نوع مدیا:</label>
            <div className='flex flex-col w-full'>
            <Select 
              id="ّ"
              name="productid"
              placeholder={<div>-- انتخاب نوع مدیا --</div>} 
              options ={mediaoptions}
              onChange={ (e)=>{

                  const selectedMedia = e.value;
                  formik.setFieldValue('productid', selectedMedia);
                  setIsLoading(true);
                  axios.post('https://shirazchap.org/api/getticknes?lid=' + selectedMedia)
                  .then(response => {
                    const thicknesses = response.data;
                    setThicknesses(thicknesses);
                    setMedia(' جنس مدیا : '+e.label);
                    setIsLoading(false);
                    setMediaId(selectedMedia);
                                      formik.setFieldValue('productid', selectedMedia);

                  })
                  .catch(error => {
                    console.log(error);
                  })

                  axios.post('https://shirazchap.org/api/getdevice?id=' + selectedMedia)
                  .then(response => {
                    const device = response.data;
                    setDevice(device.devices);
                    
                    if (device.devices[0].laminet === 1) {
                      setLaminateDiv(<div className="flex flex-col mt-4">
                                    <div className='bg-teal-800 text-white p-3 w-28 rounded-t-lg text-center' htmlFor="deviceid">لمینت</div>
                                    <div className='flex w-full gap-5 border border-teal-800 p-4 rounded-l-lg rounded-b-lg'>
                                    <div class="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="laminet" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">بدون لمینت</label>
                                    <input 
                                    id="laminet" 
                                    type="radio" 
                                    name="laminet"
                                    onChange={ (e)=>{
                                      formik.setFieldValue('laminet',"")
                                      setLaminetShow('');
                                    }}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div><div class="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="laminet1" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">لمینت برق</label>
                                    <input 
                                    id="laminet1" 
                                    type="radio" 
                                    onChange={ (e)=>{
                                      formik.setFieldValue('laminet',1)
                                      setLaminetShow('لمینت براق ');
                                    }}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div class="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="laminet2" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">لمینت مات</label>
                                    <input 
                                    id="laminet2"
                                     type="radio" 
                                     onChange={ (e)=>{
                                      formik.setFieldValue('laminet',2)
                                      setLaminetShow('لمینت مات');
                                    }}
                                     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div></div>
                                  </div>);
                    }else{
                      setLaminateDiv(null)   
                    }

                    

// کامپوننت
if (device.devices[0].punch === 1) {
  setPunchDiv(
    <div className="flex flex-col mt-4 punchDiv">
      <div className='bg-teal-800 text-white p-3 w-28 rounded-t-lg text-center' htmlFor="deviceid">پانچ</div>
      <div className='flex w-full gap-5 border border-teal-800 p-4 rounded-l-lg rounded-b-lg'>
        <div className="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
          <label htmlFor="noPunch" className="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">بدون پانچ</label>
          <input 
          id="noPunch" 
          type="radio" 
          name="punch" 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
          onChange={ (e)=>{
            setShowPunched(false)

          }
        }          
        />
        </div>
        <div className="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
          <label htmlFor="punch" className="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">با پانچ</label>
          <input 
          id="punch" 
          type="radio" 
          name="punch" 
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={ (e)=>{
            setShowPunched(true)

          }
        }           />
        </div>
       
        <div className='punchCountDiv hidden flex items-center w-1/3 justify-center rounded dark:border-gray-700'>
      <input class='border rounded-lg p-4' min='1' id='punchcount' name='punchcount'
        type='number' placeholder='تعداد پانچ'
        onChange={(e) => {
          formik.setFieldValue('punchCount',e.target.value)
          setPunchCount(' تعداد پانچ : '+e.target.value+' عدد');
        }
        }
      />
    </div>

      </div>
    </div>
  );
} 

                    
                    if (device.devices[0].lifeh === 1) {
                      setLifehDiv(<div className="flex flex-col mt-4 lifehDiv">
                                    <div className='bg-teal-800 text-white p-3 w-28 rounded-t-lg text-center' htmlFor="deviceid">لیفه</div>
                                    <div className='flex w-full gap-5 border border-teal-800 p-4 rounded-l-lg rounded-b-lg'>
                                    <div class="flex items-center w-1/4 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="bordered-radio-1" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">بدون لیفه</label>
                                    <input id="bordered-radio-1" 
                                    type="radio" 
                                    value="" 
                                    name="bordered-radio" 
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={ (e)=>{
                                      setShowLifehChiled(false)
                                    }}
                                    />
                                    </div><div class="flex items-center w-1/4 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="bordered-radio-1" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">با لیفه</label>
                                    <input id="bordered-radio-1"
                                    type="radio" 
                                    value="" 
                                    name="bordered-radio" 
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                    onChange={ (e)=>{
                                      setShowLifehChiled(true)
                                    }}                                    />
                                    </div>
                                  <div className='lifehChiled w-2/4 flex'></div>
                                    </div>
                                  </div>);
                    }else{
                      setLifehDiv(null)   
                    }
                    
                    if (device.devices[0].stand === 1) {
                      setStandDiv(
                      <div className="flex flex-col mt-4 standDiv">
                                    <div className='bg-teal-800 text-white p-3 w-28 rounded-t-lg text-center' htmlFor="deviceid">نگهدارنده</div>
                                   
                                   
                                    <div className='flex w-full flex-wrap gap-2 border border-teal-800 p-4 rounded-l-lg rounded-b-lg'>

                                    <div class=" flex items-center w-1/4 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">بدون نگهدارنده</label>
                                    <input id="stand-1"
                                     type="radio" 
                                     value="" 
                                     name="stand1" 
                                     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     onChange={ (e)=>{
                                      setShowStandChiled(false,1)
                                    }}
                                    />
                                    </div>
                                    <div class="stand1 flex items-center w-1/5 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="stand-2" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">استند</label>
                                    <input 
                                    onChange={ (e)=>{
                                      setShowStandChiled(true,1)
                                    }}
                                    id="stand-2" type="radio" value="" name="stand2" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div class="stand2 flex items-center w-1/4 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="stand-3" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">رول آپ</label>
                                    <input id="stand-3"
                                    onChange={ (e)=>{
                                      setShowStandChiled(true,2)
                                    }}
                                     type="radio" value="" name="stand3" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div class="stand3 flex items-center w-1/4 justify-center border border-gray-200 rounded dark:border-gray-700">
                                    <label for="stand-4" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">قاب فنری</label>
                                    <input id="stand-4"
                                    onChange={ (e)=>{
                                      setShowStandChiled(true,3)
                                    }}
                                     type="radio" value="" name="stand4" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                   
                                   
                                    <div className='standOptions w-1/3 hidden'>
                                   
                                   
                                    <div class=" items-center w-full justify-center border border-gray-200 rounded dark:border-gray-700  standCountDiv hidden">
                                    <label for="standCount" class="pr-4 w-full py-4 ml-2 text-center text-sm font-medium text-gray-900 dark:text-gray-300">تعداد استند</label>
                                    <input 
                                    id="standCount" 
                                    type="number" 
                                    min="1"
                                    name="standCount" 
                                    onChange={ (e)=>{
                                      setStandShow('تعداد استند : '+ e.target.value + ' عدد')
                                    }}
                                    class="w-full text-gray-600 text-center  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     />
                                    </div>

                                    <div class=" items-center w-full justify-center border border-gray-200 rounded dark:border-gray-700 rulapCountDiv hidden">
                                    <label for="standCount" class="pr-4 w-full py-4 ml-2 text-center text-sm font-medium text-gray-900 dark:text-gray-300">تعداد رول آپ</label>
                                    <input 
                                    id="rulapCount" 
                                    type="number" 
                                    min="1"
                                    name="rulapCount" 
                                    onChange={ (e)=>{
                                      setRulapShow('تعداد رول آپ : '+ e.target.value + ' عدد')
                                    }}
                                    class="w-full text-gray-600 text-center  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     />
                                    </div>
                                    <div class="flex items-center w-full justify-center border border-gray-200 rounded dark:border-gray-700 ghabfanariCountDiv hidden">
                                    <label for="standCount" class="pr-4 w-full py-4 ml-2 text-center text-sm font-medium text-gray-900 dark:text-gray-300">مشخصات قاب فنری</label>
                                    <div className='flex'>
                                    <input 
                                    id="ghabWidth" 
                                    type="number" 
                                    onChange={ (e)=>{
                                      setGhabShow1('طول قاب فنری  : '+ e.target.value + ' سانتی متر')
                                    }}
                                    placeholder='طول'
                                    class="w-full text-gray-600 text-center  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     />
                                     <input 
                                    id="ghabHeight" 
                                    type="number" 
                                    onChange={ (e)=>{
                                      setGhabShow2('عرض قاب فنری  : '+ e.target.value + ' سانتی متر')
                                    }}
                                    placeholder='عرض'
                                    class="w-full text-gray-600 text-center  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     />
                                     <input 
                                    id="ghabCount" 
                                    type="number" 
                                    placeholder='تعداد'
                                    onChange={ (e)=>{
                                      setGhabShow3('تعداد قاب فنری  : '+ e.target.value + ' عدد')
                                    }}
                                    class="w-full text-gray-600 text-center  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                     />
</div>

                                    </div>
                                    

                                    </div>
</div>

                                 
                                  </div>);
                    }else{
                      setStandDiv(null)   
                    }
                    

                    //setDeviceShow('>> جنس مدیا : '+e.label);
                  })
                  .catch(error => {
                    console.log(error);
                  })
              }}
              className="w-full"
          />
            {formik.touched.productid && formik.errors.productid ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.productid}</div> : null}
          </div>
          </div>
      
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="deviceid">نوع دستگاه :</label>
            <div className='flex flex-col w-full'>
            <select
              id="deviceid"
              onChange={ (e)=>{
                setDeviceId(e.target.value)
                formik.setFieldValue('deviceid', e.target.value);
                setDeviceShow(' نوع دستگاه : '+e.target.options[e.target.selectedIndex].text);

              }
            }
              className="border w-full rounded-lg border-gray-400 p-2"
              value={formik.values.deviceid} onBlur={formik.handleBlur} 

            >
              <option value="">انتخاب کنید</option>
              {devices.map(deviced => (
                      <option value={deviced.device_id}>{deviced.device_name}</option>
                  )
                  )} 
              </select>
              {formik.touched.deviceid && formik.errors.deviceid ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.deviceid}</div> : null}
          </div>
</div>
        
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="thickness">ضخامت:</label>
            <div className="flex flex-col w-full">
            <select
              id="thickness"
              onChange={(e)=>{
                  const selectedThickness = e.target.value;
                  formik.setFieldValue('thickness', selectedThickness);

                  setIsLoading(true);
                  setThicknessId(selectedThickness)
                  const defaultOptions = $('#productid').find(option => option.value === parseInt(selectedThickness) )

                    axios.post('https://shirazchap.org/api/getpass?deviceid='+deviceId+'&thicknessid='+selectedThickness+'&productid='+mediaId)
                    .then(response => {
                      console.log(response.data)
                      const thicknesses = response.data;
                      setPass(response.data.pass);
                      setWidth(response.data.width);
                      setTicknesShow(' ضخامت مدیا : '+e.target.options[e.target.selectedIndex].text);
                      setIsLoading(false);
                    })
                    .catch(error => {
                      console.log(error);
                    })
                }}           
                className="border w-full rounded-lg border-gray-400 p-2"
                >
                        <option value="">انتخاب کنید</option>

                  {thicknessesed.map(thicknes => (
                      <option value={thicknes.thickness_id}>{thicknes.thickness_name}</option>
                  )

                  )}  
            </select>
                        {formik.touched.thickness && formik.errors.thickness ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.thickness}</div> : null}
</div>
          </div>
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="quality">کیفیت:</label>
            <div className='flex flex-col w-full'>
            <select
              id="quality"
              onChange={(e) => {
                const selectQuality = e.target.value;
                formik.setFieldValue('quality', selectQuality);
                setPassId(selectQuality);
                setIsLoading(true);
                axios.post('https://shirazchap.org/api/getfee?deviceid='+deviceId+'&thicknessid='+thicknessId+'&productid='+mediaId+'&passid='+selectQuality)
                .then(response => {
                  const thicknesses = response.data;
                  setFee(response.data.fee[0].price)
                  $('#fee').val(response.data.fee[1].price+' تومان')
                  setQualityShow(' کیفیت چاپ : '+e.target.options[e.target.selectedIndex].text);
                  setIsLoading(false);
                })
                .catch(error => {
                  console.log(error);
                })
              }
              }
              className="border w-full rounded-lg border-gray-400 p-2"
            >
              <option value="">انتخاب کنید</option>
              {qualityed.map(pass => (
                      <option value={pass.pass_id}>{pass.pass_name}</option>
                  )

                  )} 

              </select>
                          {formik.touched.quality && formik.errors.quality ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.quality}</div> : null}
</div>
          </div>

          <div className="flex items-center border p-2 rounded-lg mt-2">
            
          <label className='w-1/4' htmlFor="fee">قیمت واحد : </label>
          <div className='flex w-full'>
            <input
            disabled
              type="text"
              id="fee"
              value={null}
              className="border w-full rounded-lg border-gray-400 p-2"
            />
            </div>
          </div>
        
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="width">عرض :</label>
           <div className='flex flex-col w-full'>
            <select
              id="width"
              onChange={(e)=>{
                formik.setFieldValue('width', e.target.value);
                setWidthShow(' عرض : '+e.target.value+' سانتی متر');
              }
            }
              className="border w-full rounded-lg border-gray-400 p-2"
            >
              <option value="">انتخاب کنید</option>
              {width.map(w => (
                      <option value={w}>{w}</option>
                  )

                  )} 
 
              </select>
                          {formik.touched.width && formik.errors.width ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.width}</div> : null}

              </div>
          </div>
          <div className="flex items-center border p-2 rounded-lg mt-2">
            <label className='w-1/4' htmlFor="height">طول :</label>
            <div className='flex flex-col w-full'>
            <input
              type="text"
              id="height"
              onChange={(e)=>{
                formik.setFieldValue('height', e.target.value);
                setHeightShow(' طول : '+e.target.value+' سانتی متر');

                              }
                         }
                className="border w-full rounded-lg border-gray-400 p-2"
            />
                        {formik.touched.height && formik.errors.height ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.height}</div> : null}
</div>
          </div>

          <div className="flex border items-center p-2 rounded-lg">
            <label className=' w-1/4' htmlFor="count">تعداد : </label>
            <div className='flex flex-col w-full'>
            <input
              type="number"
              id="count"
              name='count'
              min={1}
              onChange={(e)=>{

                formik.setFieldValue('count', e.target.value);
                setCountShow(' تعداد : '+e.target.value+' عدد');

                              }
                         }
              value={formik.values.count} onBlur={formik.handleBlur} 
              className="border rounded-lg w-full border-gray-300 p-2"
            />
            {formik.touched.count && formik.errors.count ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.count}</div> : null}
          </div>
          </div>
         
          { laminateDiv }
          { punchDiv }
          { lifehDiv }
          { standDiv}

          <div className="flex flex-col mt-4">
          <div className='bg-teal-800 text-white p-3 w-28 rounded-t-lg text-center' htmlFor="delivery">زمان تحویل</div>
          <div className='flex w-full gap-5 border border-teal-800 p-4 rounded-l-lg rounded-b-lg'>
          <div class="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
          <label for="bordered-radio-1" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">یک روز کاری</label>
          <input id="bordered-radio-1"
          onChange={(e)=>{
            setDeliveryShow('تحویل یک روز کاری');
            formik.setFieldValue('delivery', 0);

          }}
           type="radio"
           name="delivery" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div class="flex items-center w-1/3 justify-center border border-gray-200 rounded dark:border-gray-700">
          <label for="bordered-radio-1" class="pr-4 py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">فوری</label>
          <input id="bordered-radio-1" 
          type="radio" 
          name="delivery" 
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
          onChange={(e)=>{
            setDeliveryShow('تحویل فوری');
            formik.setFieldValue('delivery', 1);

          }}
          />
          </div>
          </div>
          {formik.touched.delivery && formik.errors.delivery ? <div className="text-red-400 text-sm mt-2 w-full">{formik.errors.delivery}</div> : null}

          </div>
          <div className="flex items-center border rounded-lg mt-2">
        
        
   {formik.touched.file && formik.errors.file ? 
   <div onClick={openModal} 
          class="fileDiv w-full h-48 rounded-lg border-dashed border-2 border-red-700 bg-red-100 flex justify-center items-center">
                    <div class="absolute">
                      <div class="flex flex-col items-center">
                        <FaFolderOpen className='text-gray-400 text-8xl' />
                      <span class="block text-red-800 font-normal">جهت انتخاب فایل کلیک کنید</span>
                      </div>
                    </div>
                  </div>


   : 
   <div onClick={openModal} 
          class="fileDiv w-full h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                    <div class="absolute">
                      <div class="flex flex-col items-center">
                        <FaFolderOpen className='text-gray-400 text-8xl' />
                      <span class="block text-gray-400 font-normal">انتخاب فایل</span>
                      <input id='file' type={file} className="hidden" />
                      </div>
                    </div>
                  </div>


   }

        

        <Modal 
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          style={customStyles}
        >
            <div className='w-full p-4 bg-orange-600 text-white text-center rounded-t-md font-bold text-lg'>انتخاب فایل</div>
            <div className='bg-gray-200 p-2' style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(19%, 1fr))", gridGap: "1rem" }}>
            {files.map(file => (
              <div className="w-fit shadow-lg">
              <img className='rounded-t-md h-44 w-full min-w-[200px]' src={ 'https://shirazchap.org/uploads/'+user_id+'/thumb_'+file.name } alt={file.name} />
              <div className='bg-gray-200 ltr rounded-b-md text-center flex flex-col'>
               <span className='text-sm p-2' style={{ direction:"ltr"}}>{ file.name }</span>
               <bottom onClick={() => setFileToOrder(file.name)} class="w-full text-white bg-green-700 p-2 mt-2 rounded-b-md">انتخاب</bottom>              </div>
          </div>

)
                  )} 
            
              
          </div>
        </Modal>
  </div>

  </div>
  <button id='submit' className='hidden' type="submit">ارسال</button>

  </form>
      </div>
      <div className='w-4/12 p-6 grid grid-rows-1 mb-16 bg-white sticky top-20 self-start min-h-[550px]'>
<div className='flex flex-col gap-3'>
{media.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{media}</div>
  }
  {deviceShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{deviceShow}</div>
  }
  {thicknessShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{thicknessShow}</div>
  }
  {qualityShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{qualityShow}</div>
  }
  {widthShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{widthShow}</div>
  }
  {heightShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{heightShow}</div>
  }
  {countShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{countShow}</div>
  }  
  {PounchShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{PounchShow}</div>
  }
  {standShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{standShow}</div>
  }
  {rulapShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{rulapShow}</div>
  }
  {ghabShow1.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{ghabShow1}</div>
  }
  {ghabShow2.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{ghabShow2}</div>
  }
  {ghabShow3.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{ghabShow3}</div>
  }
  {deliveryShow.length >0  &&
  <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{deliveryShow}</div>
  } 
 {laminetShow.length > 0  &&
    <div className='flex gap-2 text-base items-center h-6'><FaChevronCircleLeft className='mt-[5px]' />{laminetShow}</div>
    }

<div className='absolute bottom-4'>مبلغ سفارش : 
  <NumericFormat 
  id='total' 
  value={ totals() } 
  allowLeadingZeros 
  thousandSeparator=","
   />
   تومان
</div>


</div>


  <div onClick={() => $('#submit').click() } className='w-full cursor-pointer bg-teal-800 absolute top-full mt-4 p-3 text-center text-white'>
    بررسی اطلاعات
  </div>

      </div>

  </div>
  </div>
  </LoadingOverlay>
  <Footer />
  </div>
    )

  }
    export default LargeFormatOrderForm;
