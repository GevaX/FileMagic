"use client";
import ReactDropzone from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Dropzone() {
    return (
        <ReactDropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag drop some files here, or click to select files</p>
                    </div>
                </section>
            )}
        </ReactDropzone>
    );
}