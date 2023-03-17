const express = require('express');
const router = express.Router();
const {
    createEmployeeValidationRules, 
    updateEmployeeValidationRules,
    e_paramValidationRules
} = require('../validators/employee-validator');
const employeesController = require('../controllers/employees-controller');

router.get('/', employeesController.getAllEmployees);
router.get('/:eid', e_paramValidationRules, employeesController.getEmployeeById);

router.post('/', createEmployeeValidationRules, employeesController.createEmployee);
router.put('/:eid', e_paramValidationRules, updateEmployeeValidationRules, employeesController.updateEmployee);
router.delete('/:eid', e_paramValidationRules, employeesController.deleteEmployee);

module.exports = router;