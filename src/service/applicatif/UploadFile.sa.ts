import { UPLOADFILE_BDL } from '../bdl/UploadFile.bdl';

export const UploadFileService = () => {
  const { uploadImage, downloadImage, downloadImageById, testCVVideo } =
    UPLOADFILE_BDL();

  return {
    uploadImage: async (data, token) => {
      await uploadImage(data, token);
    },
    downloadImage: async (token: any) => await downloadImage(token),
    downloadImageById: async (id, token) => await downloadImageById(id, token),
    testCVVideo: async (id: string, token: string) =>
      await testCVVideo(id, token),
  };
};
