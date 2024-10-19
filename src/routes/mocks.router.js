import { Router } from 'express';
const router = Router();

router.get("/mockingpets", mocksController.getMockingPets);

router.get("/mockingusers", mocksController.getMockingUsers);




export default router;