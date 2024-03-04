import React, { useState } from 'react'
import { Add } from "@mui/icons-material"
import axios, { AxiosRequestConfig } from 'axios';
import { useAppSelector } from '../store/store';
import styles from "../styles/fileupload.module.css"
import config from '../utils/config';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _, { isNull } from "lodash";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import FileItem from './FileItem';
import CircularProgress from '@mui/material/CircularProgress';


const FileUpload = ({ files, setFiles, percent, setPercent, setError, removeFile }: any) => {

    const { accessToken } = useAppSelector((state) => state.auth);
    const [selectedFiles, setSelectedFiles] = React.useState<any[]>([]);
    const [isUpLoading, setIsUpLoading] = useState<boolean>(false);

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            // Do something with the progress details
            let percent = Math.floor(loaded * 100 / total);
            console.log(`${loaded} kb of ${total}kb | ${percent}%`)
            setPercent(percent);
        },
    };

    const uploadFile = async (file: any, index: any) => {

        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post<{ url: string }>(config.ADMIN_API + `/upload`, formData, {
            headers: {
                //@ts-ignore
                "Authorization": 'Bearer ' + JSON.parse(accessToken),
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;
                // Do something with the progress details
                let percent = Math.floor(loaded * 100 / total);
                console.log(`${loaded} kb of ${total}kb | ${percent}%`)
                setPercent(percent);
            }
        });
        return res.data.url;
    }


    const uploadHandler = async (event: any) => {

        setIsUpLoading(true)
        const chosenFiles = Array.prototype.slice.call(event.target.files);
        setSelectedFiles([...selectedFiles, ...chosenFiles])

        try {
            const fileUploads = chosenFiles.map((file, i) => uploadFile(file, i));

            const uploadedFiles = await Promise.all(fileUploads);

            setFiles([...files, ...uploadedFiles]);
            setIsUpLoading(false)
        } catch (error) {
            console.log(error)
            console.log('some files failed to upload');
            setTimeout(() => {
                setError("Failed to upload the image")
            }, 5000)
        }
    }


    const deleteFile = (fileName: string) => {
        console.log(fileName)
        setFiles(files.filter(file => file !== fileName))
    }

    return (
        <>
            {files.length <= 5 &&

                <div className={styles.fileCard}>
                    <div className={styles.fileInputs}>
                        <input
                            type="file"
                            accept='image/*'
                            multiple
                            onChange={uploadHandler} />
                        <button className={styles.uploadBtn}>
                            <i>
                                <CloudUploadIcon />
                            </i>
                            Upload
                        </button>
                    </div>
                    <p className="">JPG, JPEG, PNG(Supported files)</p>
                </div>

            }

            <div className={styles.wrapImage}  >
                {percent > 0 && percent < 100 ? <LinearProgress /> : null}
                {isUpLoading

                    ? <CircularProgress /> :
                    files.length > 0 && files.map((f: string, idx: number) => (
                        <FileItem
                            key={idx}
                            file={f}
                            percent={percent}
                            deleteFile={deleteFile} />))

                }

             
            </div>
        </>
    )
}

export default FileUpload