import './styles.scss';

const AskCandidat = (props: any) => {
  const { actions, candidatQuestion, payload } = props;
  const handleQuestionClick = (question: string) => {
    actions.answer(question, payload);
  };
  return (
    <div className="chatBotCta">
      {candidatQuestion.map((question: string, index: number) => (
        <button
          key={index}
          className="chatBotCta__btn chatBotCta__btn--noWidth"
          onClick={() => {
            handleQuestionClick(question);
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default AskCandidat;
