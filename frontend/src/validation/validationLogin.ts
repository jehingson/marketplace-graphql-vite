import * as Yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{10,}$/; // 10 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

export const validationLogin = (typeRegister: boolean = false) => {

  const username = Yup.string().max(255)
  const email = Yup.string()
  .email('El correo electrónico tiene que ser válido.')
  .max(255)
  const passwordSchema = Yup
  .string()
  // .matches(
  //   passwordRegex,
  //   'La contraseña debe tener al menos 10 caracteres, una mayúscula, una minúscula, un número y un caracter especial.',
  // );
  const confirmPasswordSchema = Yup
  .string()
  .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.');

  return Yup.object({
    username: typeRegister ? username.required('El usuario es requerido.')  : username.transform((value) => value || null).nullable(),
    email: email.required("El email es requerido."),
    password: passwordSchema.required('La contraseña es requerida.'),
    confirmPassword: typeRegister
    ? confirmPasswordSchema.required('La confirmación de contraseña es requerida.')
    : confirmPasswordSchema.transform((value) => value || null).nullable()
  })
}