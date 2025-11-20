import axios from 'axios';

export const displayVideoWithProgress = async (
  url,
  token,
  setDownloadProgressBar
) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setDownloadProgressBar(percentCompleted);
      },
    });
    const blob = response.data;
    return URL.createObjectURL(blob);
  } catch (error) {
    return catchError(error);
  }
};

export const displayPDF = async (url: string, data: any, token: any) => {
  try {
    const response = await axios.post(url, data, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const blob = response.data;
    return { uri: URL.createObjectURL(blob) };
  } catch (error) {
    return catchError(error);
  }
};

export const uploadAnyFileToServer = async (
  url: string,
  token: string,
  fileName: string,
  fileType: string,
  dataUri,
  setProgressBar: any
) => {
  try {
    const formData = new FormData();
    const blob = await fetch(dataUri).then(
      async (response) => await response.blob()
    );
    formData.append('file', blob);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const contentLength = response.headers.get('content-length');

    const reader = new FileReader();

    reader.onloadend = () => {
      const uploaded = reader.result?.toString().length || 0;
      const progress = (uploaded / contentLength) * 100;
      setProgressBar(Math.floor(progress));
    };

    reader.readAsDataURL(blob);

    return response;
  } catch (error) {
    return null;
  }
};

export const catchError = (error) => {
  let data;
  let status = 500;
  if (error?.response) {
    data = error?.response?.data;
    status = error?.response?.status;
  }
  return { data, status };
};

export default {
  catchError,
  displayVideoWithProgress,
  uploadAnyFileToServer,
  displayPDF,
};
