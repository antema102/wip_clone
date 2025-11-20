export const format = (data: any, type: string = 'send', id: string = '') => {
  // generation uuid
  function guidGenerator() {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  if (type === 'send') {
    const model: any = {
      userId: '',
      loger: '',
      user: {
        id: '',
        lastName: '',
        firstName: '',
        birthDate: '',
        civility: '',
        childrenNumber: 0,
        phone: '',
      },
      transport: '',
      pet: '',
      portfolio: '',
      socioLink:'',
      fileCv:'',
      studyArea: [
        {
          level: '',
          university: '',
        },
      ],
      adress: {
        country: {
          id: '',
          name: '',
        },
        province: {
          id: '',
          name: '',
        },
        zone: '',
      },
      jobWish: {
        sector: '',
        name: '',
        yearOfExperience: 0,
        salaryExpectation: 0,
      },
      jobLocalisation: [
        {
          country: {
            id: '',
            name: '',
          },
          province: {
            id: '',
            name: '',
          },
          zone: '',
        },
      ],
      lastExperience: [
        {
          year: 0,
          jobType: '',
          jobPlace: '',
        },
      ],
      recommandation: [
        {
          name: 0,
          reference: '',
          file: '',
        },
      ],
      disponibility: '',
      statut: '',
      languages: [
        {
          name: '',
          level: '',
        },
      ],
      sport: [''],
    };

    // personal information
    model.userId = id;
    model.user.id = id;
    model.user.lastName = data.info.name;
    model.user.firstName = data.info.firstname;
    model.user.birthDate = data.info.birthdate;
    model.user.childrenNumber = parseInt(data.info.child, 10);
    model.user.phone = data.info.phone;
    model.user.civility = data.info.civilstatus;

    model.adress.country = {
      id: data.info.country,
      name: data.info.country,
    };
    model.adress.province = {
      id: data.info.province,
      name: data.info.province,
    };
    model.adress.zone = data.info.zone;

    model.transport = data.info.transport;
    model.pet = data.info.pet;
    

    model.loger = data.info.loger;

    // ------------------------------
    // Job

    model.studyArea = [];
    model.studyArea.push(
      data.job.faculty
        ? {
            level: data.job.levelOfStudy,
            filiere: data.job.faculty,
            university: data.job.university,
          }
        : {level: data.job.levelOfStudy},
    );

    model.jobWish.sector = data.job.activityArea;
    model.portfolio = data.job.portfolio;
    model.socioLink= data.job.socioLink;
    model.fileCv = data.job.fileCv;
    model.jobWish.name = data.job.desiredPosition;
    model.jobWish.yearOfExperience = data.job.yearOfExp;
    model.jobWish.salaryExpectation = parseInt(
      data.job.minimumWageRequired,
      10,
    );

    model.disponibility = data.job.availability;
    model.statut = data.job.status;

    // Localisation
    model.jobLocalisation = [];

    if (data.job.listsPositions && data.job.listsPositions.length > 0) {
      for (const key in data.job.listsPositions) {
        model.jobLocalisation.push({
          country: {
            id:
              data.job[
                `country_${data.job.listsPositions[key]._id}`
              ].toString() ?? '',
            name:
              data.job[
                `country_${data.job.listsPositions[key]._id}`
              ].toString() ?? '',
          },
          province: {
            id:
              data.job[
                `province_${data.job.listsPositions[key]._id}`
              ].toString() ?? '',
            name:
              data.job[
                `province_${data.job.listsPositions[key]._id}`
              ].toString() ?? '',
          },
          zone:
            data.job[`zone_${data.job.listsPositions[key]._id}`].toString() ??
            '',
        });
      }
    }

    // Last Experiences
    model.lastExperience = [];

    if (data.job.yearsOfExperience && data.job.yearsOfExperience.length > 0) {
      for (const key in data.job.yearsOfExperience) {
        model.lastExperience.push({
          jobPlace:
            data.job[`at_${data.job.yearsOfExperience[key]._id}`].toString() ??
            '',
          jobType:
            data.job[
              `position_${data.job.yearsOfExperience[key]._id}`
            ].toString() ?? '',
          year: parseInt(
            data.job[`year_${data.job.yearsOfExperience[key]._id}`],
            10,
          ),
        });
      }
    }

    // Recommandation
    model.recommandation = [];
    if (data.job.recommandation && data.job.recommandation.length > 0) {
      for (const key in data.job.recommandation) {
        model.recommandation.push({
          name:
            data.job[`name_${data.job.recommandation[key]._id}`].toString() ??
            '',
          reference:
            data.job[
              `reference_${data.job.recommandation[key]._id}`
            ].toString() ?? '',
          file:
            data.job[`file_${data.job.recommandation[key]._id}`].toString() ??
            '',
        });
      }
    }

    // ---------------------------------------
    // Other
    model.languages = [];

    if (data.other.listLanguages && data.other.listLanguages.length > 0) {
      for (const key in data.other.listLanguages) {
        model.languages.push({
          name:
            data.other[
              `language_${data.other.listLanguages[key]._id}`
            ].toString() ?? '',
          level:
            data.other[
              `languageLevel_${data.other.listLanguages[key]._id}`
            ].toString() ?? '',
        });
      }
    }

    model.sport = [];

    if (data.other.centerIntrest) {
      model.interest = data.other.centerIntrest ?? '';
    }

    model.sport.push(data.other.sport);

    if (data.other.somethingAboutU) {
      model.presentation = data.other.somethingAboutU ?? '';
    }

    return model;
  } else {
    const newData: any = {id: '', info: {}, job: {}, other: {}};

    // personal information
    newData.id = data?.id || '';
    newData.info.name = data?.user?.lastName || '';
    newData.info.firstname = data?.user?.firstName || '';
    newData.info.birthdate = data?.user?.birthDate.toString() || '';
    newData.info.child = data?.user?.childrenNumber?.toString() || '0';
    newData.info.phone = data?.user?.phone || '';

    if (data?.user?.civility) {
      newData.info.civilstatus = data.user.civility;
    }

    newData.info.country = data.adress.country.id;
    newData.info.province = data.adress.province.id;
    newData.info.zone = data.adress.zone;

    newData.info.transport = data.transport;
    newData.info.pet = data.pet;
    newData.info.loger = data.loger;

    // ------------------------------
    // Job

    newData.job.levelOfStudy = data.studyArea[0].level.toString();
    newData.job.faculty = data.studyArea[0].filiere;
    newData.job.university = data.studyArea[0].university;
    newData.job.activityArea = data.jobWish.sector;
    newData.job.portfolio = data.portfolio;
    newData.job.socioLink=data.socioLink;
    newData.job.fileCv = data.fileCv;
    newData.job.desiredPosition = data.jobWish.name;
    newData.job.yearOfExp = data.jobWish.yearOfExperience.toString() ?? '';
    if (data?.jobWish?.salaryExpectation) {
      newData.job.minimumWageRequired =
        data.jobWish.salaryExpectation.toString() ?? '';
    }

    newData.job.availability = data.disponibility;
    newData.job.status = data.statut;

    // Localisation
    newData.job.listsPositions = [];
    if (data.jobLocalisation && data.jobLocalisation.length) {
      for (let i in data.jobLocalisation) {
        if (data.jobLocalisation[i].country.id.constructor.name === 'String') {
          const id = guidGenerator();
          newData.job.listsPositions.push({
            _id: id,
            country: '',
            province: '',
            zone: '',
          });
          newData.job[`country_${id}`] = data.jobLocalisation[i].country.id;

          if (
            data.jobLocalisation[i].province.id.constructor.name === 'String'
          ) {
            newData.job[`province_${id}`] = data.jobLocalisation[i].province.id;
          }

          newData.job[`province_${id}`] = data.jobLocalisation[i].province.id;
          newData.job[`zone_${id}`] = data.jobLocalisation[i].zone;
        }
      }
    }

    // Last Experiences
    newData.job.yearsOfExperience = [];
    if (data.lastExperience && data.lastExperience.length) {
      for (let i in data.lastExperience) {
        const id = guidGenerator();
        newData.job.yearsOfExperience.push({
          _id: id,
          year: '',
          position: '',
          at: '',
        });
        newData.job[`year_${id}`] =
          data.lastExperience[i].year?.toString() ?? '';
        newData.job[`position_${id}`] = data.lastExperience[i]?.jobType;
        newData.job[`at_${id}`] = data.lastExperience[i]?.jobPlace;
      }
    }

    newData.job.recommandation = [];
    if (data.recommandation && data.recommandation.length) {
      for (let i in data.recommandation) {
        const id = guidGenerator();
        newData.job.recommandation.push({
          _id: id,
          name: '',
          reference: '',
          file: '',
        });
        newData.job[`name_${id}`] = data.recommandation[i].name;
        newData.job[`reference_${id}`] = data.recommandation[i].reference;
        newData.job[`file_${id}`] = data.recommandation[i].file;
      }
    }

    // ---------------------------------------
    // Other
    newData.other.listLanguages = [];
    if (data.languages && data.languages.length) {
      for (let i in data.languages) {
        const id = guidGenerator();
        newData.other.listLanguages.push({
          _id: id,
          year: '',
          position: '',
          at: '',
        });
        newData.other[`language_${id}`] = data.languages[i].name;
        newData.other[`languageLevel_${id}`] = data.languages[i].level;
      }
    }

    newData.other.sport = data.sport[0];

    newData.other.centerIntrest = data.interest;

    newData.other.somethingAboutU = data.presentation;

    return newData;
  }
};
