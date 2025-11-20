interface data {
  activitySector: string;
  profil: string;
  disponibility: string;
  minSalary: string;
  activitySector_level: string;
  profil_level: string;
  disponibility_level: string;
  minSalary_level: string;
}

interface modelObject {
  value: string | number;
  score: number;
}

interface model {
  profil?: modelObject,
  activitySector?: modelObject,
  disponibility?: modelObject,
  salaryExpectation?: modelObject}

// -----------------------------------------------------------

export const transformData = (obj) => {
  var data = {
    "jobWish": {
      "value": "string",
      "score": 0
    },
    "activitySector": {
      "value": "string",
      "score": 0
    },
    "disponibility": {
      "value": "string",
      "score": 0
    },
    "salaryExpectation": {
      "value": 0,
      "score": 0
    }
  }

  for (const property in obj) {
    if (!property.includes("_level")) {
      data[property]["value"] = typeof data[property]["value"] === 'number'? parseInt(obj[property]) : obj[property]
    } else {
      const key = property.replace("_level", "")
      data[key]["score"] = parseInt(obj[property])
    }
  }
  
  return data

}

export const format = (data: data) => {
  const model: model = {};

  if (data.activitySector) model.activitySector = {
    value: data.activitySector,
    score: parseInt(data.activitySector_level)
  }
  if (data.profil) model.profil = {
    value: data.profil,
    score: parseInt(data.profil_level)
  }
  if (data.disponibility) model.disponibility = {
    value: data.disponibility,
    score: parseInt(data.disponibility_level)
  }
  if (data.minSalary) model.salaryExpectation = {
    value: parseInt(data.minSalary),
    score: parseInt(data.minSalary_level)
  }

  return model; 
}