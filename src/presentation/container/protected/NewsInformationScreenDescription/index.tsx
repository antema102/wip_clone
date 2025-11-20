;
import { styles } from './styles'
import { useLocation } from 'react-router-dom';
const NewsInformationScreenDescription = (props: any) => {
    const { state } = useLocation();
    const { data } = state || {};
    return (
        <div style={styles.Container}>
            <span style={styles.Title}>
                {data.title}
            </span>
            <span style={styles.Body}>
                {data.body}
            </span>
        </div>
    )
}

export default NewsInformationScreenDescription