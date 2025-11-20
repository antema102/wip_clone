export const getDynamicListByKey = (key: string, dataJSON: any) => {
  const items = dataJSON.find((obj) => obj.label === key);
  if (items) {
    const result = items.listItem.map((value) => ({ value, label: value }));
    return result;
  }
};

export const getDynamicEchelleByKey = (key: string, dataJSON: any) => {
  const items = dataJSON.find((obj) => obj.label === key);
  if (items) {
    const result = [items?.min, items.max];
    return result;
  }
};

export default {
  getDynamicListByKey,
};
