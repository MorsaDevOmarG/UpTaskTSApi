import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

// router.get('/', (req, res) => {
//   res.send('desde /api/auth');
// });

router.post(
  '/create-account',
  body('name')
    .notEmpty()
    .withMessage('El Nombre no puede ir vacío'),
  body('password')
    .isLength({
      min: 8
    })
    .withMessage('El Password es muy corto, minímo 8 carácteres'),
  body('password_confirmation')
    .custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Los Password no son iguales')
        }

        return true;
      }
    ),
  body('email')
    .isEmail()
    .withMessage('El E-mail no es válido'),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  '/confirm-account',
  body('token')
    .notEmpty()
    .withMessage('El Token no puede ir vacío'),
  handleInputErrors,
  AuthController.confirmAccount
);

router.post(
  "/login",
  body("email")
    .isEmail()
    .withMessage("El E-mail no es válido"),
  body("password")
    .notEmpty()
    .withMessage("El Password no puede ir vacío"),
  handleInputErrors,
  AuthController.login,
);

export default router;