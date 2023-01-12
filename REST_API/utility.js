export function rename_IdToid(arrayOfObj){
    const newArrayOfObj = arrayOfObj.map(({_id: id, ...rest}) => ({ id, ...rest }));
    return newArrayOfObj
}

