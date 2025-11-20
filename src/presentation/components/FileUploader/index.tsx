import React from 'react';
import './style.css';
import { icons } from '../../../resources/constants';
import { v4 as uuid } from 'uuid';

interface FileUploaderProps {
    id?: any,
    fileName?: string,
    icon?: any,
    accept?: string,
    handleFileChange: any
    disable?: boolean
    color?: string
}

const FileUploader = ({ fileName, icon, accept = "file/*", handleFileChange, disable = false, id = uuid(), color = 'rgb(227, 133, 11)' }: FileUploaderProps) => {
    return (
        <div>
            <input type="file" accept={accept} onChange={handleFileChange} id={id} disabled={disable} hidden />
            <label htmlFor={id} className="file-upload-label" style={
                {
                    backgroundColor: color,
                    opacity: 1
                }
            }>
                <img src={icon ? icon : icons.camera} alt="" className="camera-icon" />
                {fileName ? fileName : 'Importer une vidéo'}
            </label>
        </div>
    );
};

export default FileUploader;
