'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuFileSymlink } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import bytesToSize from "@/src/utils/bytesToSize";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fileToIcon from "@/src/utils/fileToIcon";
import Truncate from 'react-truncate-inside';
import convert from "@/src/utils/convert";
import loadFfmpeg from "@/src/utils/load-ffmpeg";

const extensions = {
    image: [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "bmp",
        "webp",
        "ico",
        "tif",
        "tiff",
        "svg",
        "raw",
        "tga",
    ],
    video: [
        "mp4",
        "m4v",
        "mp4v",
        "3gp",
        "3g2",
        "avi",
        "mov",
        "wmv",
        "mkv",
        "flv",
        "ogv",
        "webm",
        "h264",
        "264",
        "hevc",
        "265",
    ],
    audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export default function Dropzone({ className }) {
    const accepted_files = {
        "image/*": [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".bmp",
            ".webp",
            ".ico",
            ".tif",
            ".tiff",
            ".raw",
            ".tga",
        ],
        "audio/*": [],
        "video/*": [],
    };
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [filesDropped, setFilesDropped] = useState([]);
    const ffmpegRef = useRef(null);

    const load = async () => {
        const ffmpeg_response = await loadFfmpeg()
        ffmpegRef.current = ffmpeg_response
    }

    const onDrop = useCallback(acceptedFiles => {
        setFilesDropped(acceptedFiles);
    }, []);

    const onReject = useCallback(rejectedFiles => {
        const fileNames = rejectedFiles.map(rejectedFile => rejectedFile.file.path).join(', ');
        toast.error(
            <div>
                <span style={{ fontWeight: "bold" }}>Error while uploading file(s): {fileNames}</span><br />
                <span>Allowed file formats: images, video and audio</span>
            </div>,
            {
                position: "bottom-right",
                theme: "colored",
                autoClose: false
            }
        );
    }, []);

    const removeFile = (file) => {
        setFilesDropped(prevFiles => prevFiles.filter(f => f.path !== file.path));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, onDropRejected: onReject, accept: accepted_files });

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

    const getFileType = (extension) => {
        for (const [type, exts] of Object.entries(extensions)) {
            if (exts.includes(extension)) {
                return type;
            }
        }
        return null;
    };

    const getOptionsForFileType = (fileType) => {
        if (!fileType) return [];
        if (fileType === 'video') {
            return extensions["video"].concat(extensions["audio"]).map(extension => (
                <option key={extension} value={extension}>{extension}</option>
            ));
        }
        if (fileType === 'audio') {
            return extensions["audio"].map(extension => (
                <option key={extension} value={extension}>{extension}</option>
            ));
        }
        if (fileType === 'image') {
            return extensions["image"].map(extension => (
                <option key={extension} value={extension}>{extension}</option>
            ));
        }
    }

    const getInitialState = () => {
        const value = "";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleConvert = async () => {
        await load();
        for (const file of filesDropped) {
            const { url, output } = await convert(ffmpegRef.current, file, value);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = output;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    };

    return (
        <>
            {filesDropped.length > 0 ? (
                <>
                    <div className="p-10">
                        {filesDropped.map(file => {
                            const fileExtension = file.path.split('.').pop().toLowerCase();
                            const fileType = getFileType(fileExtension);
                            const options = getOptionsForFileType(fileType);
                            return (
                                <div key={file.path} className="relative flex flex-wrap items-center justify-between w-[600px] px-2 py-2 border rounded-xl h-fit ">
                                    <span className="text-2xl text-orange-600">
                                        {fileToIcon(fileType)}
                                    </span>
                                    <b><Truncate text={file.path} width="250"/></b><span className="text-sm text-slate-400">{bytesToSize(file.size)}</span>
                                    <select value={value} onChange={handleChange}>
                                        <option value=""></option>
                                        {options}
                                    </select>
                                    <div className="text-sm align-middle group hover:bg-red-300 rounded-full w-8 h-8 flex items-center justify-center">
                                        <IoIosClose className="size-14 cursor-pointer hover:fill-black"
                                                    onClick={() => removeFile(file)}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="bg-white text-black justify-center rounded-lg text-2xl px-2 hover:bg-gray-400" onClick={handleConvert}>Convert</button>
                </>
            ) : (
                <div {...getRootProps({className})} className={`${className} ${isDragActive || isDraggingOver ? 'dragging' : ''}`}>
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