const connection = require('../config/db-config');
const functions = require('../utils/functions');

const getAllEmployees = async queryParams => {
    const {limit, page, ...filterParams} = queryParams;
    const sql = functions.filterAndPagination(`SELECT * FROM employees`, filterParams, limit, page);
    const employees = await connection.query(sql).spread(rows => rows);
    return employees;
}

// const getAllEmployees = async queryParams => {
//     const sql = functions.filterGet(`SELECT * FROM employees`, queryParams);
//     const employees = await connection.query(sql).spread(rows => rows);
//     return employees;
// }

const getEmployeeById = async eid => {
    const sql = `SELECT * FROM employees e WHERE e.id = ${eid}`;
    const employee = await connection.query(sql).spread(row => row);
    return employee;
}

const createEmployee = async reqBody => {
    const sql = functions.createBodyToSQL("employees", reqBody);
    const result = await connection.query(sql).spread(result => result);
    return result.insertId;
}

const deleteEmployee = async eid => {
    const sql = `DELETE FROM employees WHERE id = ${eid}`;
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

const updateEmployee = async (reqBody, eid) => {
    const sql = functions.updateBodyToSQL("employees", reqBody, eid);
    const result = await connection.query(sql).spread(result => result);
    return result.affectedRows;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    deleteEmployee,
    updateEmployee
}