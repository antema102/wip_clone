import React from 'react';

const FiltreQuestion = (props: any) => {
  const { payload, actions } = props;

  const handleQuestion = (question: string) => {
    actions.answer(question);
  };

  return (
    <div className="chatBotCta">
      {payload.map((question: string, index: number) => (
        <button
          className="chatBotCta__btn chatBotCta__btn--noWidth"
          key={index}
          onClick={() => {
            handleQuestion(question);
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default FiltreQuestion;
