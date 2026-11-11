// REQ-021: texto vigente de los términos y condiciones. Al cambiar el contenido, sube la versión y la fecha.
export const TERMINOS_VERSION = "1.0"
export const TERMINOS_FECHA = "2026-11-11"
export const MENSAJE_ACEPTAR_TERMINOS = "Debes aceptar los términos y condiciones"

export const TERMINOS_SECCIONES: { titulo: string; texto: string }[] = [
  {
    titulo: "1. Qué es COGIT",
    texto:
      "COGIT es una plataforma educativa de práctica de pensamiento computacional mediante misiones y minijuegos. Esta versión es un MVP en fase de piloto: puede cambiar o tener fallos.",
  },
  {
    titulo: "2. Tu cuenta",
    texto:
      "Para usar COGIT creas una cuenta con un nombre de usuario, un correo y una contraseña. Eres responsable de mantener tu contraseña en secreto. Tu nombre de usuario funciona como alias público: no uses tu nombre real si no quieres mostrarlo.",
  },
  {
    titulo: "3. Qué datos recogemos y para qué",
    texto:
      "Solo guardamos lo necesario: tu alias, tu correo (únicamente para recuperar el acceso), tu contraseña cifrada y tu progreso (actividades completadas, puntajes y tiempos). Usamos esos datos para guardar tu avance, mostrar el ranking y mejorar la plataforma. No mostramos tu correo a otros estudiantes ni vendemos tus datos.",
  },
  {
    titulo: "4. Ranking",
    texto:
      "Por defecto apareces en el ranking con tu alias. Puedes excluirte en cualquier momento desde tu perfil.",
  },
  {
    titulo: "5. Uso adecuado",
    texto:
      "No intentes acceder a cuentas ajenas, alterar los resultados ni sobrecargar el servicio. Podemos suspender cuentas que incumplan estas reglas.",
  },
  {
    titulo: "6. Comunidad",
    texto:
      "La sección de comunidad es demostrativa: sus publicaciones son ejemplos y no se guardan comentarios de usuarios.",
  },
  {
    titulo: "7. Cambios",
    texto:
      "Si estos términos cambian, publicaremos la nueva versión en esta página con su fecha. Seguir usando COGIT después de un cambio implica aceptar la versión vigente.",
  },
]
