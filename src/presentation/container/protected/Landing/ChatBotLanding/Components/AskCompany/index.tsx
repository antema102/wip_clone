import './styles.scss';
const AskCompany = (props: any) => {
  const { actions, companyQuestion, payload } = props;
  const handleClickCompanyQuestion = (question: string) => {
    actions.answer(question, payload);
  };
  return (
    <div className="chatBotCta">
      {companyQuestion.map((question: string, index: number) => (
        <button
          className="chatBotCta__btn chatBotCta__btn--noWidth"
          key={index}
          onClick={() => {
            handleClickCompanyQuestion(question);
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default AskCompany;
