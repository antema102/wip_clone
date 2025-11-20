import api from '../technique/api';
import urls from '../../data/constants/urls';
import { displayVideoBlob, getFileById } from '../technique/uploadFile';
import Compressor from 'compressorjs';

export const UPLOADFILE_BDL = () => ({
  uploadImage: async (file, token) => {
    const formData = new FormData();

    // Compress the image using Compressor.js
    const compressedImage = await new Promise<File | Blob>(
      (resolve, reject) => {
        return new Compressor(file, {
          quality: 0.2, // Adjust the quality as needed
          success(result) {
            resolve(new File([result], file.name, { type: result.type }));
          },
          error(error) {
            reject(error);
          }});
      }
    );
    formData.append('file', compressedImage);

    try {
      await fetch(urls.UPLOAD_AVATAR, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`},
        body: formData});
    } catch (error) {}
  },
  downloadImage: async (token) =>
    await displayVideoBlob(urls.DOWNLOAD_AVATAR, token),
  downloadImageById: async (id, token) =>
    await getFileById(urls.DOWNLOAD_AVATAR, id, token),
  testCVVideo: async (id: string, token: string) =>
    await api.get(`${urls.TEST_CV_VIDEO}/${id}`, token)});
