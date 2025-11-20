import { NOTFOUND } from 'dns';

export const HOME = {
  WELCOME: 'Bienvenue dans votre univers WIP work !',
  BEGIN: 'Pour commencer, veuillez  :',
  PARCOURS: 'Saisir vos parcours - CV',
  PRESENTATION: 'Vous présenter en  vidéo',
  PREFERENCE: 'Choisissez vos préférences :',
  REDIRECT: 'Créer votre compte',
  INFORMATIONS: 'Pas encore inscrit ?',
  LOGIN_TITLE:
    "WIP work, l'appli qui vous rapproche du job de vos rêves ou du talent parfait en un simple clic !",
  WARNING:
    'Veuillez finaliser la création de votre profil candidat en ajoutant votre présentation vidéo',
  THANKYOU: 'Merci pour votre achat de crédit sur Wipwork !',
  CANCEL: 'Votre achat de crédit a été annulée',
  LOGOUT: 'Déconnexion',
  HELP: 'Aide',
};

export const STATUS = {
  PASSWORD_SUCCESS: 'Mot de passe modifié avec succès',
  PASSWORD_FAIL: 'Échec lors de la modification de votre mot de passe',
  EMAIL_SUCCES: 'Email modifié avec succès',
  EMAIL_FAIL: 'Échec lors de la modification de votre email',
  DESACTIVATE_ACCOUNT_SUCCESS: 'Votre compte a été desactivé avec succès',
  DESACTIVATE_ACCOUNT_FAIL: 'Échec lors de la desactivation de votre compte',
  SEARCH_FAIL: 'Echec lors de la recheche',
  SEARCH_SUCCESS: 'Recherche avec succès',
  OFFER_SUCCESS: "Création de l'offre réussie",
  BOOST_SUCCESS: 'Félicitation, votre offre a été boostée',
  ADVERTISEMENT_SUCCESS: 'Votre publicité a été créée',
  TENDER_DELETE_SUCCESS: "Votre appel d'offre a été supprimé",
  POST_SUCCESS: 'Votre petite annonce a été créée',
  TENDER_SUCCESS: "Votre appel d'offre a été créée",
  ADVERTISEMENT_EDIT_SUCCESS: 'Votre publication a été modifiée',
  ADVERTISEMENT_DELETE_SUCCESS: 'Votre publication a été supprimée',
  ADVERTISEMENT_FAIL: 'Echec lors de la création de la publicité',
  OFFER_FAIL: "Echec lors de la création de l'offre",
  OFFER_UPDATE_SUCCES: 'Offre modifié avec succès',
  OFFER_UPDATE_FAIL: 'Échec lors de la modification de votre offre',
  OFFER_DELETE_SUCCES: 'Offre supprimé avec succès',
  OFFER_DELETE_FAIL: 'Échec lors de la suppression de votre offre',
};

export const SEARCH_STATUT = {
  FIND_OFFER: 'Recherche offre',
  FIND_CANDIDATE: 'Recherche candidat',
};

export const TEXT_INFORMATIONS = {
  ENTERPRISE_CHECKBOX:
    "Je déclare sur l'honneur que les informations sur mon entreprise et les futurs offres d'emploi diffusés sur WIPwork sont exactes et véridiques. Je m'engage à respecter les obligations légales et réglementaires en vigueur. Je suis averti(e) que toute fausse déclaration peut entraîner des poursuites judiciaires. Vous pouvez consulter notre ",
  CANDIDAT_CHECKBOX:
    "Je déclare sur l'honneur que les informations ci-dessus sont exactes et véridiques. Je m'engage à respecter les obligations légales et réglementaires en vigueur. Je suis averti(e) que toute fausse déclaration peut entraîner des poursuites judiciaires. Vous pouvez consulter notre ",
  ACCOUNT_DELETION: 'Êtes-vous certaine de vouloir supprimer votre compte ? ',
  FILE_SAVED: 'Félicitation, le fichier a été téléchargé avec succés',
};

export const ENTERPRISE_INFORMATIONS = {
  MODIFICATION_SUCCEED: 'Les modifications ont bien été ajoutées',
  PAYMENT_CONTACT:
    "Coût de contact d'un candidat : 5.000 WIP sera déduit de mon solde",
  PAYMENT_BOOST:
    "Coût de Boost d'une offre : 5.000 WIP sera déduit de mon solde",
  ABOUT_THE_COMPANY: "Apropos de l'entreprise :",
  ACTIVITY: "Secteur d'activité",
  YEAR_OF_CREATION: "L'année de création :",
  WORKERS_NUMBERS: 'Nombre de personnels :',
  HEADQUARTERS: "Adresse de l'établissement :",
  URL: "L'adresse URL de votre entreprise :",
  EMAIL: "L'adresse email de l'entreprise :",
  PHONE_NUMBER: "Numéro téléphone de l'entreprise :",
  UNDO: 'Annuler',
  VALIDATE: 'Valider',
  TITLE: 'Mes informations',
  MORE_INFORMATIONS: 'Informations supplémentaires',
  CHANGE: 'Modifier',
  PAYMENT_SUCCES: 'Transaction effectuée avec succès',
  PAYMENT_FAIL: 'Erreur de la transaction, veuillez réessayer ultérieurement',
  ABONNEMENT_SUCCES: 'Félicitation, votre achat a été effectué avec succés',
  WAITING: 'Veuillez patienter pendant le traitement de votre achat.',
  SUBSCRIPTION_ACTIVE_AGAIN: 'Votre abonnement est de nouveau actif.',
  ALREADY_SUBSCRIBED:
    "Vous avez déjà un abonnement en cours, veuillez d'abord résilier votre ancien abonnement avant d'acheter un nouvel.",
  EMPTY: 'Votre liste de favoris est vide.',
};

export const RESET_PASSWORD = {
  USER_DOES_NOT_EXIST:
    "L'adresse email que vous avez saisie ne correspond à aucun utilisateur de la plateforme WIP work",
  USER_DOES_EXIST:
    "L'email de récuperation a bel et bien été envoyé, on vous invite à vérifier voitre boite email",
  WRONG_FORMAT: "L'email n'est pas au bon format, veuillez re-saisir",
  SEND_BUTTON: "Envoyer l'émail de récupération",
  RESEND_BUTTON: 'Renvoyer le code de validation',
  CONFIRM_BUTTON: 'Confirmer le code de validation',
  RESEND_MESSAGE: 'Le code de validation a bel et bien été renvoyé',
  EMPTY: 'Votre liste de favoris est vide.',
};

export const CONTACT_CANDIDAT = {
  MESSAGE_TITLE: 'REPONSE SUITE A VOTRE CANDIDATURE',
  MESSAGE_SENT: 'Félicitation, le candidat a bel et bien reçu votre demande',
  MESSAGE_NOT_SENT:
    "Le candidat que vous avez essayé de joindre n'est pas actuellement un membre actif de notre plateforme",
  ZERO_NOTIFICATION: 'Notification',
  NO_PHONE_PHONENUMBER: 'Désolé, aucun numéro disponible pour le moment',
  ZERO_NOTIFICATION_TEXT: "Aucune notification pour l'instant",
  NOTIFICATION_TITLE: 'Notifications',
};

export const CONTACT_ENTERPRISE = {
  MESSAGE_TITLE: 'ENVOIE DE CANDIDATURE',
  MESSAGE_SENT:
    "Félicitation, l'entreprise à laquelle vous avez postulée a reçu votre demande",
  MESSAGE_NOT_SENT:
    "Félicitation, vous avez postulé à l'offre mais l'entreprise à la quelle vous avez postulé n'est pas actuellement actif",
  MESSAGE_DECLINE: "Vous avez dépostulé à l'offre",
  COMPLETE_THE_CV_FIRST:
    "Veuillez d'abord completer votre CV ici, avant de postuler",
  APPLY: "Postuler à l'offre",
  RESIGN: 'Ne plus postuler',
  UNDO: 'Annuler',
};

export const RESUME_VIDEO = {
  PRESENTATION: 'Présentez vous en vidéo',
  LOREM_IPSUM:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus pellentesque ametsit. ',
  ADVICE: 'Avant d’allumer votre caméra, on vous conseille de :',
  SAVE: 'J’enregistre ma présentation',
  IMPORT: 'Importer ma présentation',
  INSPIRE: 'Inspirez vous de la vidéo de présentation de Marie',
  DISPLAY: 'Afficher ma présentation actuelle',
  NEW_SAVE: 'Prendre une nouvelle présentation',
  NEW_IMPORT: 'Importer une nouvelle présentation',
  WELCOMING: 'Ma présentation vidéo',
  CONGRATULATION:
    'Félicitation, votre présentation vidéo a bel et bien été ajoutée',
  NO_CV_MESSAGE:
    "Veuillez d'abord completer vos parcours CV avant de vous présenter en vidéo",
  WAITING: "Veuillez patienter pendant l'envoi de la vidéo",
  WAITING_WHILE_DOWNLOADING:
    'Veuillez patienter pendant le téléchargement de la présentation vidéo',
  MAX_DURATION_REACHED:
    'Désolé, votre présentation vidéo est trop longue, veuillez importer une vidéo de 2 minutes maximum.',
  MAX_DURATION_REACHED_ENTERPRISE:
    'Désolé, votre présentation vidéo est trop longue, veuillez importer une vidéo plus courte, moins de 30 secondes.',
};

export const HOME_COMPANY = {
  HISTORY_CHAT: 'Historique de vos recherches IA',
  HISTORY: 'Historique de vos recherches',
  TENDER: "Appel d'offre disponible :",
  TENDER_CANDIDAT: "Appels d'offres",
  ALL_HISTORY: 'Tous vos historiques',
  ACTIVITY: 'Activités sur vos offres',
  ALL_OFFERS: 'Toutes vos offres',
  NOTE: 'Trouvez facilement un candidat qui match avec vos critère de recherche',
  WIPWORK_ONLY: 'Analyse et recherche basées sur Wipwork',
  COMBINED_SEARCH: 'Analyse et recherche combinée',
  CV_LIBRARY: 'Analyser votre CVthèque',
};
export const NEWS = {
  WARN: 'Vous n’avez pas encore enregistré votre présentation vidéo.',
  EXPIRED: "Votre session est expirée, veuillez d'abord vous reconnecter",
  SUBSCRIPTION_EXPIRED:
    "Votre abonnement n'est plus valable, veuillez d'abord vous reconnecter",
  ADVICE:
    'Veuillez enregister votre CV vidéo, ou importer votre vidéo afin que vos informations puissent être valide.',
};

export const TAB = {
  NEWS: 'Actualités',
  OFFERS: "Offres d'emplois",
  ANNOUNCES: 'Petites annonces',
};

export const TENDER = {
  CONFIRMATION_TENDER: "Voulez-vous vraiment supprimer cet appel d'offre",
  CONFIRMATION_AD: 'Voulez-vous vraiment supprimer cette publicité',
  CONFIRMATION_POST: 'Voulez-vous vraiment supprimer cette petites annonce',
};

export const ACCOUNT_CANDIDAT = {
  KREDIT: 'Créditer mon compte',
  SUP: 'Supprimer mon compte',
  MES_SOLDES: 'Mon solde',
  ABONNEMENT: 'Votre abonnement a expiré. Renouvelez-le dès maintenant.',
  CURRENT_SUBSCRIPTION: 'Votre abonnement actuel est',
};

export const PreferenceTAB = {
  OFFERS: "Offres d'emplois",
  FORMATIONS: 'Formations',
};

export const HEADER = {
  INFO_APP: 'A propos de l’application',
  LOGOUT: 'Se déconnecter',
};

export const DETAIL_PROFIL = {
  MON_CV: 'Mon CV',
  MA_PRESENTATION_VIDEO: 'Ma présentation vidéo',
  MES_SAUVEGARDES: 'Mes sauvegardes',
  MON_COMPTE: 'Mon compte',
  PETITES_ANNONCES: 'Mes petites annonces',
  MON_INFO: 'Mes informations',
  GESTION_PUBLICITES: 'Gestion des publicités',
  GESTION_APPEL_OFFRE: 'Gestion des offres d’emploi',
  CAMERA_UNAVAILABLE: "Caméra non disponible sur l'appareil",
  PERMISSION: 'Permission non satisfait',
  CHOOSE_IMAGE: 'Veuillez choisir une image !',
  I_AM_AVAILABLE: 'Je suis disponible',
  SUCCESS_UPLOAD: 'Enregistrement réussi',
  FAILED_UPLOAD: 'Enregistrement échoué',
  DEFAULT_PHONE_NUMBER: '0341230012',
  PHONE_TITLE: 'Contacter par téléphone',
  MAIL_TITLE: 'Contacter par Mail',
  NOTIFICATION_TITLE: 'Notifier via WIP work',
  WEB_TITLE: 'Visiter le web',
  PORTFOLIO: 'Voir mon portfolio en ligne',
  HEADER_AD:
    'Consulter les annonces que vous avez publiées sur la plateforme WIP work',
  HEADER_POST:
    'Consulter les petites annonces que vous avez publié sur la plateforme WIP work',
  HEADER_TENDER:
    "Consulter les appels d'offres que vous avez publiés sur la plateforme WIP work",
  HEADER_AD_TITLE: 'Gérez votre publicité',
  HEADER_TENDER_TITLE: "Gérez vos appels d'offres",
  HEADER_POST_TITLE: 'Gérez votre petite annonce',
  UPLOAD_OK: 'Mise à jour image avec succès',
  NOTFOUND_TEXT_ADS: 'Aucun publicité n’a été enregistrée',
  NOTFOUND_TEXT_ANNONCE: 'Aucune petite annonce n’a été enregistrée.',
  NOTFOUND_SUBTEXT_ANNONCE: 'Ajouter une petite annonce',
  NOTFOUND_SUBTEXT_ADS: 'Ajouter une publicité.',
  NOTFOUND_APPEL_OFFERS: "Aucun appel d'offres trouvé.",
  STATUS: 'Statut de mon compte',
};

export const OFFERS = {
  ALL: 'Toutes les offres',
  LAST: 'Les dernières offres',
  OFFER: 'Offre',
  OFFERT_LAST: 'Formation , stage et alternances',
  NO_CANDIDATE: 'Aucun candidat',
  APPLIED: 'ont postulé',
  NO_OFFER: 'Aucune offre disponible',
};

export const PRESENTATION_VIDEO = {
  ENREGISTRER: 'Enregistrer nouvelle présentation',
  IMPORTER: 'Importer nouvelle présentation',
  DEFAULT_URLS:
    'https://static.videezy.com/system/resources/previews/000/006/983/original/MR8_5629.mp4',
};

export const ABOUT_COMPANY = {
  JOB: "Comment créer une offre d'emploi ?",
  TRAINING: 'Comment créer une formation ?',
  CALL_FOR_TENDER: "Comment créer un Appel d'offre ?",
  TARGET: 'Comment créer une publicité ciblé ou non ciblé ?',
};

export const ABOUT_CANDIDAT = {
  CV: 'Comment saisir mon CV ?',
  PRESENTATION: 'Comment faire une présentation vidéo ?',
  ANNOUNCEMENT: 'Comment passer une petite annonce ?',
};

export const FIND_TALENT_C = {
  TITLE_C: 'Trouvez des talents !',
  TEXT_C:
    'Veuillez entrer vos critères ainsi que le niveau de priorisation pour chaque critère',
};

export const ERROR = {
  EMPTY_EMAIL: 'Email obligatoire',
  FILE_TOO_LARGE:
    'Veuillez ajouter un fichier vidéo plus court inférieur à 30 secondes.',
  FILE_TOO_LARGE_OFFER:
    'Veuillez ajouter un fichier vidéo plus court inférieur à 10 secondes.',
  FILE_TOO_HEAVY:
    'Veuillez ajouter un fichier vidéo plus léger inférieur à 10Mo.',
  EMPTY_PWD: 'Mot de passe obligatoire',
  EMPTY_FIELD: 'Champ obligatoire',
  EMPTY_IMAGE: 'Veuillez ajouter une image',
  EMPTY_PICK: 'Veuillez sélectionner une valeur',
  EMPTY_PICK_PDF: 'Veuillez importer un fichier pdf',
  EMAIL_INVALID: 'Saisir un email valide',
  CONFIRM_PWD: 'Les mots de passe doivent être identiques',
  EMPTY_ENTREPRISE: 'Entreprise obligatoire',
  INVALID_PWD: 'Votre mot de passe doit contenir au moins 8 caractères',
  UNREACHABLE_SERVER:
    'Le serveur est momentanément indisponible. Veuillez réessayer plus tard.',
  NETWORK_ERROR:
    "Pour utiliser l'application veuillez vous connecter à internet.",
  SUBSCRIPTION_ALREADY_EXIST:
    "Vous avez déjà un abonnement en cours, veuillez attendre qu'il expire avant de pouvoir le recharger.",
  NOT_ENOUGH_MONEY:
    'Vous ne pouvez pas acheter cette offre, veuillez vérifier le solde de votre compte !',
};

export const INSCRIPTION = {
  CREATE: 'Créer votre compte',
  SUCCESS: 'Inscription réussie avec succès',
  WAITING:
    "Votre compte est bel et bien créé et en cours de vérification et validation. L'administration vous informera dès que votre compte sera validé.",
  ALREADY_HAVE_ACCOUNT: 'Vous avez déjà un compte ? ',
  CONNECT: 'Se connecter',
  ERR_MESSAGE_DUPLICATE_KEY:
    "Un compte a été déjà enregistré à cette adresse, veuillez utiliser un autre e-mail pour s'inscrire.",
  PUT_STAT_VALID: 'Saisir un stat valide, 17 chiffres',
  PUT_NIF_VALID: 'Saisir un nif valide, 10 chiffres',
  PASSWORD: 'MOT DE PASSE',
  CONFIRM_PASSWORD: 'CONFIRMER MOT DE PASSE',
  CONTINUE: 'CONTINUER',
  MAIL: 'MAIL',
  ENTERPRISE: "L'ENTREPRISE",
};

export const DELETION = {
  TITLE: 'Suppression du compte',
  COMPANY:
    "La suppression de votre compte est définitive. Lorsque vous supprimez votre compte WIP, vous ne pouvez plus en récupérer le contenu ou les informations que vous avez partagées sur notre plateforme. La suppression de votre compte entraînera la suppresion des offres d'emploi, formations, publicités et les informations personnels.",
  CANDIDATE:
    'La suppression de votre compte est définitive. Lorsque vous supprimez votre compte WIP, vous ne pouvez plus en récupérer le contenu ou les informations que vous avez partagées sur notre plateforme. La suppression de votre compte entraînera la suppression de votre CV, CV vidéo , petites annonces et des informations personnels',
  CONFIRMATION_TITLE: 'Supprimer le compte',
  AUTHENTICATION: 'Veuillez saisir votre mot de passe : ',
  DELETION_SUCCES: 'Votre compte a été supprimé avec succès',
  BUTTON_CONFIRM: 'Confirmer la suppression du compte',
};

export const ROLEACCOUNT = {
  candidate: 'candidate',
  company: 'company',
};

export const SEARCHENT_RESULT = {
  FIND_COMPANY_THAT_ARE_HIRING:
    'Trouvez les entreprises qui recrutent selon votre profil',
  NO_RESULT_FOUND: 'Aucun poste trouvés',
};

export const NEWS_DETAILS = {
  NO_RESULT_FOUND: 'Aucune actualité trouvés',
};

export const NEWS_INFORMARIONS = {
  SEE_MORE: 'En savoir plus...',
};

export const MATCHING = {
  FILL_THE_FIELD: 'Veuillez remplir les champs indiqués obligatoires !',
  FILL_AT_LEAST_ONE: 'Veuillez remplir au moins un critère !',
  ERROR_SALARY:
    'Le salaire brut maximum (Ariary) doit être supérieur au salaire brut minimum (Ariary)',
  ERROR_AGE: "L'age maximum doit être supérieur à l'age minimum",
};

export const FIND_TALENT_FORM = {
  TITLE_HEADERSCREEN: 'Trouvez des talents',
  DESCRIPTION_HEADERSCREEN:
    'Veuillez entrer vos critères ainsi que le niveau de priorisation pour chaque critère',
};

export const STRING_ALL = {
  REQUIRED_FIELD: 'Ce champ est obligatoire.',
  CONFIRMATION:
    "Un e-mail contenant un code de validation vient d'être envoyé à ",
  FOLLOW: 'Suivez-nous sur :',
};
export const ENTERPRISE_OFFER = {
  CREATION: 'Creation',
  SIMILAR_OFFERS: 'Offres similaires',
  ABOUT_COMPANY: 'À propos de l’entreprise',
  YOUR_TASK: 'Vos tâches',
  DESCRIPTION: 'Description',
  LIEU: 'Lieu',
  THEME: 'Thème',
  PAYANT: 'Payant',
  TRAVAIL: 'Travail',
  CONTRACT: 'Contrat',
  PRIX: 'Prix',
  PROFIL: 'Profil',
  DUREE: 'Durée',
  TELEPHONE: 'Téléphone',
  EXPERIENCE: 'Expérience',
  EMAIL: 'Email',
  SALAIRE_BRUTE: 'Salaire brut',
  MORE_PLUS: 'En savoir plus',
  PUBLICATION_DATE: 'Date de publication : ',
  BOOSTED_OFFER: 'Offre Boostée',
  BOOST_THIS_OFFER: 'Booster cette offre',
  DELETE_MY_TRAINING: 'Supprimer ma formation',
  DELETE_MY_OFFER: 'Supprimer mon offre',
  MODIFY: 'Modifier',
  YOUR_TASKS: 'Vos tâches',
  NUMBER_OF_CANDIDATES_VIEWED_YOUR_OFFER:
    'Nombre de candidats ayant vu votre offre',
  STATISTICS: 'Statistique',
  VIEW: 'vues',
};

export const APPEL_OFFRE = {
  TITLE_OFFERS: 'Listes des appels d’offres :',
};
export const NOTIFICATION = {
  RECEIPT: 'RECEPTION DE CANDIDATURE',
};

export const FORMATIONS = {
  NOT_FOUND:
    "Vous n'avez pas encore publier de stage,formations et alternance.",
};
export const SUBSCRIPTION = {
  LIST_OF_PACKS: 'LISTE DES PACKS WIP',
  LIST_OF_SUBSCRIPTIONS: 'LISTE DES ABONNEMENTS',
};
export const PAGINATOR = {
  NEXT: 'Suivant',
  PREVIOUS: 'Précédent',
};
export const HISTORY = {
  NAME: 'Nom :',
  LEVELS: 'Niveaux :',
  SEARCH_HISTORY: "Trouvez facilement l'historique de vos recherches",
  TITLE_HISTORY: 'Vos historiques',
};

export const IA = {
  TITLE: "Trouvez les meilleurs talents grâce à l'IA",
  SUB_TITLE: "Recherche par Mots-clés ou Fiche de Poste (PDF/DOCX)",
  PLACEHOLDER: "Posez votre question",
  CHAT: "Trouvez les meilleurs talents grâce à l'IA : discutez avec elle !",
  CV: "Listes des CV des candidats d'après cette recherche :",
  UPLOAD: 'Envoyer',
  ABONNEMENT: "Pour accéder au service d'IA, veuillez mettre à jour votre forfait.",
  DESCRIPTION_COMBINEE: 'Comparez votre CVthèque à la base de données Wipwork',
  DESCRIPTION_CV: 'Rechercher des profils à partir de votre CVthèque',
  DESCRIPTION_FLAG: 'Trouvez les candidats idéaux dans le pays de votre choix grâce à notre CVthèque internationale',
  UPLOAD_CV: 'Importer votre CV',
  UPLOAD_CV_MODAL_TITLE: 'Téléverser des CVs',
  UPLOAD_CV_MODAL_SUBTITLE: 'Ajoutez des CVs (.pdf, .docx) à votre base de données pour enrichir votre recherche de talents.',
  NO_FILE_SELECTED: 'Aucun fichier sélectionné',
  ADD_FILES: 'Ajouter des fichiers',
  CANCEL: 'Annuler',
  UPLOAD_FILES: 'Téléverser',
  CLOSE: 'Fermer',
  SENDING_FILES: 'Envoi des fichiers en cours...',
  PROCESSING_FILE: 'Traitement du fichier',
  ALL_FILES_SENT: 'Tous les fichiers ont été envoyés avec succès !',
  SUCCESS_MESSAGE: 'Succès ! Tous les fichiers ont été envoyés.',
  SELECT_FILE_WARNING: 'Veuillez sélectionner au moins un fichier.',
  SELECT_COUNTRY: 'Sélectionner un pays',
  ENRICH_CVTHEQUE: 'Enrichissez votre CVthèque personnelle en important vos propres CV. Ces profils seront combinés avec notre base de données pour des recherches encore plus pertinentes.',
  SUBSCRIPTION_NOT_AVAILABLE: "Cette fonctionnalité n'est pas disponible avec votre abonnement actuel.",
  UPGRADE_PLAN: 'Passez à un plan supérieur pour débloquer cette fonctionnalité et bien plus encore.',
  UPGRADE_BUTTON: 'Mettre à niveau',
  ENTER_MESSAGE_OR_FILE: 'Veuillez entrer un message ou téléverser un fichier.',
  SELECT_COUNTRY_WARNING: 'Veuillez sélectionner un pays.',
  DOCUMENT_SENT: 'Document envoyé',
  SEARCHING_COUNTRY: 'Vous cherchez des candidats dans le pays',
  CANDIDATE: 'Candidat',
  FILE_DOWNLOADED: 'Votre fichier a été téléchargé',
  OK: 'Ok',
  CONTINUE_CHAT_SUBSCRIPTION: "Pour continuer à discuter avec l'IA, veuillez souscrire à un abonnement.",
  LOADING: 'Chargement en cours...',
  VIEW_CV_BUTTON: 'Voir les CV enregistrés',
  VIEW_CV_BUTTON_DESCRIPTION: 'Consultez tous les CV que vous avez importés dans votre base de données personnelle',
  CV_LIST_TITLE: 'Vos CV enregistrés',
  CV_LIST_SUBTITLE: 'Liste des CV importés dans votre base de données personnelle',
  CV_LIST_EMPTY: 'Aucun CV enregistré',
  CV_LIST_EMPTY_SUBTITLE: 'Importez des CV pour enrichir votre base de données',
  UPLOAD_CV_SUBTITLE:'Uploadez votre CV au format .pdf ou .docx pour commencer à rechercher des talents adaptés à vos besoins.',
  CLICK_TO_SELECT:'Cliquez pour sélectionner des fichiers ou faites-les glisser ici.',
  SUPPORTED_FORMATS:'Formats supportés : .pdf, .docx',
  ADD_MORE_FILES: 'Ajouter plus de fichiers',

};
