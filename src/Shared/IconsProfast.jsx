import { Link } from 'react-router-dom';
import icon from '../assets/logo.png'


const IconsProfast = () => {

    return (
        <div data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000" className='flex '>
            <img className='w-9 h-10' src={icon} alt="" />
            <Link to={'/'}><p className='flex items-end text-2xl font-bold -ml-4'>Profast</p></Link>
        </div>
    );
};

export default IconsProfast;