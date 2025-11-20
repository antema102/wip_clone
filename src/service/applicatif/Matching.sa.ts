import { MatchingBDL } from "../bdl/Matching.bdl";

export const MatchingService = () => {
  const {filterMatching, filterMatchingJob} = MatchingBDL();
  return {
    filterMatching:async ( type, data )  => {
      return new Promise(async (success, error) => {
        const res = await filterMatching(type, data ).catch(exception =>
          error(exception),
        );
        success(res);
      });
    },
    filterMatchingJob: (data: any) => {
      return new Promise(async (success, error) => {
        const result: any = await filterMatchingJob(data);

        if (result.isError) {
          error(result);
        } else {
          success(result);
        }
      });
    },
  };
};
