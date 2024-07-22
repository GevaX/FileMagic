'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileSymlink } from "react-icons/lu";

export default function Dropzone({ className }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [filesDropped, setFilesDropped] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setFilesDropped(true);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        const handleDragOver = (event) => {
            event.preventDefault();
            setIsDraggingOver(true);
        };

        const handleDragLeave = () => {
            setIsDraggingOver(false);
        };

        const handleDrop = () => {
            setIsDraggingOver(false);
        };

        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('dragleave', handleDragLeave);
        document.addEventListener('drop', handleDrop);

        return () => {
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('dragleave', handleDragLeave);
            document.removeEventListener('drop', handleDrop);
        };
    }, []);

    return (
        <div {...getRootProps({ className })} className={`${className} ${isDragActive || isDraggingOver ? 'dragging' : ''}`}>
            <input {...getInputProps()} />
            {
                isDragActive || isDraggingOver ? (
                    <>
                        <LuFileSymlink className="size-64" />
                        <span>Drop the files here ...</span>
                    </>
                ) : filesDropped ? (
                    <>
                        <span>Files dropped successfully!</span>
                    </>
                ) : (
                    <>
                        <FaCloudUploadAlt className="size-64" />
                        <span>Drag & drop some files here, or click to select files</span>
                    </>
                )
            }
        </div>
    );
}