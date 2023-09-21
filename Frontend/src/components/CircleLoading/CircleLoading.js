import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch
} from '@fortawesome/free-solid-svg-icons'
import './circleLoading.scss'

function CircleLoading({ size = 'sm' }) {
    return (  
        <div
            className={[
                'spinner-icon',
                {size}
            ].join(' ')}
        >
            <FontAwesomeIcon icon={faCircleNotch} />
        </div>
    );
}

export default CircleLoading;