import express from 'express';
import Members from '../controllers/members';

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).send('Hello Ben');
});
router.get('/member/officials', Members);


export default router;
