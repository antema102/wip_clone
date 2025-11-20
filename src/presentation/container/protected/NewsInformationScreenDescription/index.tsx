import { Text, View } from 'react-native';
import { styles } from './styles'
import { useLocation } from 'react-router-dom';
const NewsInformationScreenDescription = (props: any) => {
    const { state } = useLocation();
    const { data } = state || {};
    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>
                {data.title}
            </Text>
            <Text style={styles.Body}>
                {data.body}
            </Text>
        </View>
    )
}

export default NewsInformationScreenDescription