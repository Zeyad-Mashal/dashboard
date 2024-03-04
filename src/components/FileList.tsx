import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import FileItem from './FileItem';

const FileList = ({ files, removeFile }: any) => {

    const deleteFileHandler = (_name: any) => {
        //api call here
    }

    return (
        <ul className="">

            {
                files.length > 0 && files.map((f: string, idx: number) => (
                    <FileItem
                        key={idx}
                        file={f}
                        deleteFile={removeFile} />))
            }
        </ul>
    )
}

export default FileList