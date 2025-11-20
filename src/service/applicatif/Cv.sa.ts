import { CvBDL } from '../bdl/Cv.bdl';

export const CvService = () => {
  const { findUserCv, findCvVideo } = CvBDL();

  return {
    findUserCv: async () => await findUserCv(),

    findCvVideo: async () => await findCvVideo(),
  };
};
