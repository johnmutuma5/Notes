export const doMeltColumns = (rawData, sourceColumns, intoColumn, valuesTarget) => {
  const data = [];
  rawData.map(record => {
    sourceColumns.map(column => {
      const newRecord = {
        datetime: new Date(record.datetime),
        [intoColumn]: column,
        [valuesTarget]: +record[column]
      };
      data.push(newRecord);
    });
  });
  return data;
}
