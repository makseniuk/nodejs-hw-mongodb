import express from 'express';
import { registerUser, loginUser, refreshSession, logoutUser, sendResetEmail } from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { userRegisterSchema, userLoginSchema } from '../validation/authValidation.js';
import { resetEmailSchema } from '../validation/authValidation.js';

const router = express.Router();

router.post('/register', validateBody(userRegisterSchema), registerUser);
router.post('/login', validateBody(userLoginSchema), loginUser);
router.post('/refresh', refreshSession);
router.post('/logout', logoutUser);
router.post('/send-reset-email', validateBody(resetEmailSchema), sendResetEmail);


export default router;
