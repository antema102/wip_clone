import ENV from './config';

class Urls {
  BASEURL = JSON.stringify(ENV.baseUrl);
  BASE = this.BASEURL.slice(1, -1);

  BASEURLIA = JSON.stringify(ENV.baseIA)
  BASE_IA = this.BASEURLIA.slice(1, -1);

  //Login
  LOGIN = `${this.BASE}/authentication/login`;
  LOGIN_GOOGLE = `${this.BASE}/authentication/google`;
  REGISTER_EMAIL = `${this.BASE}/authentication/redirect`;
  RESEND_EMAIL = `${this.BASE}/authentication/resend`;
  VERIFY_EMAIL = `${this.BASE}/authentication/verify`;
  INSCRIPTION = `${this.BASE}/authentication/register`;
  INSCRIPTION_COMPANY = `${this.BASE}/authentication/entreprise/register`;
  LOGOUT = `${this.BASE}/authentication/logout`;
  CREATE_OFFER = `${this.BASE}/job`;
  GET_AVAILABE_OFFERS = `${this.BASE}/job/offer/available`;
  GET_AVAILABE_POSTS = `${this.BASE}/post/announces/available`;
  GET_ALL_OFFERS_BY_CATEGORY = `${this.BASE}/job/offer/type`;
  GET_ALL_ANNOUNCES_BY_CATEGORY = `${this.BASE}/post/announces/activity`;
  UPDATE_OFFER = `${this.BASE}/job`;
  DELETE_OFFER = `${this.BASE}/job`;
  ALL_JOB_TYPE = `${this.BASE}/type/job`;
  BOOST_JOB = `${this.BASE}/job/offer/boost`;
  ALL_JOB_COMPANY = `${this.BASE}/job`;
  ALL_JOB_COMPANY_WITHOUT_VIDEO = `${this.BASE}/job/offer/withoutVideo`;
  ALL_JOB_BY_TYPE = `${this.BASE}/job/find/type/in`;
  FIND_USER_CV = `${this.BASE}/cv/find/mine`;
  CREATE_CV = `${this.BASE}/cv`;
  GET_AVAILABILITY_CV = `${this.BASE}/cv/get/availability`;
  CHANGE_AVAILABILITY_CV = `${this.BASE}/cv/change/availability`;
  AVAILABILITY_CV = `${this.BASE}/cv/availability`;
  FETCH_MYCV = `${this.BASE}/cv/find/mine`;
  FETCH_CV_VIDEO = `${this.BASE}/cv/find/video`;
  CV_BY_ID_USER = `${this.BASE}/bo/cv`;
  DELETION_ACCOUNT = `${this.BASE}/user/delete/account`;

  FETCH_USERBYID = `${this.BASE}/user/`;
  UPDATE_USER = `${this.BASE}/user`;
  UPDATE_PASSWORD = `${this.BASE}/user/change/password`;
  DESACTIVATE_ACCOUNT = `${this.BASE}/user/deactivate/account`;
  FETCH_JOBBYID = `${this.BASE}/job/?proprietaire=`;
  GET_FAVORITES = `${this.BASE}/favorite`;
  JOB_COMPANY_BY_ID = `${this.BASE}/job`;
  FILTER_WITH_MATCHING = `${this.BASE}/matching/cv`;
  HISTORY = `${this.BASE}/historique/`;
  POST_UPLOAD = `${this.BASE}/cv/upload/presentation`;
  POST_UPLOAD_ENTERPRISE = `${this.BASE}/user/upload/presentation`;

  PUT_APPLY = `${this.BASE}/job/to/apply`;
  PUT_DECLINE = `${this.BASE}/job/to/decline`;
  FILTER_WITH_MATCHING_JOB = `${this.BASE}/matching/job`;
  ZONNAGE_COUNTRY = `${this.BASE}/countries`;
  ZONNAGE_PROVINCE = `${this.BASE}/provinces`;
  //favorite
  ADD_FAVORITE = `${this.BASE}/favorite/add`;
  REMOVE_FAVORITE = `${this.BASE}/favorite/remove`;
  ALL_FAVORITE = `${this.BASE}/favorite`;

  ALL_NEWS = `${this.BASE}/actualities/`;

  // avatar
  UPLOAD_AVATAR = `${this.BASE}/user/upload/avatar`;
  DOWNLOAD_AVATAR = `${this.BASE}/user/download/avatar/`;

  // presentation
  UPLOAD_PRESENTATION = `${this.BASE}/user/upload/presentation`;
  DOWNLOAD_PRESENTATION = `${this.BASE}/user/download/avatar/`;

  UPDATE_MESSAGE = `${this.BASE}/notification/send`;
  GET_MESSAGE = `${this.BASE}/notification`;
  READ_MESSAGE_COUNT = `${this.BASE}/notification/read-count`;
  UPDATE_MESSAGE_COUNT = `${this.BASE}/notification/update-count`;
  FIREBASE_TOKEN = `${this.BASE}/firebase/access-token`;

  GOOGLE_SEND = 'https://fcm.googleapis.com/v1/projects/wip-work/messages:send';
  DOWNLOAD_VIDEO = `${this.BASE}/cv/download/presentation`;
  DOWNLOAD_VIDEO_ENTERPRISE = `${this.BASE}/user/download/presentation`;
  STREAM_VIDEO_ENTERPRISE = `${this.BASE}/user/download/streaming`;
  DOWNLOAD_VIDEO_EXAMPLE = `${this.BASE}/user/download/example`;
  DOWNLOAD_VIDEO_EXAMPLE_STREAM = `${this.BASE}/user/download/examplestream`;
  RESET_PASSWORD = `${this.BASE}/user/reset/password`;
  TEST_CV_VIDEO = `${this.BASE}/cv/find/media`;

  // Abonnement Subscription
  GET_SUBSCRIPTION = `${this.BASE}/bo/abonment`;
  BUY_SUBSCRIPTION = `${this.BASE}/bo/abonment/buy`;

  // Tarifs
  GET_COSTS = `${this.BASE}/advertising`;
  POST_PAY_CONTACT = `${this.BASE}/advertising/contact`;
  CHECK_CONTACT = `${this.BASE}/advertising/checkContact`;

  // Appel d'offre
  TENDER = `${this.BASE}/tender`;
  GET_TENDER_BY_OWNER = `${this.BASE}/tender/owner`;
  GET_TENDER_CATEGORY = `${this.BASE}/tender/filter/available/tender`;
  GET_TENDER_AVAILABLE_BY_NAME = `${this.BASE}/tender/filter/byname/tender`;
  GET_TENDER_PDF = `${this.BASE}/tender/pdf`;

  // Dynamic Text
  DYNAMIC_TEXT = `${this.BASE}/content-dynamic`;
  DYNAMIC_ECHELLE = `${this.BASE}/echelle`;

  // ADVERTISEMENT
  GET_ADVERTISEMENT_BY_OWNER = `${this.BASE}/advertisement/owner`;
  GET_POST_BY_OWNER = `${this.BASE}/post/owner`;
  ADVERTISEMENT = `${this.BASE}/advertisement`;
  POST = `${this.BASE}/post`;
  FILTERING_ADVERTISEMENT = `${this.BASE}/advertisement/filtering`;
  GET_SPOT_VIDEO = `${this.BASE}/advertisement/findAllByCategory/spot`;
  GET_SPOT_VIDEO_BY_ID = `${this.BASE}/advertisement/spot`;
  GET_ADVERTISEMENT_BY_CATEGORY = `${this.BASE}/advertisement/filteringByCategory?page=1&size=50`;
  COUNT_ADVERTISEMENT = `${this.BASE}/advertisement/click`;
  GET_ANNOUNCES = `${this.BASE}/post/filter/all?page=1&size=50`;
  ADVERTISEMENT_FOR_WEB = `${this.BASE}/advertisement/adForWeb`;

  // SESSION ID
  SESSIONS_ID = `${this.BASE}/user/chat/session`;

  // PAYMENT
  POST_MVOLA = `${this.BASE}/mvola/post`;
  POST_ORANGE = `${this.BASE}/orange-money`;
  POST_AIRTEL = `${this.BASE}/airtel-money`;
  POST_CB = `${this.BASE}/cb`;
  GET_MVOLA = `${this.BASE}/mvola`;
  GET_AIRTEL = `${this.BASE}/airtel-money/transaction`;
  CREDIT_IN_PURCHASE = `${this.BASE}/bo/abonment/purchase/buy/store`;
  SUBSCRIPTION_IN_PURCHASE = `${this.BASE}/bo/abonment/purchase`;
  RESILE_IN_PURCHASE = `${this.BASE}/bo/abonment/purchase/resile/subscription`;
  REVENUECAT = 'https://api.revenuecat.com/v1/subscribers';

  // FORMATION
  POST_FORMATION = `${this.BASE}/formation/create`;
  FORMATION_FIND_BY_COMPANY = `${this.BASE}/formation/findallByCompany`;
  FORMATION_FIND_ALL = `${this.BASE}/formation/findall`;
  FORMATION_DELETE = `${this.BASE}/formation/delete`;
  FORMATION_BY_CATEGORY = `${this.BASE}/formation/findAllByCategorie`;
  FORMATION_AVAILABLE = `${this.BASE}/formation/available/all`;

  // DEFAULT SPOT VIDEO
  DEFAULT_SPOT_VIDEO = `${this.BASE}/spot-video/default`;

  // TERMES ET CONDITIONS
  TERMS_CONDITIONS = `${this.BASE.replace(/\/api$/, '')}/terms`;

  // GET COUNTRY BY SESSION ID
  GET_COUNTRY_BY_SESSION = `${this.BASE}/user/country`;

  // GUIDELINE
  GUIDELINE = `${this.BASE}/user/download/guideline`;

  //STREAM
  STREAM = `${this.BASE}/cv/download/streaming`;

  //VUE
  JOB_VIEW = `${this.BASE}/job/offer/views`;

  //Create Uuid
  Uuid = `${this.BASE}/user/update-uuid`;

  //IA
  IA = `${this.BASE_IA}/chat/v3`;

  //GET IA
  GET_IA = `${this.BASE_IA}/chat/message_history`;

  //GET PDF
  GET_PDF = `${this.BASE_IA}/storage/objects/`;

  //POST PDF
  POST_PDF = `${this.BASE_IA}/parse/resume`;

  //JOB SLOT
  JOB_SLOT = `${this.BASE}/user/job-slot`;

  //GET EXTERNAL USER
  GET_EXTERNAL_USER = `${this.BASE}/user/by/enterprise`;

  //UPDATE CV
  UPDATE_CV = `${this.BASE_IA}/metadata/resume`;
}
export default new Urls();
