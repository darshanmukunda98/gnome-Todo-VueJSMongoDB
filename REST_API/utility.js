export function rename_IdToid(arrayOfObj) {
  const newArrayOfObj = arrayOfObj.map(({ _id: id, ...rest }) => ({
    id,
    ...rest
  }));
  return newArrayOfObj;
}

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === '{}' || JSON.stringify(obj) === '[]';
}
