import { Link } from 'react-router-dom'
// Composant Logo
export default function Logo () {
    return (
        <Link to={"/"} >
        <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="PokémonLogo" className='h-full'/>
        </Link>
    )}