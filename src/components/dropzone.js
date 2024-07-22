'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileSymlink } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import bytesToSize from "@/src/utils/bytesToSize"

export default function Dropzone({ className }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [filesDropped, setFilesDropped] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFilesDropped(acceptedFiles);
    }, []);

    const removeFile = (file) => {
        setFilesDropped(prevFiles => prevFiles.filter(f => f.path !== file.path));
    };

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
        <>
            {filesDropped.length > 0 ? (
                <div>
                    {filesDropped.map(file => (
                        <div key={file.path} className="relative flex flex-wrap items-center justify-between w-full px-2 py-2 border rounded-xl h-fit ">
                            <strong>{file.path}</strong> - {bytesToSize(file.size)}
                            <div className="text-sm align-middle group hover:bg-red-300 rounded-full w-8 h-8 flex items-center justify-center">
                                <IoIosClose className="size-14 cursor-pointer hover:fill-black"
                                            onClick={() => removeFile(file)}/>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div {...getRootProps({ className })} className={`${className} ${isDragActive || isDraggingOver ? 'dragging' : ''}`}>
                    <input {...getInputProps()} />
                    {isDragActive || isDraggingOver ? (
                        <>
                            <LuFileSymlink className="size-64" />
                            <span>Drop the files here ...</span>
                        </>
                    ) : (
                        <>
                            <FaCloudUploadAlt className="size-64" />
                            <span>Drag & drop some files here, or click to select files</span>
                        </>
                    )}
                </div>
            )}
        </>
    );
}
