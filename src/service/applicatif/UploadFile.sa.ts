import { UPLOADFILE_BDL } from '../bdl/UploadFile.bdl';

export const UploadFileService = () => {

  const { uploadImage, downloadImage, downloadImageById, testCVVideo } = UPLOADFILE_BDL();

  return {
    uploadImage: (data, token) => 
      uploadImage(data, token)
    ,
    downloadImage: (token: any) => 
      downloadImage(token)
    ,
    downloadImageById: (id, token) =>
      downloadImageById(id, token)
    ,
    testCVVideo: (id: string, token: string) => 
      testCVVideo(id, token)
  }
}
