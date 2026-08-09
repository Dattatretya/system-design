import { useState } from "react"

function UploadFiles(){
    const [selectedFile, setSelectedFile] = useState<File | null> (null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const file = event.target.files?.[0]

        if (!file) return;

        setSelectedFile(file);
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

        </div>
    )
}

export default UploadFiles;