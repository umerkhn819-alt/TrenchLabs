import { Router } from 'express';
import authRoutes from './auth.js';
import contactsRoutes from './contacts.js';
import careersRoutes from './careers.js';
import internshipsRoutes from './internships.js';
import bookingsRoutes from './bookings.js';
import telemetryRoutes from './telemetry.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/contacts', contactsRoutes);
router.use('/careers', careersRoutes);
router.use('/internships', internshipsRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/telemetry', telemetryRoutes);

export default router;
