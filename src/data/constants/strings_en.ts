import { NOTFOUND } from 'dns';

export const HOME = {
  WELCOME: 'Welcome to your WIP work world!',
  BEGIN: 'To get started, please  :',
  PARCOURS: 'Enter your background - CV',
  PRESENTATION: 'Introduce yourself in video',
  PREFERENCE: 'Choose your preferences :',
  REDIRECT: 'Create your account',
  INFORMATIONS: 'Not registered ?',
  LOGIN_TITLE:
    'WIP work, the app that brings you closer to your dream job or the perfect talent in just one click !',
  WARNING:
    'Please finalize the creation of your candidate profile by adding your video presentation',
  THANKYOU: 'Thank you for your credit purchase on Wipwork !',
  CANCEL: 'Your credit purchase has been canceled',
  LOGOUT: 'Logout',
  HELP: 'Help'};

export const STATUS = {
  PASSWORD_SUCCESS: 'Password changed successfully',
  PASSWORD_FAIL: 'Failed to change your password',
  EMAIL_SUCCES: 'Email modified successfully',
  EMAIL_FAIL: 'Failed while editing your email',
  DESACTIVATE_ACCOUNT_SUCCESS: 'Your account has been successfully deactivated',
  DESACTIVATE_ACCOUNT_FAIL: 'Failed to deactivate your account',
  SEARCH_FAIL: 'Failed while searching',
  SEARCH_SUCCESS: 'Search successfully',
  OFFER_SUCCESS: 'Creation of the successful offer',
  BOOST_SUCCESS: 'Congratulations, your offer has been boosted',
  ADVERTISEMENT_SUCCESS: 'Your ad has been created',
  TENDER_DELETE_SUCCESS: 'Your call for tender has been deleted',
  POST_SUCCESS: 'Your classified ad has been created',
  TENDER_SUCCESS: 'Your call for tender has been created',
  ADVERTISEMENT_EDIT_SUCCESS: 'Your post has been edited',
  ADVERTISEMENT_DELETE_SUCCESS: 'Your post has been deleted',
  ADVERTISEMENT_FAIL: 'Failed to create ad',
  OFFER_FAIL: 'Failed to create offer',
  OFFER_UPDATE_SUCCES: 'Offer modified successfully',
  OFFER_UPDATE_FAIL: 'Failed to edit your offer',
  OFFER_DELETE_SUCCES: 'Offer successfully deleted',
  OFFER_DELETE_FAIL: 'Failed to delete your offer'};

export const SEARCH_STATUT = {
  FIND_OFFER: 'Search offer',
  FIND_CANDIDATE: 'Candidate search'};

export const TEXT_INFORMATIONS = {
  ENTERPRISE_CHECKBOX:
    'I declare on my honor that the information about my company and future job offers posted on WIPwork is accurate and truthful. I undertake to respect the legal and regulatory obligations in force. I am warned that any false declaration may result in legal action. You can consult our ',
  CANDIDAT_CHECKBOX:
    'I declare on my honor that the above information is accurate and true. I undertake to respect the legal and regulatory obligations in force. I am warned that any false declaration may result in legal action. You can consult our ',
  ACCOUNT_DELETION: 'Are you sure you want to delete your account? ? ',
  FILE_SAVED: 'Congratulations, the file has been successfully uploaded'};

export const ENTERPRISE_INFORMATIONS = {
  MODIFICATION_SUCCEED: 'The changes have been added',
  PAYMENT_CONTACT:
    'Cost of contacting a candidate: 5,000 WIP will be deducted from my balance',
  PAYMENT_BOOST:
    'Boost cost of an offer: 50,000 WIP will be deducted from my balance',
  ABOUT_THE_COMPANY: 'About the company :',
  YEAR_OF_CREATION: 'Year of creation :',
  WORKERS_NUMBERS: 'Number of staff :',
  HEADQUARTERS: 'establishment address :',
  URL: 'Your business URL :',
  EMAIL: 'Company email address :',
  PHONE_NUMBER: 'Company telephone number :',
  UNDO: 'Cancel',
  VALIDATE: 'To validate',
  TITLE: 'My information',
  MORE_INFORMATIONS: 'Additional Information',
  CHANGE: 'To modify',
  PAYMENT_SUCCES: 'Transaction completed successfully',
  PAYMENT_FAIL: 'Transaction error, please try again later',
  ABONNEMENT_SUCCES:
    'Congratulations, your purchase has been successfully completed',
  WAITING: 'Please wait while your purchase is processed.',
  SUBSCRIPTION_ACTIVE_AGAIN: 'Your subscription is active again.',
  ALREADY_SUBSCRIBED:
    'You already have a current subscription, please cancel your old subscription first before purchasing a new one.',
  EMPTY: 'Your favorites list is empty.'};

export const RESET_PASSWORD = {
  USER_DOES_NOT_EXIST:
    'The email address you entered does not correspond to any user of the WIP work platform',
  USER_DOES_EXIST:
    'The recovery email has indeed been sent, we invite you to check your email box',
  WRONG_FORMAT: 'The email is not in the correct format, please re-enter',
  SEND_BUTTON: 'Send recovery email',
  RESEND_BUTTON: 'Resend validation code',
  CONFIRM_BUTTON: 'Confirm validation code',
  RESEND_MESSAGE: 'The validation code has indeed been returned'};

export const CONTACT_CANDIDAT = {
  MESSAGE_TITLE: 'RESPONSE FOLLOWING YOUR APPLICATION',
  MESSAGE_SENT:
    'Congratulations, the candidate has indeed received your request',
  MESSAGE_NOT_SENT:
    'The candidate you tried to contact is not currently an active member of our platform',
  ZERO_NOTIFICATION: 'Notification',
  NO_PHONE_PHONENUMBER: 'Sorry, no numbers available at the moment',
  ZERO_NOTIFICATION_TEXT: 'No notification for now.',
  NOTIFICATION_TITLE: 'Notification'};

export const CONTACT_ENTERPRISE = {
  MESSAGE_TITLE: 'SEND AN APPLICATION',
  MESSAGE_SENT:
    'Congratulations, the company you applied to has received your application',
  MESSAGE_NOT_SENT:
    'Congratulations, you have applied for the offer but the company you applied to is not currently active',
  MESSAGE_DECLINE: 'You have withdrawn from the offer',
  COMPLETE_THE_CV_FIRST: 'Please complete your CV here first, before applying',
  APPLY: 'Apply for the offer',
  RESIGN: 'Don’t apply anymore',
  UNDO: 'Cancel'};

export const RESUME_VIDEO = {
  PRESENTATION: 'Introduce yourself on video',
  LOREM_IPSUM:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus pellentesque ametsit. ',
  ADVICE: 'Before turning on your camera, we advise you to :',
  SAVE: 'I record my presentation',
  IMPORT: 'Import my presentation',
  INSPIRE: 'Get inspired by Marie’s presentation video',
  DISPLAY: 'View my current presentation',
  NEW_SAVE: 'Take a new presentation',
  NEW_IMPORT: 'Import a new presentation',
  WELCOMING: 'My video presentation',
  CONGRATULATION:
    'Congratulations, your video presentation has indeed been added',
  NO_CV_MESSAGE:
    'Please first complete your CV before presenting yourself on video',
  WAITING: 'Please wait while the video is uploaded',
  WAITING_WHILE_DOWNLOADING:
    'Please wait while the video presentation downloads',
  MAX_DURATION_REACHED:
    'Sorry, your video presentation is too long, please upload a video of maximum 2 minutes.',
  MAX_DURATION_REACHED_ENTERPRISE:
    'Sorry, your video presentation is too long, please upload a shorter video, less than 30 seconds.'};

export const HOME_COMPANY = {
  HISTORY_CHAT: 'History of your searches chat IA',
  HISTORY: 'History of your searches',
  TENDER: 'Call for tender available :',
  TENDER_CANDIDAT: 'Calls for tenders',
  ALL_HISTORY: 'All your history',
  ACTIVITY: 'Activities on your offers',
  ALL_OFFERS: 'All your offers',
  NOTE: 'Easily find a candidate who matches your search criteria',
  WIPWORK_ONLY: 'Analysis and research based on Wipwork',
  COMBINED_SEARCH: 'Combined Search : Wipwork ',
  CV_LIBRARY: 'CV Library Analysis'};
export const NEWS = {
  WARN: 'You have not yet recorded your video presentation.',
  EXPIRED: 'Your session has expired, please log in again first',
  SUBSCRIPTION_EXPIRED:
    'Your subscription is no longer valid, please log in again first',
  ADVICE:
    'Please save your video resume, or upload your video so that your information can be valid.'};

export const TAB = {
  NEWS: 'News',
  OFFERS: 'Job offers',
  ANNOUNCES: 'Offers'};

export const TENDER = {
  CONFIRMATION_TENDER: 'Are you sure you want to delete this tender?',
  CONFIRMATION_AD: 'Are you sure you want to remove this ad?',
  CONFIRMATION_POST: 'Are you sure you want to delete this classified ad?'};

export const ACCOUNT_CANDIDAT = {
  KREDIT: 'Credit my account',
  SUP: 'Delete my account',
  MES_SOLDES: 'My balance',
  ABONNEMENT: 'Your subscription has expired. Renew it now.',
  CURRENT_SUBSCRIPTION: 'Your current subscription is'};

export const PreferenceTAB = {
  OFFERS: 'Job offers',
  FORMATIONS: 'Training'};

export const HEADER = {
  INFO_APP: 'About the app',
  LOGOUT: 'Sign out'};

export const DETAIL_PROFIL = {
  MON_CV: 'My CV',
  MA_PRESENTATION_VIDEO: 'My video presentation',
  MES_SAUVEGARDES: 'My saved selections',
  MON_COMPTE: 'My account',
  PETITES_ANNONCES: 'My ads',
  MON_INFO: 'My information',
  GESTION_PUBLICITES: 'Advertising management',
  GESTION_APPEL_OFFRE: 'Job management',
  CAMERA_UNAVAILABLE: 'Camera not available on device',
  PERMISSION: 'Permission not satisfied',
  CHOOSE_IMAGE: 'Please choose an image !',
  I_AM_AVAILABLE: 'I am available',
  SUCCESS_UPLOAD: 'recording completed',
  FAILED_UPLOAD: 'Registration failed',
  DEFAULT_PHONE_NUMBER: '0341230012',
  PHONE_TITLE: 'Contact by phone',
  MAIL_TITLE: 'Contact by Email',
  NOTIFICATION_TITLE: 'Notify via WIP work',
  WEB_TITLE: 'Contact on the web',
  PORTFOLIO: 'View my online portfolio',
  HEADER_AD:
    'Consult the advertisements that you have published on the WIP work platform',
  HEADER_POST:
    'Consult the classified ads that you have published on the WIP work platform',
  HEADER_TENDER:
    'Consult the calls for tenders that you have published on the WIP work platform',
  HEADER_AD_TITLE: 'Manage your advertising',
  HEADER_TENDER_TITLE: 'Manage your calls for tenders',
  HEADER_POST_TITLE: 'Manage your ads',
  UPLOAD_OK: 'Image update successfully',
  NOTFOUND_TEXT_ADS: 'No advertisement has been recorde',
  NOTFOUND_TEXT_ANNONCE: 'No classified ad has been recorded.',
  NOTFOUND_SUBTEXT_ANNONCE: 'Add a classified ad',
  NOTFOUND_SUBTEXT_ADS: 'Add an advertisement.',
  NOTFOUND_APPEL_OFFERS: 'No call for tenders',
  STATUS: 'My account status'};

export const OFFERS = {
  ALL: 'All offers',
  OFFER: 'Offers',
  LAST: 'The latest offers',
  OFFERT_LAST: 'Training ,Internship ,Alternance',
  NO_CANDIDATE: 'No candidate',
  APPLIED: 'applied',
  NO_OFFER: 'No offer available'};

export const PRESENTATION_VIDEO = {
  ENREGISTRER: 'Save new presentation',
  IMPORTER: 'Import new presentation',
  DEFAULT_URLS:
    'https://static.videezy.com/system/resources/previews/000/006/983/original/MR8_5629.mp4'};

export const ABOUT_COMPANY = {
  JOB: 'How to create a job offer?',
  TRAINING: 'How to create training?',
  CALL_FOR_TENDER: 'How to create a Call for Tender?',
  TARGET: 'How to create targeted or non-targeted advertising?'};

export const ABOUT_CANDIDAT = {
  CV: 'How do I enter my CV?',
  PRESENTATION: 'How to make a video presentation?',
  ANNOUNCEMENT: 'How to place a classified ad?'};

export const FIND_TALENT_C = {
  TITLE_C: 'Find talent !',
  TEXT_C:
    'Please enter your criteria as well as the prioritization level for each criterion'};

export const ERROR = {
  EMPTY_EMAIL: 'Email required',
  FILE_TOO_LARGE: 'Please add a shorter video file less than 30 seconds.',
  FILE_TOO_LARGE_OFFER: 'Please add a shorter video file less than 10 seconds.',
  FILE_TOO_HEAVY: 'Please add a lighter video file less than 10MB.',
  EMPTY_PWD: 'Password required',
  EMPTY_FIELD: 'Required Field',
  EMPTY_IMAGE: 'Please add an image',
  EMPTY_PICK: 'Please select a value',
  EMPTY_PICK_PDF: 'Please import a pdf file',
  EMAIL_INVALID: 'Enter a valid email',
  CONFIRM_PWD: 'Passwords must be the same',
  EMPTY_ENTREPRISE: 'Mandatory business',
  INVALID_PWD: 'Your password must contain at least 8 characters',
  UNREACHABLE_SERVER:
    'The server is temporarily unavailable. please try again later.',
  NETWORK_ERROR: 'To use the application please connect to the internet.',
  SUBSCRIPTION_ALREADY_EXIST:
    'You already have a current subscription, please wait for it to expire before you can recharge it.',
  NOT_ENOUGH_MONEY:
    'You cannot purchase this offer, please check your account balance !'};

export const INSCRIPTION = {
  CREATE: 'Create your account',
  SUCCESS: 'Registration successfully completed',
  WAITING:
    'Your account has indeed been created and is being verified and validated. The administration will inform you as soon as your account is validated.',
  ALREADY_HAVE_ACCOUNT: 'Already have an account ? ',
  CONNECT: 'Log in',
  ERR_MESSAGE_DUPLICATE_KEY:
    'An account has already been registered at this address, please use another email to register.',
  PUT_STAT_VALID: 'Enter a valid stat, 17 digits',
  PUT_NIF_VALID: 'Enter a valid file',
  PASSWORD: 'PASSWORD',
  CONFIRM_PASSWORD: 'CONFIRM PASSWORD',
  CONTINUE: 'CONTINUE',
  MAIL: 'MAIL',
  ENTERPRISE: 'THE COMPANY'};

export const DELETION = {
  TITLE: 'Account deletion',
  COMPANY:
    'The deletion of your account is permanent. When you delete your WIP account, you can no longer recover any content or information that you have shared on our platform. Deleting your account will result in the deletion of job offers, training, advertisements and personal information.',
  CANDIDATE:
    'The deletion of your account is permanent. When you delete your WIP account, you can no longer recover any content or information that you have shared on our platform. Deleting your account will result in the deletion of your CV, video CV, classified ads and personal information',
  CONFIRMATION_TITLE: 'Delete account',
  AUTHENTICATION: 'Please enter your password : ',
  DELETION_SUCCES: 'Your account has been successfully deleted',
  BUTTON_CONFIRM: 'Confirm account deletion'};

export const ROLEACCOUNT = {
  candidate: 'candidate',
  company: 'company'};
export const HISTORY = {
  candidate: 'candidate',
  company: 'company',
  NAME: 'Name :',
  LEVELS: 'Levels :',
  SEARCH_HISTORY: 'Easily find the history of your searches',
  TITLE_HISTORY: 'Vos historiques'};

export const SEARCHENT_RESULT = {
  FIND_COMPANY_THAT_ARE_HIRING:
    'Find companies recruiting according to your profile',
  NO_RESULT_FOUND: 'No positions found'};

export const NEWS_DETAILS = {
  NO_RESULT_FOUND: 'No news found'};

export const NEWS_INFORMARIONS = {
  SEE_MORE: 'Learn more...'};

export const MATCHING = {
  FILL_THE_FIELD: 'Please complete the fields indicated as required !',
  FILL_AT_LEAST_ONE: 'Please meet at least one criterion !',
  ERROR_SALARY:
    'Le salaire brut maximum (Ariary) doit être supérieur au salaire brut minimum (Ariary)',
  ERROR_AGE: 'The maximum age must be greater than the minimum age'};

export const FIND_TALENT_FORM = {
  TITLE_HEADERSCREEN: 'Find talent',
  DESCRIPTION_HEADERSCREEN:
    'Please enter your criteria as well as the prioritization level for each criterion'};

export const STRING_ALL = {
  REQUIRED_FIELD: 'This field is required.',
  CONFIRMATION: 'An email containing a validation code has just been sent to ',
  FOLLOW: 'Follow us on :'};

export const ENTERPRISE_OFFER = {
  CREATION: 'Creation',
  SIMILAR_OFFERS: 'Offres similaires',
  ABOUT_COMPANY: 'About the company',
  YOUR_TASK: 'Your task',
  DESCRIPTION: 'Description',
  LIEU: 'Location',
  THEME: 'Theme',
  PAYANT: 'Paid',
  TRAVAIL: 'Work',
  CONTRACT: 'Contract',
  PRIX: 'Price',
  PROFIL: 'Profile',
  DUREE: 'Duration',
  TELEPHONE: 'Phone',
  EXPERIENCE: 'Experience',
  EMAIL: 'Email',
  SALAIRE_BRUTE: 'Gross salary',
  MORE_PLUS: 'Learn more',
  PUBLICATION_DATE: 'Publication date : ',
  BOOSTED_OFFER: 'Boosted Offer',
  BOOST_THIS_OFFER: 'Boost This Offer',
  DELETE_MY_TRAINING: 'Delete My Training',
  DELETE_MY_OFFER: 'Delete My Offer',
  MODIFY: 'Modify',
  YOUR_TASKS: 'Your tasks',
  NUMBER_OF_CANDIDATES_VIEWED_YOUR_OFFER:
    'Number of candidates who viewed your offer',
  STATISTICS: 'Statistics',
  VIEW: 'views'};

export const APPEL_OFFRE = {
  TITLE_OFFERS: 'List of calls for tenders'};

export const NOTIFICATION = {
  RECEIPT: 'RECEIPT OF APPLICATION'};

export const FORMATIONS = {
  NOT_FOUND:
    'You have not yet posted any internships, training, or apprenticeships.'};

export const SUBSCRIPTION = {
  LIST_OF_PACKS: 'LIST OF PACKS WIP',
  LIST_OF_SUBSCRIPTIONS: 'LIST OF SUBSCRIPTIONS'};
export const PAGINATOR = {
  NEXT: 'Next',
  PREVIOUS: 'Previous'};
export const IA = {
  TITLE: 'Find top talent using AI',
  SUB_TITLE: 'Keyword or Job Description Search (PDF/DOCX)',
  PLACEHOLDER: 'Ask your question',
  CHAT: 'Find top talent with AI – start the conversation!',
  CV: 'Resumes matching your search',
  UPLOAD: 'Upload your job descriptions',
  ABONNEMENT: 'Please upgrade your subscription to access the AI service.',
  DESCRIPTION_COMBINEE: 'Match Your CVs to Our Database',
  DESCRIPTION_CV: 'Search Profiles in Your CV Library',
  DESCRIPTION_FLAG: 'Find ideal candidates in the country of your choice thanks to our international CV library',
  UPLOAD_CV: 'Upload your CV',
  UPLOAD_CV_MODAL_TITLE: 'Upload CVs',
  UPLOAD_CV_MODAL_SUBTITLE: 'Add CVs (.pdf, .docx) to your database to enrich your talent search.',
  NO_FILE_SELECTED: 'No file selected',
  ADD_FILES: 'Add files',
  CANCEL: 'Cancel',
  UPLOAD_FILES: 'Upload',
  CLOSE: 'Close',
  SENDING_FILES: 'Sending files in progress...',
  PROCESSING_FILE: 'Processing file',
  ALL_FILES_SENT: 'All files have been sent successfully!',
  SUCCESS_MESSAGE: 'Success! All files have been sent.',
  SELECT_FILE_WARNING: 'Please select at least one file.',
  SELECT_COUNTRY: 'Select a country',
  ENRICH_CVTHEQUE: 'Enrich your personal CV library by importing your own CVs. These profiles will be combined with our database for even more relevant searches.',
  SUBSCRIPTION_NOT_AVAILABLE: 'This feature is not available with your current subscription.',
  UPGRADE_PLAN: 'Upgrade to a higher plan to unlock this feature and much more.',
  UPGRADE_BUTTON: 'Upgrade',
  ENTER_MESSAGE_OR_FILE: 'Please enter a message or upload a file.',
  SELECT_COUNTRY_WARNING: 'Please select a country.',
  DOCUMENT_SENT: 'Document sent',
  SEARCHING_COUNTRY: 'You are looking for candidates in the country',
  CANDIDATE: 'Candidate',
  FILE_DOWNLOADED: 'Your file has been downloaded',
  OK: 'Ok',
  CONTINUE_CHAT_SUBSCRIPTION: 'To continue chatting with AI, please subscribe.',
  VIEW_CV_BUTTON: 'View saved CVs',
  VIEW_CV_BUTTON_DESCRIPTION: 'View all CVs you have imported into your personal database',
  CV_LIST_TITLE: 'Your saved CVs',
  CV_LIST_SUBTITLE: 'List of CVs imported into your personal database',
  CV_LIST_EMPTY: 'No saved CVs',
  CV_LIST_EMPTY_SUBTITLE: 'Import CVs to enrich your database',
  LOADING: 'Loading...',
  UPLOAD_CV_SUBTITLE: 'Upload your CV in .pdf or .docx format to start searching for talents that match your needs.',
  CLICK_TO_SELECT: ' Click to select files or drag and drop them here.',
  SUPPORTED_FORMATS:' Supported formats: .pdf, .docx ',
    ADD_MORE_FILES: 'Add more files'};
