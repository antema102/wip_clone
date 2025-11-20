import { createChatBotMessage } from 'react-chatbot-kit';
import React from 'react'; // Assurez-vous d'importer React si vous utilisez des composants
import Avatar from '../Components/Avatar';
import HomeCta from '../Components/HomeCta';
import AskCandidat from '../Components/AskCandidat';
import AskCompany from '../Components/AskCompany';
import OtherQuestion from '../Components/OtherQuestion';
import FiltreQuestion from '../Components/FiltreQuestion';

interface FAQState {
    candidatQuestion: string[];
    companyQuestion: string[];
}

interface ChatBotConfig {
    initialMessages: Array<ReturnType<typeof createChatBotMessage>>;
    customComponents?: {
        botAvatar?: React.ComponentType<any>;
    };
    state: FAQState;
    widgets?: {
        widgetName: string;
        widgetFunc: React.ComponentType<any>,
        mapStateToProps?: string[]}[];
}

const config: ChatBotConfig = {
    initialMessages: [
        createChatBotMessage("Bienvenue chez Wipwork !En quoi puis-je t'aider ? 🙂 Es-tu un candidat ou un employeur ? ", {
            widget: 'HomeCta'
        }),
    ],
    customComponents: {
        botAvatar: (props) => <Avatar {...props} />},
    state:
    {
        candidatQuestion: [
            'Comment m’inscrire sur WIPwork ?',
            "Qu'est-ce qui différencie WIPwork des autres plateformes de recrutement ?",
            "Comment fonctionne le système de matching pour les candidats ?",
            "Puis-je postuler directement depuis la plateforme ?",
            "Puis-je ajouter une vidéo de présentation à mon profil ?",
            "Comment améliorer mon profil pour être plus visible des entreprises ?",
            "Comment être informé des nouvelles offres correspondant à mon profil ?",
            "Les entreprises peuvent-elles voir mes informations personnelles ?",
            "Comment puis-je suivre mes candidatures ?",
            "Puis-je postuler à plusieurs offres à la fois ?",
        ],
        companyQuestion: [
            'Comment m’inscrire sur WIPwork ?',
            "Qu'est-ce qui différencie WIPwork des autres plateformes de recrutement ?",
            "Comment fonctionne le système de matching pour l’entreprise ?",
            "Combien coûte l’abonnement sur WIPwork ?",
            "Puis-je consulter les profils de candidats sans publier une offre d'emploi ?",
            "Comment publier une offre d’emploi sur WIPwork ?",
            "Comment puis-je voir les candidats qui ont postulé à mes offres ?",
            "Puis-je contacter un candidat directement ?",
            "Puis-je suivre mes annonces publicitaires sur WIPwork ?"
        ]}
    ,
    widgets: [
        {
            widgetName: "HomeCta",
            widgetFunc: (props) => <HomeCta {...props} />},
        {
            widgetName: "AskCandidat",
            widgetFunc: (props) => <AskCandidat {...props} />,
            mapStateToProps: ["candidatQuestion"]},
        {
            widgetName: "AskCompany",
            widgetFunc: (props) => <AskCompany {...props} />,
            mapStateToProps: ["companyQuestion"]},
        {
            widgetName: "otherQuestion",
            widgetFunc: (props) => <OtherQuestion {...props} />},
        {
            widgetName: "FiltreQuestion",
            widgetFunc: (props) => <FiltreQuestion {...props} />}
    ]};

export default config;
