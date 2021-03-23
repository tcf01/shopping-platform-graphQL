import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import './fileUpload.scss';


// const MAXIMUM_UPLOAD_LIMIT = 5

// let readyToUploadQueue = [];


/* const openUploadWidget = widget => {
    if (widget.open) {
        widget.open()
    } else {
        console.log('no open function')
    }
} */
/* 
const preCheckUploadValid = (libCbFunc, data) => {
    const uploadImagesNum = imagePaths.length + data.files.length;

    readyToUploadQueue = readyToUploadQueue.concat(data.files);


    if (uploadImagesNum > MAXIMUM_UPLOAD_LIMIT) {
        console.error(`can only upload ${MAXIMUM_UPLOAD_LIMIT} images, now is ${uploadImagesNum} `)
        libCbFunc({ cancel: true })
    } else {
        console.log('####1', readyToUploadQueue, imagePaths)
        readyToUploadQueue = [];
        libCbFunc()
    }
} */


/* const uploadWidgetConfig = {
    sources: ['local', 'url'],
    cloudName: process.env.REACT_APP_CLOUD_NAME,
    uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
    maxFiles: 10,
    showCompletedButton: true,
    folder: 'seller_products_visual_content',
    clientAllowedFormats: ["png", "gif", "jpeg"],
    preBatch: preCheckUploadValid
} */


const FileUpload = ({ handleImageOnChange, recentImage, maximumUpload }) => {
    const [imagePaths, setImagePaths] = useState([])
    
    console.log(imagePaths)
    /*  const initWidget = useCallback(() => {
         return window.cloudinary.createUploadWidget({ ...uploadWidgetConfig }, (error, result) => {
             const isValidResultExist = !error && result !== undefined;
 
             if (isValidResultExist && result.event === "queues-end") {
                 const successfulUploadedImages = result.info.files.reduce((acc, fileInfo) => {
                     const necessaryImageInfo = {
                         assetId: fileInfo.uploadInfo.asset_id,
                         path: fileInfo.uploadInfo.secure_url
                     }
 
                     acc.push(necessaryImageInfo)
 
                     return acc
                 }, [])
 
                 imagePaths = imagePaths.concat(successfulUploadedImages)
             }
 
             if (isValidResultExist && result.event === "close") {
                 handleOnImageChange(imagePaths);
             }
         })
     }, [])
 
     const widget = initWidget(); */

    useEffect(() => {
        setImagePaths(recentImage)
    }, [recentImage])


    const onDrop = useCallback(
        files => {
            handleImageOnChange(files)
        }
        , [handleImageOnChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const inputPropsFromDropzone = {
        ...getInputProps(),
        onChange: e => handleImageOnChange(e.target.files)
    }

    return (
        <>
            <div {...getRootProps()} maxFiles={maximumUpload} className={`dropzone ${isDragActive && "isActive"}`}>
                <input {...inputPropsFromDropzone} />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
            </div>
        </>
    );


    /* return (
        <div className='upload-button' onClick={() => openUploadWidget(widget)}>
            Upload Images
        </div>
    ) */
}


export default React.memo(FileUpload);
