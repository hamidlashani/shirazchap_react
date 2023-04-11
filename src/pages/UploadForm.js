import React, { useState , useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import $ from 'jquery';
import Cookies from "js-cookie";


registerPlugin(FilePondPluginImagePreview, FilePondPluginFilePoster, FilePondPluginFileValidateType);

const UploadForm = () => {
  let token = Cookies.get("_token");
  if(!token){
    window.location.href = "/login"; 
  }
  
      let user_id = Cookies.get("user_id");

      
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  
  
  useEffect(() => {
    axios
      .get("https://shirazchap.org/api/getfiles?userid="+user_id)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);
  



  function fileremove(id)  {
    axios
      .post("https://shirazchap.org/api/delimg?id="+id)
      .then((response) => {
        $('#filepond--item-'+id).hide()
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
  const handleUpdateFiles = (fileItems) => {
   // setFiles(fileItems.map(fileItem => fileItem.file));
  };
  
  const handleFileProcessed = (error, file) => {
    if (!error) {
      // Remove file after it has been processed
      $('#filepond--item-'+file.id).hide()
const responseObject = JSON.parse(file.serverId);
const uploadedFileInfo = responseObject.images[1];
const entries = Object.entries(uploadedFileInfo);
       setUploadedFiles([...uploadedFiles,entries]);
            } else {
      console.log(error);
    }
  };
  
  return (
    <div>
      <Header />


      <div className="mt-10 w-5/6 m-auto justify-center min-h-screen ">

      <div class="text-red-500 bg-white border m-auto rounded-lg w-full p-4 mb-2 leading-10 text-right" >همکار گرامی لطفا قبل از بارگذاری فایل به نکات زیر توجه فرمایید.
  <br/>  1- رزولیشن فایلهای لارج فرمت 72 پیکسل بر اینچ، فایلهای پلات 300 پیکسل بر اینچ
  <br/> 2- مد رنگی  CMYK
  </div>


        <div className="bg-white p-6 rounded-lg shadow-md w-full m-auto">
          <FilePond
            className="w-full flex"
            name="files"
            onupdatefiles={handleUpdateFiles}
            acceptedFileTypes="image/jpeg"
            labelIdle='`<div className="filepond--drop-area w-full flex justify-center border border-dashed p-10 ">
            <div>فایل خود را کشیده و اینجا رها کنید و یا
              کلیک کنید
              </div>
          </div>`'
            server={{
              url: 'https://shirazchap.org/api/upload?userid='+user_id,
              process: {
                headers: {
                },
              },
            }}
            allowMultiple={true}
            onprocessfile={handleFileProcessed}
          >
            
          </FilePond>
          <div className="files-list">
            
          {uploadedFiles.map((file, index) => (
            
              <div
                key={index}
                className="file-item w-full grid-cols-2 grid mb-2 shadow-md p-2 border border-gray-100 hover:shadow-2xl"
              >
                <img
                  src={'https://shirazchap.org/uploads/'+user_id+'/thumb_'+file[0][1]}
                  alt={file[0][1]}
                  className="file-thumbnail rounded-lg"
                />
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{file[0][1]}</div>
                  <button
                    className="file-delete-button"
                    onClick={() => file.remove()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}{files.map((file, index) => (
              <div
                id={'filepond--item-'+file.id}
                className="file-item w-full grid-cols-2 grid mb-2 shadow-lg p-2 border border-gray-100 hover:shadow-2xl"
              >
                <img
                  src={'https://shirazchap.org/uploads/'+user_id+'/thumb_' + file.name}
                  alt={file.name}
                  className="file-thumbnail rounded-lg"
                />
                <div className="file-info">
                <div class="text-right line text-sm leading-8">
                  <p>نام فایل : <span>{file.name}</span></p>
                  <p>وضوح فایل : <span>{file.dpi} پیکسل</span></p>
                  <p>سایز به پیکسل :  <span class="text-orange">{file.width} در {file.height}</span></p>
                  <p>سایز در وضوح {file.dpi}  دی پی آی: <span class="text-orange">
                  { Math.round(file.width*2.54/file.dpi,2)+' در ' +Math.round(file.height*2.54/file.dpi,2)} سانتی متر
                  </span></p>
                  <p>حجم فایل:  <span class="text-orange">: {file.file_size} مگا بایت</span></p>
                  <p>حالت رنگ : <span class="text-orange">
                    {file.mod} 
                  </span></p>
</div>
                  <button
                    className="bg-red-500 text-white rounded-md px-3 py-2 mt-2"
                    onClick={() => fileremove(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
                    }
                    
                    export default UploadForm;