import React, {useMemo} from 'react';
import { useDropzone } from 'react-dropzone';

function Test1(props) {

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#eeeeee",
        borderStyle: "dashed",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "border .24s ease-in-out"
    };

    const activeStyle = {
        borderColor: "#2196f3"
    };

    const acceptStyle = {
        borderColor: "#00e676"
    };

    const rejectStyle = {
        borderColor: "#ff1744"
    };

    const { 
        acceptedFiles, 
        getRootProps, 
        getInputProps, 
        isDragActive, 
        isDragAccept, 
        isDragReject 
    } = useDropzone({ accept: "image/*"});

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject]
    );

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes - {file.name} - {file.type} - {file.lastModified}
        </li>
    ));

    return (
        <main className="main">
            <div {...getRootProps({ style })} >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here or click to select files</p>
            </div>
            <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
            </aside>     
        </main>
    )
}

export default Test1
