import express from 'express';
const router = express.Router();
import { 
    userGenderAnalysis,
    userLocationAnalysis,
    voteGenderAnalysis,
    voteLocationAnalysis,
    voteCountAnalysis, 
    handGenderAnalysis,
    leafGenderAnalysis,
    getSelectiveLocationAnalysis,
    getSelectiveLocationGenderAnalysis
} from '../controllers/analysisController.js';


router.route('/userGender').get(userGenderAnalysis)
router.route('/userLocation').get(userLocationAnalysis)
router.route('/voteGender').get(voteGenderAnalysis)
router.route('/voteLocation').get(voteLocationAnalysis)
router.route('/voteCount').get(voteCountAnalysis)
router.route('/handGender').get(handGenderAnalysis)
router.route('/leafGender').get(leafGenderAnalysis)
router.route('/oneLocation').post(getSelectiveLocationAnalysis)
router.route('/oneLocationGender').post(getSelectiveLocationGenderAnalysis)

export default router;