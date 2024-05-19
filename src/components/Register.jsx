
export const Register = ({ switchAuthHandler }) => {
    return (
        <span onClick={switchAuthHandler} className="#">
            ¿Ya tienes una cuenta? ¡Inicia sesión acá...!
        </span>
    )
}