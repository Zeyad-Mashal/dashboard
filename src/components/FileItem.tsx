import React from 'react'
import { PlusOne, DeleteForever } from '@mui/icons-material'
import styles from "../styles/fileupload.module.css"



const FileItem = ({ file, deleteFile }: any) => {

    //const fileName = file.substring(file.lastIndexOf('-') + 1)

    console.log(file)
   // const src = file ? URL.createObjectURL(file) : null;

    return (
        <>
            {/*<li className={styles.fileItem} key={file.name}>
                <p style={{marginLeft:"5px"}}>{fileName}</p>
                <div className={styles.actions}>
                    {file && <DeleteForever color="error"  onClick={() => deleteFile(file.name)} />
                    }
                </div>
            </li>*/}
            <div className={styles.wrapImage} >
                <span className={styles.close} onClick={() => deleteFile(file)} >&times;</span>
                <img src={file} className={styles.img} />
            </div>
        </>
    )
}

export default FileItem