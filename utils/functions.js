const updateBodyToSQL = (tableName, reqBody, eid) => {
    const keysArray = Object.keys(reqBody);
    const valuesArray = Object.values(reqBody);
    const length = keysArray.length;
    let sql = `UPDATE ${tableName} t SET `
    for(let i = 0; i<length; i++){
        if(i === length-1){
            sql += `${keysArray[i]} = "${valuesArray[i]}" `
        } else {
            sql += `${keyArray[i]} = "${valuesArray[i]}", `
        }
    }
    sql += `WHERE t.id = ${eid}`;
    return sql;
}

// const createBodyToSQL = (tableName, reqBody) => {
//     const keysArray = Object.keys(reqBody);
//     const valuesArray = Object.values(reqBody);
//     const length = keysArray.length;
//     let sql = `INSERT INTO ${tableName}`;
//     let fields = `(`;
//     let values = ` VALUES(`;
//     for(let i = 0; length; i++){
//         if(i === length-1){
//             fields += `${keysArray[i]})`;
//             values += `"${valuesArray[i]}")`;
//         } else {
//             fields += `${keysArray[i]}, `;
//             values += `"${valuesArray[i]}", `;
//         }
//     }
//     sql = sql + fields + values;
//     return sql;
// }

const createBodyToSQL = (tableName, reqBody) => {
    const keysArray = Object.keys(reqBody);
    const valuesArray = Object.values(reqBody);
    const fields = keysArray.join(", ");
    const values = valuesArray.map(value => `'${value}'`).join(", ");
    return `INSERT INTO ${tableName} (${fields}) VALUES (${values})`;
  }

const filterAndPagination = (baseSQL, filterParams, limit = 5, page = 1) => {
    let newSQL = baseSQL;
    const keysArray = Object.keys(filterParams);
    const valuesArray = Object.values(filterParams);
    const length = keysArray.length;
    const offset = (page-1)*limit;
    if(length === 0) return baseSQL+` LIMIT ${limit} OFFSET ${offset}`;
    else {
        for(let i = 0; i<length; i++){
            if(i === 0) {
                newSQL += ` WHERE ${keysArray[i]} LIKE "${valuesArray[i]}"`
            } else {
                newSQL += ` AND ${keysArray[i]} LIKE "${valuesArray[i]}"`
            }
        }
    }
    newSQL += ` LIMIT ${limit} OFFSET ${offset}`;
    return newSQL;
}

// const filterGet = (baseSQL, queryParams) => {
//     let newSQL = baseSQL;
//     const keysArray = Object.keys(queryParams);
//     const valuesArray = Object.values(queryParams);
//     const length = keysArray.length;
//     if(length === 0) return baseSQL;
//     else {
//         for(let i = 0; i<length; i++){
//             if(i === 0) {
//                 newSQL += ` WHERE ${keysArray[i]} like "${valuesArray[i]}"`
//             } else {
//                 newSQL += ` AND ${keysArray[i]} like "${valuesArray[i]}"`
//             }
//         }
//     }
//     return newSQL;
// }

module.exports = {
    updateBodyToSQL,
    createBodyToSQL,
    filterAndPagination
}

