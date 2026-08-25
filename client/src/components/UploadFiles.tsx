import { useState } from "react";
import { uploadFileDIrectlyToS3, UplopadFile } from "../services/upload.service";

function UploadFiles(){
    const [selectedFile, setSelectedFile] = useState<File | null> (null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const file = event.target.files?.[0]

        if (!file) return;

        console.log(file)

        setSelectedFile(file);

        const stream = file.stream();

        console.log(stream);
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        const response = await uploadFileDIrectlyToS3(selectedFile)

        console.log("Upload response", response)
    }

    return (
        <div>
            <input
            type="file"
            onChange={handleFileChange}
            />

            {selectedFile && (
                <div>
                    <h3>Selected File</h3>
                    <p>{selectedFile.name}</p>
                    <p>{selectedFile.type}</p>
                    <p>{selectedFile.size} bytes</p>
                </div>
                
            )}

            <button onClick={handleUpload}>Upload</button>

        </div>
    )
}

export default UploadFiles;