import React from 'react';

const HomeCta = ({ actions }) => {
  const handleCandidat = () => {
    actions.askCandidatQuestion('Candidat');
  };

  const handleCompany = () => {
    actions.askCompanyQuestion('Entreprise');
  };

  return (
    <div className="chatBotCta margin-bottom-15">
      <button className="chatBotCta__btn" onClick={handleCandidat}>
        Candidat
      </button>
      <button
        className="chatBotCta__btn chatBotCta__btn--orange"
        onClick={handleCompany}
      >
        Entreprise
      </button>
    </div>
  );
};

export default HomeCta;
