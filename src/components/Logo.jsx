/* eslint-disable react/prop-types */
import logo from '../assets/img/logo.svg'

export const Logo = ({text}) => {
    return(
        <div className='auth-form-logo-container'>
            <img src={logo} alt="logo"/>
            <span>{text}</span>
        </div>
    )
}