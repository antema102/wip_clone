import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

import { icons } from '../../../../resources/constants';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../../../components/Loader';
import { useLang } from '../../../../data/translation';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';
import VideoProgressBar from '../../../components/VideoProgressBar';
import urls from '../../../../data/constants/urls';
import { styles } from './styles';

import './styles.css';

import ReactFlagsSelect from 'react-flags-select';
import { isoAlpha3Map } from '../../../../data/constants/isoAlpha3Map';
import { Toast } from 'primereact/toast';

const ChatWip = () => {
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const location = useLocation();

  const { company } = location.state || {};

  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { accessToken, user } = useSelector(({ auth }) => auth);
  const {
    sendSessionId,
    getUserById,
    postCreateUuid,
    getExternalUSer,
    getPdf,
    updateCv,
  } = UserSA();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isThereprogressStatus, setIsThereProgressStatus] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [messageWaiting, setMessageWaiting] = useState<string>('');
  const [serverResponse, setServerResponse] = useState<string>('');
  const [uuid, setUuid] = useState<string>('');
  const [selected, setSelected] = useState<string>('');
  const [flag, setFlag] = useState<string>('');
  const [isUploadModalVisible, setIsUploadModalVisible] =
    useState<boolean>(false);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [abonnementID, setAbonnementID] = useState<string | null>(null);
  const [dataExternalUser, setDataExternalUser] = useState<string[]>([]);
  const [isCvListModalVisible, setIsCvListModalVisible] =
    useState<boolean>(false);
  const [isLoadingCvList, setIsLoadingCvList] = useState<boolean>(false);
  const [downloadDoc, setDownloadDoc] = useState<boolean>(false);

  const toast = useRef<Toast>(null);

  const handleCreateSessionID = useCallback(
    async (title: string, type: string, flag?: string) => {
      try {
        const response = await sendSessionId(
          accessToken,
          title,
          type == '' ? null : type,
          flag
        );
        return response?.data?.session?.sessionId ?? null;
      } catch (error) {
        return null;
      }
    },
    [accessToken, sendSessionId]
  );

  const handleSendMessage = async () => {
    setisLoading(true);
    const message = textareaRef.current?.value.trim() || '';
    let type: string | null = '';
    let sessionID: string | null = null;
    let enterprise_ids: string | string[] = [];
    let country_ids: string | undefined;
    try {
      if (company === 'flag') {
        if (selected !== '') {
          country_ids = flag;
          type = 'flag';
        } else {
          toast.current?.show({
            severity: 'error',
            summary: activeString.ERROR.EMPTY_FIELD,
            detail: activeString.IA.SELECT_COUNTRY_WARNING,
            life: 10000,
          });
          return;
        }
      } else {
        if (!company || company === '') {
          enterprise_ids = ['WipWork'];
        } else if (company === 'CompanyDefault') {
          type = 'mixte';
          enterprise_ids = ['WipWork', uuid];
        } else {
          type = 'company';
          enterprise_ids = [uuid];
        }
      }
      if (message) {
        sessionID = await handleCreateSessionID(message, type, country_ids);
        if (!sessionID) return;

        if (enterprise_ids !== undefined) {
          navigate(`/chat/${!type || type === '' ? 'c' : type}/${sessionID}`, {
            state: {
              messagesQuerry: message,
              enterprise_ids,
              uuid,
              country_ids,
              abonnementID,
            },
          });
        } else {
          navigate(`/chat/${type}/${sessionID}`, {
            state: {
              messagesQuerry: message,
              enterprise_ids,
              uuid,
              country_ids,
              abonnementID,
            },
          });
        }
      } else if (uploadedFileName) {
        sessionID = await handleCreateSessionID(uploadedFileName, type);
        if (!sessionID) return;
        const stateData = {
          filesName: uploadedFileName,
          filesUploads: uploadedFile,
          enterprise_ids,
          uuid,
          country_ids,
          abonnementID,
        };
        if (enterprise_ids !== undefined) {
          navigate(`/chat/${!type || type === '' ? 'c' : type}/${sessionID}`, {
            state: stateData,
          });
        } else {
          navigate(`/chat/${type}/${sessionID}`, { state: stateData });
        }
      } else {
        toast.current?.show({
          severity: 'error',
          summary: activeString.ERROR.EMPTY_FIELD,
          detail: activeString.IA.ENTER_MESSAGE_OR_FILE,
          life: 10000,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file != null) {
      setUploadedFileName(file.name);
      setUploadedFile(file);
    }
  };

  const hideTheProgressBar = () => {
    setIsThereProgressStatus(false);
    setModalVisible(false);
    setProgressBar(0);
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files != null) {
      const newFiles = Array.from(files);
      setFilesToUpload((prevFiles) => [...prevFiles, ...newFiles]);
    }
    e.target.value = '';
  };

  const handleFileChangeUpload = async () => {
    const enterprise_ids: string = uuid;

    if (filesToUpload.length === 0) {
      toast.current?.show({
        severity: 'warn',
        summary: activeString.ERROR.EMPTY_FIELD,
        detail: activeString.IA.SELECT_FILE_WARNING,
        life: 5000,
      });
      return;
    }
    setIsUploadModalVisible(false);
    setMessageWaiting(activeString.IA.SENDING_FILES);
    setModalVisible(true);
    setIsThereProgressStatus(true);
    setProgressBar(0);

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('enterprise_ids', enterprise_ids);
      try {
        await axios.post(urls.POST_PDF, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-API-Key': 'bf80J843-1e70-1435-a8c1-14e1be58ddbe',
          },
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const total = progressEvent.total || 1;
            const percent = progressEvent.loaded / total;
            const currentFileProgress =
              ((i + percent) / filesToUpload.length) * 100;
            setProgressBar(Math.round(currentFileProgress));
            if (currentFileProgress >= 99) {
              setMessageWaiting(
                `${activeString.IA.PROCESSING_FILE} ${file.name}...`
              );
            }
          },
        });
      } catch (error: any) {
        console.error("Erreur lors de l'upload du fichier :", error);
      }
    }
    setProgressBar(100);
    setMessageWaiting(activeString.IA.ALL_FILES_SENT);
    await new Promise((res) => setTimeout(res, 800));
    setIsThereProgressStatus(false);
    setServerResponse(activeString.IA.SUCCESS_MESSAGE);
    setFilesToUpload([]);
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea != null) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSelect = (code: string) => {
    const iso3 = isoAlpha3Map[code] || code;
    setSelected(code);
    setFlag(iso3);
  };

  useEffect(() => {
    const getUuid = async () => {
      try {
        setisLoading(true);
        const userResponse = await getUserById(user.id, accessToken);
        const existingUuid = userResponse?.data?.enterprise_ids;
        setAbonnementID(userResponse?.data?.abonnementId || null);
        if (existingUuid) {
          setUuid(existingUuid);
        } else {
          const newUuidResponse = await postCreateUuid(accessToken);
          const newUuid = newUuidResponse?.data?.enterprise_ids;
          if (newUuid) {
            setUuid(newUuid);
          } else {
            console.error('Impossible de créer ou récupérer un UUID');
          }
        }
      } catch (error) {
        console.error('Erreur dans getUuid :', error);
      } finally {
        setisLoading(false);
      }
    };
    getUuid();
  }, []);

  const handleGetExternalUser = async () => {
    try {
      setIsLoadingCvList(true);
      setIsCvListModalVisible(true);
      const response = await getExternalUSer(accessToken, uuid);
      setDataExternalUser(response.data.externalUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des CV:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de charger la liste des CV',
        life: 5000,
      });
    } finally {
      setIsLoadingCvList(false);
    }
  };

  const isCompanyAllowed = (companyType: string): boolean => {
    if (!abonnementID) return false;
    const allowedCompanies: Record<string, string[]> = {
      '643e8d24bd0b9b4dfe552f70': [''],
      '643e8da6bd0b9b4dfe55307d': [''],
      '6903247bd4a86732cb6f4f05': ['CompanyDefault', 'company'],
      '69032fe9d4a86732cb6f4f09': ['CompanyDefault', 'company', 'flag'],
    };
    const allowed = allowedCompanies[abonnementID] || [];
    if (!companyType) return true;
    return allowed.includes(companyType);
  };

  const handleGetPDF = async (filePath: string) => {
    try {
      setisLoading(true);
      const fileUrl = await getPdf(accessToken, filePath);
      if (typeof fileUrl === 'string' && fileUrl.trim() !== '') {
        if (filePath.toLowerCase().endsWith('.pdf')) {
          window.open(fileUrl, '_blank');
        } else {
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = filePath.split('/').pop() || 'fichier';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setDownloadDoc(true);
        }
      } else {
        console.warn('URL de fichier invalide ou vide');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du fichier :', error);
    } finally {
      setisLoading(false);
    }
  };

  const handleDeleteCV = async (pointId: string) => {
    try {
      setIsLoadingCvList(true);
      await updateCv(accessToken, pointId, { enterprise_ids: ['WipWork'] });
      toast.current?.show({
        severity: 'success',
        summary: 'Succès',
        detail: 'CV supprimé avec succès',
        life: 5000,
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du CV:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de supprimer le CV',
        life: 5000,
      });
    } finally {
      setIsLoadingCvList(false);
    }
  };

  return (
    <>
      <Toast ref={toast} position="bottom-left" />
      {isLoading && <Loader />}
      {/* Modal pour afficher les CV */}
      <Dialog
        animationType="fade"
        transparent
        visible={isCvListModalVisible}
        onRequestClose={() => {
          setIsCvListModalVisible(false);
        }}
      >
        <div
          className="cv-list-overlay"
          onClick={() => {
            setIsCvListModalVisible(false);
          }}
        >
          <div
            className="cv-list-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="cv-list-header">
              <div className="cv-list-icon">📚</div>
              <h2 className="cv-list-title">{activeString.IA.CV_LIST_TITLE}</h2>
              <p className="cv-list-subtitle">
                {activeString.IA.CV_LIST_SUBTITLE}
              </p>
            </div>
            <div className="cv-list-content">
              {isLoadingCvList ? (
                <div className="cv-list-empty">
                  <div className="cv-list-empty-icon">⏳</div>
                  <p className="cv-list-empty-text">
                    {activeString.IA.LOADING}
                  </p>
                </div>
              ) : dataExternalUser && dataExternalUser.length > 0 ? (
                dataExternalUser.map((cv: any, index: number) => (
                  <div key={index} className="cv-item">
                    <div className="cv-item-info">
                      <div className="cv-item-icon">📄</div>
                      <div className="cv-item-text">
                        <p className="cv-item-name">
                          {cv.last_name} {cv.first_name || `CV ${index + 1}`}
                        </p>
                        <p className="cv-item-date">
                          {cv.timestamp
                            ? new Date(cv.timestamp).toLocaleDateString()
                            : 'Date non disponible'}
                        </p>
                      </div>
                    </div>
                    <div className="cv-item-actions">
                      <a
                        href={cv.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-item-view"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#2563eb',
                          fontWeight: 600,
                          textDecoration: 'none',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: '#f1f5ff',
                          transition: 'background 0.2s',
                        }}
                        title="Voir le CV"
                        onClick={async () => {
                          await handleGetPDF(cv.storage_path);
                        }}
                      >
                        <img
                          src={icons.eye}
                          alt="Voir"
                          height={24}
                          style={{ cursor: 'pointer' }}
                        />
                      </a>
                      <a
                        href="#"
                        className="cv-item-download"
                        onClick={async () => {
                          await handleDeleteCV(cv.point_id);
                        }}
                      >
                        <img
                          src={icons.deletes}
                          alt="Supprimer"
                          height={24}
                          style={{ cursor: 'pointer' }}
                        />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="cv-list-empty">
                  <div className="cv-list-empty-icon">📭</div>
                  <p className="cv-list-empty-text">
                    {activeString.IA.CV_LIST_EMPTY}
                  </p>
                  <p className="cv-item-date">
                    {activeString.IA.CV_LIST_EMPTY_SUBTITLE}
                  </p>
                </div>
              )}
            </div>
            <div className="cv-list-actions">
              <button
                className="cv-list-close-btn"
                onClick={() => {
                  setIsCvListModalVisible(false);
                }}
              >
                {activeString.IA.CLOSE}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        animationType="fade"
        transparent
        visible={isUploadModalVisible}
        onRequestClose={() => {
          setIsUploadModalVisible(false);
          setFilesToUpload([]);
        }}
      >
        <div
          className="upload-modal-overlay"
          onClick={() => {
            setIsUploadModalVisible(false);
            setFilesToUpload([]);
          }}
        >
          <div
            className="upload-modal-container"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="upload-modal-header">
              <div className="upload-modal-icon">📤</div>
              <h2 className="upload-modal-title">
                {activeString.IA.UPLOAD_CV}
              </h2>
              <p className="upload-modal-subtitle">
                {activeString.IA.UPLOAD_CV_SUBTITLE}
              </p>
            </div>
            <div className="upload-modal-content">
              {filesToUpload.length === 0 ? (
                <label htmlFor="file-upload-input" className="upload-drop-zone">
                  <div className="upload-drop-zone-icon">📁</div>
                  <p className="upload-drop-zone-text">
                    {activeString.IA.CLICK_TO_SELECT}
                  </p>
                  <p className="upload-drop-zone-subtext">
                    {activeString.IA.SUPPORTED_FORMATS}
                  </p>
                  <input
                    id="file-upload-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleFileSelection}
                    style={{ display: 'none' }}
                  />
                </label>
              ) : (
                <>
                  <div className="upload-file-list">
                    {filesToUpload.map((file, index) => (
                      <div key={index} className="upload-file-item">
                        <div className="upload-file-info">
                          <div className="upload-file-icon">📄</div>
                          <p className="upload-file-name">{file.name}</p>
                        </div>
                        <button
                          className="upload-file-remove"
                          onClick={() => {
                            setFilesToUpload((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <label
                    htmlFor="file-upload-input"
                    className="upload-drop-zone"
                    style={{ marginTop: '16px', padding: '16px' }}
                  >
                    <div
                      className="upload-drop-zone-icon"
                      style={{ fontSize: '32px', marginBottom: '8px' }}
                    >
                      ➕
                    </div>
                    <p
                      className="upload-drop-zone-text"
                      style={{ fontSize: '14px' }}
                    >
                      {activeString.IA.ADD_MORE_FILES ||
                        'Ajouter plus de fichiers'}
                    </p>
                    <input
                      id="file-upload-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={handleFileSelection}
                      style={{ display: 'none' }}
                    />
                  </label>
                </>
              )}
            </div>
            <div className="upload-modal-actions">
              <button
                className="upload-modal-btn upload-modal-btn--cancel"
                onClick={() => {
                  setIsUploadModalVisible(false);
                  setFilesToUpload([]);
                }}
              >
                {activeString.IA.CANCEL}
              </button>
              <button
                className="upload-modal-btn upload-modal-btn--confirm"
                onClick={handleFileChangeUpload}
                disabled={filesToUpload.length === 0}
              >
                {activeString.IA.UPLOAD} ({filesToUpload.length})
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {isThereprogressStatus ? (
          <div style={styles.centeredView}>
            <VideoProgressBar
              progressBar={progressBar}
              waitingText={messageWaiting}
              goBack={hideTheProgressBar}
            />
          </div>
        ) : (
          <div style={styles.centeredView}>
            <div style={styles.modalView}>
              <span style={styles.modalText}>{serverResponse}</span>
              <button
                style={[styles.button, styles.buttonClose]}
                onClick={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <span style={styles.textStyle}>{activeString.IA.CLOSE}</span>
              </button>
            </div>
          </div>
        )}
      </Dialog>
      <div className="chat">
        <div className="chat__container">
          {isLoading ? (
            <Loader />
          ) : !isCompanyAllowed(company) ? (
            <div className="chat__intro">
              <div className="subscription-notice">
                <span
                  className="subscription-notice__icon"
                  role="img"
                  aria-label="Cadenas"
                >
                  🔒
                </span>
                <p className="subscription-notice__title">
                  {activeString.IA.ABONNEMENT}
                </p>
                <p className="subscription-notice__text">
                  {activeString.IA.SUBSCRIPTION_NOT_AVAILABLE}
                </p>
                <p className="subscription-notice__subtext">
                  {activeString.IA.UPGRADE_PLAN}
                </p>
                <button
                  onClick={() => {
                    navigate('/subscription');
                  }}
                  className="subscription-notice__button"
                >
                  ⭐ {activeString.IA.UPGRADE_BUTTON}
                </button>
              </div>
            </div>
          ) : (
            <>
              {!company || company === '' ? (
                <div className="chat__intro">
                  <p className="chat__intro-title">{activeString.IA.TITLE}</p>
                  <p className="chat__intro-subtitle">
                    {activeString.IA.SUB_TITLE}
                  </p>
                </div>
              ) : company === 'CompanyDefault' ? (
                <div className="chat__intro">
                  <p className="chat__intro-title">{activeString.IA.TITLE}</p>
                  <p className="chat__intro-subtitle">
                    {activeString.IA.DESCRIPTION_COMBINEE}
                  </p>
                  <div className="upload-cv-section">
                    <button
                      className="button__cv"
                      onClick={() => {
                        setIsUploadModalVisible(true);
                      }}
                    >
                      📄 {activeString.IA.UPLOAD_CV}
                    </button>
                    <p className="upload-cv-description">
                      {activeString.IA.ENRICH_CVTHEQUE}
                    </p>
                  </div>
                  <div className="upload-cv-section">
                    <button
                      onClick={handleGetExternalUser}
                      className="button__cv button__cv--view"
                    >
                      📚 {activeString.IA.VIEW_CV_BUTTON}
                    </button>
                    <p className="upload-cv-description">
                      {activeString.IA.VIEW_CV_BUTTON_DESCRIPTION}
                    </p>
                  </div>
                </div>
              ) : company === 'company' ? (
                <div className="chat__intro">
                  <p className="chat__intro-title">{activeString.IA.TITLE}</p>
                  <p className="chat__intro-subtitle">
                    {activeString.IA.DESCRIPTION_CV}
                  </p>
                  <div className="upload-cv-section">
                    <button
                      className="button__cv"
                      onClick={() => {
                        setIsUploadModalVisible(true);
                      }}
                    >
                      📄 {activeString.IA.UPLOAD_CV}
                    </button>
                    <p className="upload-cv-description">
                      {activeString.IA.ENRICH_CVTHEQUE}
                    </p>
                  </div>
                  <div className="upload-cv-section">
                    <button
                      onClick={handleGetExternalUser}
                      className="button__cv button__cv--view"
                    >
                      📚 {activeString.IA.VIEW_CV_BUTTON}
                    </button>
                    <p className="upload-cv-description">
                      {activeString.IA.VIEW_CV_BUTTON_DESCRIPTION}
                    </p>
                  </div>
                </div>
              ) : company === 'flag' ? (
                <div className="chat__intro">
                  <p className="chat__intro-title">{activeString.IA.TITLE}</p>
                  <p className="chat__intro-subtitle">
                    {activeString.IA.DESCRIPTION_FLAG}
                  </p>
                  <div className="chat__flags-container">
                    <ReactFlagsSelect
                      selected={selected}
                      onSelect={handleSelect}
                      className="flags"
                      fullWidth={true}
                      placeholder={activeString.IA.SELECT_COUNTRY}
                      countries={['FR', 'MG']}
                    />
                  </div>
                </div>
              ) : null}
              {abonnementID && (
                <div className="chat__content">
                  <div className="chat__composer">
                    <div className="chat__input-row">
                      <label
                        className="chat__add"
                        aria-label="Ajouter un fichier"
                      >
                        +
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                        <span className="chat__tooltip">
                          {activeString.IA.UPLOAD}
                        </span>
                      </label>
                      {!uploadedFileName ? (
                        <textarea
                          ref={textareaRef}
                          className="chat__textarea"
                          placeholder={activeString.IA.PLACEHOLDER}
                          rows={1}
                          onInput={handleInput}
                          onKeyDown={handleKeyDown}
                        />
                      ) : (
                        <div className="chat__file-info">
                          <p className="chat__filename">
                            📎 {uploadedFileName}
                          </p>
                          <button
                            type="button"
                            className="chat__clear-file"
                            onClick={() => {
                              setUploadedFileName(null);
                              setUploadedFile(null);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      )}
                      <button
                        className="chat__send-button"
                        onClick={handleSendMessage}
                        aria-label="Envoyer"
                      >
                        <img
                          src={icons.send}
                          height={14}
                          width={14}
                          alt="Envoyer"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatWip;
