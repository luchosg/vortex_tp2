const express = require('express');
const router = express.Router();
const {createAssetValidationRules, updateAssetValidationRules, a_paramValidationRules} = require('../validators/asset-validator');
const {e_paramValidationRules} = require('../validators/employee-validator');

const assetsController = require('../controllers/assets-controller');

router.get('/', assetsController.getAllAssets);
router.get('/employee/:eid', e_paramValidationRules, assetsController.getAssetsByEmployeeId);
router.get('/:aid', a_paramValidationRules, assetsController.getAssetById);

router.post('/', createAssetValidationRules, assetsController.createAsset);
router.delete('/:aid', a_paramValidationRules, assetsController.deleteAsset);
router.put('/:aid', a_paramValidationRules, updateAssetValidationRules, assetsController.updateAsset);

module.exports = router;