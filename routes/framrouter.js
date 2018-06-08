var express = require('express');
var router = express.Router(); 
var control = require("../controllers/framcontroller.js");
var client = require("../dbpostgres.js"); 
var selectControler = require("../controllers/selectcontroller");


 
//all Executive
// router.get('/allcustomers1', control.executive_list); 
router.get('/allexecutive', control.executive_list);
// fermerdetails
router.get('/farmerdetails',control.farmer_list);

router.get('/farmdetails',control.farm_details); 

router.get('/today',control.today);


router.get('/Stateselect/:state', control.select_state);
router.get('/Distselect/:Dist', control.select_Dist);
router.get('/talukaselect/:taluka',control.select_taluka);
router.get('/villageselect/:village', control.select_vill);



router.get('/mapdata', control.map_data);
router.get('/mapdata/:id', control.map_data1);


router.get('/allvill',control.map_data);

// router.get('/editfarm/:id',control.edit);

router.get('/select/:val', control.edit);

router.get('/crop/:crop',control.crop);

router.get('/Data/:id', control.viewimage);


router.get('/NDVImage/:id',control.ndvi_image);

router.get('/original/:id',control.original_image);

router.get('/select/:id',control.fromdate);

router.get('/dat/:id',control.date);

router.get('/fm/:id',control.fmid);






router.get('/stateName',selectControler.stateName);
router.get('/districtName/:state',selectControler.districtName)
router.get('/talukaeName/:Dist',selectControler.talukaeName)
router.get('/villageName/:taluka',selectControler.villageName)




module.exports = router;
 