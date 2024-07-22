'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileSymlink } from "react-icons/lu";
import bytesToSize from "@/src/utils/bytesToSize"

export default function Dropzone({ className }) {
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [filesDropped, setFilesDropped] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFilesDropped(acceptedFiles);
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
        <>
            {filesDropped.length > 0 ? (
                <div>
                    {filesDropped.map(file => (
                        <div key={file.path} className="relative flex flex-wrap items-center justify-between w-full px-4 py-4 space-y-2 border cursor-pointer lg:py-0 rounded-xl h-fit lg:h-20 lg:px-10 lg:flex-nowrap">
                            <strong>{file.path}</strong> - {bytesToSize(file.size)}
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
