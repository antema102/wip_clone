import { FormationBDL } from '../bdl/Formation.bdl';

export const FormationSA = () => {
  const {
    createFormation,
    findAll,
    findAllByCompanyId,
    deleteFormation,
    getFormationsByCategoryName,
    getAllFormationsAvailable,
  } = FormationBDL();

  return {
    createFormation,
    findAll,
    findAllByCompanyId,
    deleteFormation,
    getFormationsByCategoryName,
    getAllFormationsAvailable,
  };
};
