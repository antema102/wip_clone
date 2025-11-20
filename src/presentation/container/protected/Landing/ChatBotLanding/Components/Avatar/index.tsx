import './styles.scss';
import { images } from '../../../../../../../resources/constants';
const Avatar = () => {
    return (
        <div className='avatar'>
            <img src={images.wipWorkRadius} height={28} width={28} alt='' />
        </div>
    )
}

export default Avatar;