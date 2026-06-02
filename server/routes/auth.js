import express from 'express'
const router = express.Router()
import auth from '../middlewares/authMiddleware.js'

import { registerUser, createPreUser, loginUser, logout,
 accountSessions, revokeSession, recoverPassword, changePassword} from '../controllers/auth.js';

router.post('/register', createPreUser);
router.post('/verify-otp', registerUser);
router.post('/login', loginUser)
router.post('/logout', auth, logout);

router.get('/account-sessions', auth, accountSessions);
router.put('/session-revoke', auth, revokeSession);
router.post('/recover-password', recoverPassword);
router.post('/change-password', changePassword)

export default router;
