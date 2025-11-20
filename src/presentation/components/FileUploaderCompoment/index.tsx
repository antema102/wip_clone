import React from 'react'
import './style.scss'
import { v4 as uuid } from 'uuid';
import { icons } from '../../../resources/constants'

interface FileUploaderCompoment {
    id?: any,
    img?: any,
    handleFileChange: any
    fileName?: string,
    accept: string,
    label: string,
    type: string,
    file?: any,
    pdfName?: string,
    onPressPdf?: any}

const FileUploaderCompoment = ({ id = uuid(), img, handleFileChange, fileName, label, accept = "file/*", type, file, pdfName, onPressPdf }: FileUploaderCompoment) => {
    return (
        <div className='filesCompoments'>
            <div className='filesCompoments__title'>
                <p>{label}</p>
                {
                    (img || file) &&
                    <label htmlFor={id}>
                        Changer
                    </label>
                }
            </div>
            {
                type === 'images' ?
                    <div className='filesCompoments__content'
                        style={{
                            background: img ? `url(${img})` : "#d9d9d9"
                        }}>
                        {
                            !img &&
                            <label htmlFor={id}>
                                <img src={icons.templateFiles} height={76} width={85} />
                                <div className='filesCompoments__button'>
                                    <span>{fileName}</span>
                                </div>
                            </label>
                        }
                    </div>
                    : type === 'pdf' ? (
                        <div className={`filesCompoments__pdf ${!file ? 'border' : ''}`}>
                            {
                                !file ?
                                    (
                                        <label htmlFor={id}>
                                            <div className='filesCompoments__button'>
                                                <span>{fileName}</span>
                                            </div>
                                        </label>
                                    ) :
                                    <button className='filesCompoments__files' onClick={onPressPdf}>
                                        <img src={icons.pdf} height={35} width={30} />
                                        <div className='filesCompoments__text'>
                                            <p>PDF</p>
                                            <p>{pdfName}</p>
                                        </div>
                                    </button>
                            }
                        </div>
                    ) : <div>Autre</div>
            }
            <input type="file" id={id} name="fileUpload" accept={accept} onChange={handleFileChange} />
        </div>
    )
}

export default FileUploaderCompoment
