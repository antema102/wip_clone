export const displayVideoBlob = async (url, token) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`}});
  
      if (response.ok) {
        return response.blob();
      }
    } catch (error) {
      return null;
    }
  };
  
  export const displayVideoWithProgress = async (url, token, setDownloadProgressBar) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`}});
  
      if (response.ok) {
        const totalBytes = response.headers.get('Content-Length');
        const reader = response.body.getReader();
  
        let receivedBytes = 0;
        let chunks = [];
  
        while (true) {
          const { done, value } = await reader.read();
  
          if (done) {
            break;
          }
  
          chunks.push(value);
          receivedBytes += value.length;
          const progress = Math.floor((receivedBytes / totalBytes) * 100);
          setDownloadProgressBar(progress);
        }
  
        const blob = new Blob(chunks);
        return blob;
      }
    } catch (error) {
      return catchError(error);
    }
  };
  
  export const getFileById = async (url, id, token) => {
    try {
      const response = await fetch(`${url}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`}});
  
      if (response.ok) {
        return response.blob();
      }
    } catch (error) {
      return null;
    }
  };
  
  export const uploadAnyFileToServer = async (
    url,
    token,
    fileName,
    fileType,
    dataUri,
    setProgressBar
  ) => {
    try {
      const formData = new FormData();
      formData.append('file', dataUri, fileName);
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`},
        body: formData});
  
      if (response.ok) {
        return response;
      }
    } catch (error) {
      return null;
    }
  };
  
  export const catchError = error => {
    let data, status = 500;
    if (error?.response) {
      data = error?.response?.data;
      status = error?.response?.status;
    }
    return { data, status };
  };
  
  export default {
    catchError,
    displayVideoBlob,
    uploadAnyFileToServer,
    displayVideoWithProgress};
  