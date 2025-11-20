import './styles.scss';
import React, { useRef, useState, useCallback, useEffect } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { UserSA } from '../../../service/applicatif/User.sa';
import { COLORS, icons } from '../../../resources/constants';
import Loader from '../Loader';
import { useSelector } from 'react-redux';

import { useLang } from '../../../data/translation';
import * as stringsEn from '../../../data/constants/strings_en';
import * as stringsFr from '../../../data/constants/strings';

import Popup from '../CreateCV/Popup';
import { getCountryNameFromISO3 } from '../../../service/technique/utils';

type Message = { type: 'user' | 'bot' | "ai"; text: string; results?: string[] };

const ChatSearch = () => {
    const { sessionId } = useParams<{ type: string, sessionId: string }>();

    const location = useLocation();

    const { filesName, filesUploads, messagesQuerry, enterprise_ids: stateEnterpriseIds, uuid, country_ids, abonnementID } = location.state || {};

    const url = location.pathname;

    const { createIA, getIA, getPdf, getUserById, getCountryBySessionId } = UserSA();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const accumulatedBotMessage = useRef<string>('');
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);
    const [hasSentMessage, setHasSentMessage] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const { accessToken, user } = useSelector(({ auth }) => auth);
    const hasSentFirstMessage = useRef(false);

    const [searchResults, setSearchResults] = useState<string[][]>([]);
    const [downloadDoc, setDownloadDoc] = useState<boolean>(false);
    const [uuidCompany, setUuidCompany] = useState<string>(uuid ?? '');

    const [abonnementIdState, setAbonnementIdState] = useState<string | null>(abonnementID ?? null);
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

    const [flag, setFlag] = useState<string>(country_ids ?? '');
    const { lang } = useLang();

    const activeString = lang === 'fr' ? stringsFr : stringsEn;
    const handleIA = useCallback(async (sessionId: string, file?: File | null, query?: string, enterprise_ids?: string[], country_ids?: string) => {
        try {
            setIsLoading(true);
            accumulatedBotMessage.current = '';
            setMessages(prev => [...prev, { type: 'ai', text: '', results: [] }]);
            let currentPaths: string[] = [];
            await createIA(accessToken, sessionId, file || undefined, query, enterprise_ids, country_ids, (message) => {
                accumulatedBotMessage.current = message;
                const regex = /data-storage-path="([^"]+)"/g;
                const storagePaths: string[] = [];
                let match;
                while ((match = regex.exec(message)) !== null) {
                    if (!storagePaths.includes(match[1])) {
                        storagePaths.push(match[1]);
                    }
                }
                if (storagePaths.length > 0) {
                    currentPaths = storagePaths;
                }
                setMessages(
                    prev => {
                        const updated = [...prev];
                        const lastBotIndex = updated.map(m => m.type).lastIndexOf('ai');
                        if (lastBotIndex !== -1) {
                            updated[lastBotIndex] = {
                                ...updated[lastBotIndex],
                                text: message,
                                results: currentPaths
                            };
                        }
                        return updated;
                    });
            });
            if (currentPaths.length > 0) {
                setSearchResults(prev => [...prev, currentPaths]);
            }
        } catch (error) {
            console.error('Erreur IA :', error);
        } finally {
            setIsLoading(false);
        }
    }, [createIA]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFileName(file.name);
            setUploadedFile(file);
            if (textareaRef.current) {
                textareaRef.current.value = '';
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleSendFristMessage = async (messages: string, files: File, filesName: string, enterprise_ids: string[], country_ids: string) => {
        if (!messages && !files) return;
        if (!sessionId) return;
        if (files) {
            setMessages((prev) => [...prev, { type: 'user', text: `📎 ${activeString.IA.DOCUMENT_SENT} : ${filesName}` }]);
            setUploadedFileName(null);
        } else if (messages) {
            setMessages((prev) => [...prev, { type: 'user', text: messages }]);
        }
        if (textareaRef.current) {
            textareaRef.current.value = '';
            textareaRef.current.style.height = 'auto';
        }
        setHasSentMessage(true);
        await handleIA(sessionId, files, messages, enterprise_ids, flag);
        setUploadedFile(null);
    };

    const handleSendMessage = async () => {
        let enterprise_ids: string[] = stateEnterpriseIds || []
        if (url) {
            if (url.startsWith('/chat/c/')) {
                enterprise_ids = ["WipWork"];
            }
            else if (url.startsWith('/chat/mixte/')) {
                enterprise_ids = ["WipWork", uuidCompany];
            }
            else if (url.startsWith('/chat/company/')) {
                enterprise_ids = [uuidCompany];
            }
            else if (url.startsWith('/chat/flag/')) {
                enterprise_ids = [];
            }
        }
        const message = textareaRef.current?.value.trim() || '';
        if (!message && !uploadedFile) return;
        if (!sessionId) return;
        if (uploadedFileName) {
            setMessages((prev) => [...prev, { type: 'user', text: `📎 ${activeString.IA.DOCUMENT_SENT} : ${uploadedFileName}` }]);
            setUploadedFileName(null);
        } else if (message) {
            setMessages((prev) => [...prev, { type: 'user', text: message }]);

        }

        textareaRef.current!.value = '';
        textareaRef.current!.style.height = 'auto';
        setHasSentMessage(true);
        await handleIA(sessionId, uploadedFile, message, enterprise_ids, flag);
        setUploadedFile(null);
    };

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatBotMessage = (text: string) => {
        let formatted = text;
        formatted = formatted.replace(/<ignore>/g, '');
        formatted = formatted.replace(/<!-- START: hidden metadata -->[\s\S]*?<!-- END: hidden metadata -->/g, '<br/><br/>');

        const sectionTitles = [
            'Expériences professionnelles',
            'Coordonnées',
            'Expériences professionnelles clés (liées au poste recherché)',
            'Diplômes (pertinents uniquement)',
            'Compétences techniques ou transversales majeures',
            'Score de correspondance',
            'Diplômes',
        ];
        sectionTitles.forEach((section) => {
            const regex = new RegExp(`${section}`, 'g');
            formatted = formatted.replace(
                regex,
                `<br/><br/><strong>${section} :</strong>`
            );
        });
        formatted = formatted.replace(/-\s*/g, '');
        formatted = formatted.replace(/\*(.*?)/g, '');
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formatted = formatted.replace(/^###\s*(.*)$/gm, '<strong>$1</strong>');
        formatted = formatted.replace(/(Score de correspondance\s*: :\s*[0-9]+\/[0-9]+)/g, '$1<br/>----------------------------');

        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        formatted = formatted.replace(/(<br\/>){2}/g, '<br/><br/>');

        return formatted.trim();
    };
    const mapHistoryToMessages = (history: any[]) => {
        return history.map((item) => {
            const type = item.type === 'human' ? 'user' : item.type === 'ai' ? 'ai' : 'user';
            const text = item.content;
            let results: string[] = [];
            if (type === 'ai') {
                const regex = /data-storage-path="([^"]+)"/g;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    if (!results.includes(match[1])) {
                        results.push(match[1]);
                    }
                }
            }
            return { type, text, results };
        }) as Message[];
    };

    const handleGetIa = async () => {
        if (!sessionId) return;
        setIsLoadingPdf(true);

        try {
            const response = await getIA(accessToken, sessionId);
            if (Array.isArray(response)) {
                const formattedMessages = mapHistoryToMessages(response);
                setMessages(formattedMessages);
            }

            const userResponse = await getUserById(user.id, accessToken);
            const existingUuid = userResponse?.data?.enterprise_ids;

            if (!abonnementIdState) {
                const existingAbonnementId = userResponse?.data?.abonnementId;
                setAbonnementIdState(existingAbonnementId);
            }
            if (existingUuid) {
                setUuidCompany(existingUuid);
            }
            try {
                const countryResponse = await getCountryBySessionId(accessToken, sessionId);
                const existingCountry = countryResponse?.data?.country;
                if (existingCountry) {
                    setFlag(existingCountry);
                }
            } catch (error) {

            }
        } catch (error) {
            console.error('Erreur IA :', error);
        } finally {
            setIsLoadingPdf(false);
            setIsInitialLoading(false);
        }
    };

    const handlePdf = async (filePath: string) => {
        try {
            setIsLoadingPdf(true);
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
            setIsLoadingPdf(false);
        }
    };

    useEffect(() => {
        if (!hasSentFirstMessage.current) {
            if (messagesQuerry || filesUploads) {
                handleSendFristMessage(messagesQuerry, filesUploads, filesName, stateEnterpriseIds, country_ids);
                setIsInitialLoading(false);
            } else {
                handleGetIa();
            }
            hasSentFirstMessage.current = true;
            navigate(location.pathname, { replace: true, state: {} });
        } else {
            handleGetIa();
        }
    }, [sessionId]);

    const isChatTypeAllowed = (): boolean => {
        if (!abonnementIdState) return false;
        const allowedChatTypes: { [key: string]: string[] } = {
            '643e8d24bd0b9b4dfe552f70': ['/chat/c/'],
            '643e8da6bd0b9b4dfe55307d': ['/chat/c/'],
            '6903247bd4a86732cb6f4f05': ['/chat/c/', '/chat/mixte/', '/chat/company/'],
            '69032fe9d4a86732cb6f4f09': ['/chat/c/', '/chat/mixte/', '/chat/company/', '/chat/flag/']};
        const allowed = allowedChatTypes[abonnementIdState] || ['/chat/c/'];
        return allowed.some(path => url.startsWith(path));
    };

    return (
        <>
            {isLoadingPdf && <Loader />}
            <Popup
                message={activeString.IA.FILE_DOWNLOADED}
                visible={downloadDoc}
                btnTitle={activeString.IA.OK}
                validation={setDownloadDoc}
            />

            <div className="chatbot">
                <p className="chatbot__title">
                    <strong>{activeString.IA.CHAT}</strong>
                </p>
                <div className="chatbot__content">
                    <div className={`chatbot__messages ${hasSentMessage ? 'height' : ''}`}>
                        {flag && (
                            <p>
                                {activeString.IA.SEARCHING_COUNTRY}{' '}
                                <span className="chatbot__country-info">
                                    {getCountryNameFromISO3(flag)}
                                </span>
                            </p>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}`}>
                                {msg.type === 'bot' || msg.type === 'ai' ? (
                                    <>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: formatBotMessage(msg.text)}}
                                        />
                                        {msg.results && msg.results.length > 0 && (
                                            <div className="chatbot__cv">
                                                <p>{activeString.IA.CV}</p>
                                                <div>
                                                    {msg.results.map((pdfPath, pdfIndex) => (
                                                        <button
                                                            key={pdfIndex}
                                                            onClick={() => handlePdf(pdfPath)}
                                                        >
                                                            {activeString.IA.CANDIDATE} {pdfIndex + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <span>{msg.text}</span>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chatbot__message chatbot__message--bot">
                                {activeString.IA.LOADING}
                            </div>
                        )}
                    </div>
                    {
                        isInitialLoading ? null : abonnementIdState && isChatTypeAllowed() ? (
                            <div className="chat__content chatSearch__content">
                                <div className="chat__composer">
                                    <div className="chat__input-row">
                                        <label className="chat__add" aria-label="Ajouter un fichier">
                                            +
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                            />
                                            <span className="chat__tooltip">{activeString.IA.UPLOAD}</span>
                                        </label>
                                        {!uploadedFileName ? (
                                            <textarea
                                                ref={textareaRef}
                                                className="chat__textarea"
                                                placeholder={activeString.IA.PLACEHOLDER}
                                                rows={1}
                                                onInput={handleInput}
                                                onKeyDown={handleKeyDown}
                                                disabled={isLoading}
                                            />
                                        ) : (
                                            <div className="chat__file-info">
                                                <p className="chat__filename">📎 {uploadedFileName}</p>
                                                <button
                                                    type="button"
                                                    className="chat__clear-file"
                                                    onClick={() => { setUploadedFileName(null); setUploadedFile(null); }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                        <button
                                            className="chat__send-button"
                                            onClick={handleSendMessage}
                                            aria-label="Envoyer"
                                            disabled={isLoading}
                                        >
                                            {isLoading ?
                                                <img src={icons.carre} height={14} width={14} alt='stop' />
                                                :
                                                <img src={icons.send} height={14} width={14} alt="Envoyer" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) :
                            <div className='abonnement-warning'>
                                <div className='abonnement-warning__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                </div>
                                <p className='abonnement-warning__text'>
                                    {activeString.IA.CONTINUE_CHAT_SUBSCRIPTION}
                                </p>
                                <button
                                    className='abonnement-warning__button'
                                    onClick={() => navigate('/subscription')}
                                >
                                    {activeString.IA.UPGRADE_BUTTON}
                                </button>
                            </div>
                    }
                </div>
            </div>

        </>
    )
}

export default ChatSearch
