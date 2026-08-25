import { useEffect, useState } from "react"
import type { FileMetaData } from "../types/file.types"
import { getFiles, getFileDownloadUrl } from "../services/file.service";

function FileList(){
    const [files, setFiles] = useState<FileMetaData[]>([])

    useEffect(()=>{
        async function loadFiles(){
            const result = await getFiles();

            setFiles(result)
        }
        loadFiles();
    },[]);

    return (
        <div>
            <h2>Uploaded Files</h2>
            {files.map((file)=>(
                <div key={file.id}>
                    <p>{file.originalName}</p>
                    <p>{file.mimeType}</p>
                    <p>{file.size} bytes</p>
                    <button
                        onClick={async ()=>{ const url = await getFileDownloadUrl(file.id)
                            window.open(url, "_blank")
                        }}
                    >
                        Open
                    </button>
                </div>
            ))}
        </div>
    )
}

export default FileList;