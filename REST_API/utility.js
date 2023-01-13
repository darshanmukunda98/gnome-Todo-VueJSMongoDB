export function rename_IdToid(arrayOfObj) {
  const newArrayOfObj = arrayOfObj.map(({ _id: id, ...rest }) => ({
    id,
    ...rest
  }));
  return newArrayOfObj;
}
export function renameidTo_id(arrayOfObj) {
  const newArrayOfObj = arrayOfObj.map(({ id: _id, ...rest }) => ({
    _id,
    ...rest
  }));
  return newArrayOfObj;
}

export function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}'||JSON.stringify(obj) ==='[]'
}
