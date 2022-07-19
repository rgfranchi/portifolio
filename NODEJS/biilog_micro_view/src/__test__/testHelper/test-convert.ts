export const convertIdToNumeric = (data: any) => {
  if (Array.isArray(data)) {
    data.forEach((element) => {
      element = convertIdToNumeric(element);
    });
  }

  if (typeof data === "object" && data) {
    Object.entries(data).forEach((value, key) => {
      const k = value[0];
      const v = value[1];
      if (typeof v === "object") {
        data[k] = convertIdToNumeric(v);
      }
      if (k === "id") {
        const parse = parseInt(data[k]);
        if (!isNaN(parse)) {
          data[k] = parse;
        }
      }
    });
  }
  return data;
};

export const convertDateYYYYMMDDToDD_MM_YYYY = (dateSrt: string) => {
  const dArr = dateSrt.split("-"); // ex input "2010-01-18"
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex out: "18/01/2010"
};
