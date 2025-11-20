import React, { type ReactNode } from 'react';
interface ActionProviderProps {
  createChatBotMessage: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: ReactNode;
}

interface ChildProps {
  actions: any;
}

const ActionProvider: React.FC<ActionProviderProps> = (props) => {
  const { createChatBotMessage, setState, children } = props;

  const askCandidatQuestion = (categorie: string) => {
    const userMessage = createChatBotMessage(categorie, { type: 'user' });
    const botMessage = createChatBotMessage(
      'Choisissez les questions pour le candidat',
      {
        widget: 'AskCandidat',
        payload: 'candidat',
      }
    );

    updateMessages([userMessage, botMessage]);
  };

  const askCompanyQuestion = (categorie: string) => {
    const userMessage = createChatBotMessage(categorie, { type: 'user' });
    const botMessage = createChatBotMessage(
      "Choisissez les questions pour l'entreprise",
      {
        delay: 2000,
        widget: 'AskCompany',
        payload: 'company',
      }
    );
    updateMessages([userMessage, botMessage]);
  };

  const answer = (question: string, payload: string) => {
    const userMessage = createChatBotMessage(question, {
      type: 'user',
      payload,
    });
    let botMessage;

    switch (question) {
      case 'Comment m’inscrire sur WIPwork ?':
        botMessage =
          "Inscrivez-vous gratuitement sur notre site web ou via l'application mobile. Vous pouvez rapidement créer un compte et accéder à notre base de données de talents.";
        break;

      case "Qu'est-ce qui différencie WIPwork des autres plateformes de recrutement ?":
        botMessage =
          'WIPwork propose un système de matching avancé qui met en avant les candidats les plus compatibles avec vos offres d’emploi, ce qui vous fait gagner du temps et améliore la qualité des recrutements.';
        break;

      case 'Comment fonctionne le système de matching pour l’entreprise ?':
        botMessage =
          'Notre algorithme analyse les critères de vos offres et fait remonter les profils des candidats qui ont le taux de compatibilité le plus élevé avec vos besoins.';
        break;

      case 'Combien coûte l’abonnement sur WIPwork ?':
        botMessage =
          'L’inscription est gratuite. Cependant, nous proposons des abonnements premium pour des fonctionnalités supplémentaires, comme la mise en avant de vos offres et la publicité pour votre marque employeur.';
        break;

      case "Puis-je consulter les profils de candidats sans publier une offre d'emploi ?":
        botMessage =
          'Oui, vous pouvez rechercher directement dans notre base de données de talents et filtrer les profils selon vos critères.';
        break;

      case 'Comment publier une offre d’emploi sur WIPwork ?':
        botMessage =
          'Une fois connecté à votre compte entreprise, vous pouvez créer une nouvelle offre d’emploi en remplissant les informations nécessaires (intitulé de poste, compétences requises, etc.) et la publier directement.';
        break;

      case 'Comment puis-je voir les candidats qui ont postulé à mes offres ?':
        botMessage =
          "Accédez à votre tableau de bord 'Mes offres' pour voir la liste des candidats avec leur taux de compatibilité, ce qui simplifie le tri des candidatures.";
        break;

      case 'Puis-je contacter un candidat directement ?':
        botMessage =
          'Oui, vous pouvez contacter directement les candidats via leurs coordonnées affichées sur leur profil.';
        break;

      case 'Puis-je suivre mes annonces publicitaires sur WIPwork ?':
        botMessage =
          'Nous travaillons actuellement sur ce point pour vous permettre de consulter les statistiques de vos publicités (vues, clics, etc.) via votre tableau de bord.';
        break;

      case 'Comment fonctionne le système de matching pour les candidats ?':
        botMessage =
          'Notre IA analyse ton profil (CV, compétences, expérience) et te propose des offres d’emploi qui correspondent le mieux à tes qualifications et attentes.';
        break;

      case 'Puis-je postuler directement depuis la plateforme ?':
        botMessage =
          'Oui, après avoir trouvé une offre qui t’intéresse, tu peux postuler en un clic. Ta candidature sera immédiatement transmise à l’employeur.';
        break;

      case 'Puis-je ajouter une vidéo de présentation à mon profil ?':
        botMessage =
          'Oui, WIPwork te permet de télécharger une vidéo de présentation pour te démarquer auprès des recruteurs et mettre en avant tes compétences.';
        break;

      case 'Comment améliorer mon profil pour être plus visible des entreprises ?':
        botMessage =
          'Complète toutes les sections de ton profil, ajoute un CV actualisé, et utilise la fonctionnalité vidéo pour maximiser ta visibilité et booster ton image.';
        break;

      case 'Comment être informé des nouvelles offres correspondant à mon profil ?':
        botMessage =
          'On t’invite à consulter de temps en temps la plateforme pour être au courant des nouvelles offres en attendant les prochaines mises à jour, notamment les notifications.';
        break;

      case 'Les entreprises peuvent-elles voir mes informations personnelles ?':
        botMessage =
          "Effectivement, les informations que tu as fournies lors de ton inscription sont visibles par les entreprises. Les autres candidats peuvent également voir certaines de tes informations, mais ton nom sera affiché sous forme d'initiales afin de préserver ta confidentialité.";
        break;

      case 'Comment puis-je suivre mes candidatures ?':
        botMessage =
          "Tu seras directement contacté par l'employeur si ton profil est retenu. WIPwork te permet de communiquer librement et de t'organiser pour la suite du processus de candidature.";
        break;

      case 'Puis-je postuler à plusieurs offres à la fois ?':
        botMessage =
          'Oui, tu peux postuler à autant d’offres que tu le souhaites.';
        break;

      default:
        botMessage =
          'Je ne connais pas la réponse à cette question. Peux-tu reformuler ou poser une autre question ?';
        break;
    }

    const botFormattedMessage = createChatBotMessage(botMessage);
    updateMessages([userMessage, botFormattedMessage]);

    const botMessages = createChatBotMessage(
      "Vous avez besoin de plus d'informations ? 😊",
      {
        delay: 2000,
        withAvatar: true,
        widget: 'otherQuestion',
        payload,
      }
    );
    updateMessages([botMessages]);
  };
  const updateMessages = (messages: any[]) => {
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, ...messages],
    }));
  };

  const homeQuestion = (message: string, payload: string) => {
    const userMessage = createChatBotMessage(message, { type: 'user' });
    const otherQuestion = createChatBotMessage(
      'Choisir quelles questions vous voulez poser ? 😉',
      {
        delay: 2000,
        widget: `${payload === 'company' ? 'AskCompany' : 'AskCandidat'}`,
      }
    );
    updateMessages([userMessage, otherQuestion]);
  };

  const questionFiltre = (messages: string[]) => {
    const BotMessage = createChatBotMessage(
      <>
        Vous voulez plutôt dire ceci ?
        <br />
        Voici les questions suggérées :
      </>,
      {
        delay: 2000,
        payload: messages,
        widget: 'FiltreQuestion',
      }
    );
    updateMessages([BotMessage]);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ChildProps>(child)) {
          return React.cloneElement<ChildProps>(child, {
            actions: {
              askCandidatQuestion,
              askCompanyQuestion,
              answer,
              homeQuestion,
              questionFiltre,
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default ActionProvider;
