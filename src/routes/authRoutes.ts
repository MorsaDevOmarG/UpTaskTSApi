import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router();

// router.get('/', (req, res) => {
//   res.send('desde /api/auth');
// });

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El Nombre no puede ir vacío"),
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("El Password es muy corto, minímo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }

    return true;
  }),
  body("email").isEmail().withMessage("El E-mail no es válido"),
  handleInputErrors,
  AuthController.createAccount,
);

router.post(
  "/confirm-account",
  body("token").notEmpty().withMessage("El Token no puede ir vacío"),
  handleInputErrors,
  AuthController.confirmAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("El E-mail no es válido"),
  body("password").notEmpty().withMessage("El Password no puede ir vacío"),
  handleInputErrors,
  AuthController.login,
);

router.post(
  "/request-code",
  body("email").isEmail().withMessage("El E-mail no es válido"),
  handleInputErrors,
  AuthController.requestConfirmationCode,
);

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("El E-mail no es válido"),
  handleInputErrors,
  AuthController.forgotPassword,
);

router.post(
  "/validate-token",
  body("token").notEmpty().withMessage("El Token no puede ir vacío"),
  handleInputErrors,
  AuthController.validateToken,
);

router.post(
  "/update-password/:token",
  param("token").isNumeric().withMessage("Token no válido"),
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("El Password es muy corto, minímo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }

    return true;
  }),
  handleInputErrors,
  AuthController.updatePasswordWithToken,
);

router.get(
  '/user',
  authenticate,
  AuthController.user
);

// Profile
router.put(
  "/profile",
  authenticate,
  body("name").notEmpty().withMessage("El Nombre no puede ir vacío"),
  body("email").isEmail().withMessage("El E-mail no es válido"),
  handleInputErrors,
  AuthController.updateProfile,
);

router.post(
  "/update-password",
  authenticate,
  body("current_password").notEmpty().withMessage("El Password actual no puede ir vacío"),
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("El Password es muy corto, minímo 8 carácteres"),
  body("password_confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Los Password no son iguales");
    }

    return true;
  }),
  handleInputErrors,
  AuthController.updateCurrentUserPassword
);

export default router;
