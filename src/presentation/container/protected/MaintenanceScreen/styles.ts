;
import { COLORS } from '../../../../resources/constants';

export const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: '13%',
    backgroundColor: COLORS.white},
  logoWip: {
    position: 'absolute',
    top: 0, // Place it at the top of the container
    alignItems: 'center',
    width: 250,
    height: 250,
    objectFit: 'contain' as const,
    paddingTop: 180},
  image: {
    width: 250,
    height: 250,
    objectFit: 'contain' as const,
    marginBottom: 20},
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 20},
  title: {
    fontSize: 24, // Adjust the font size for the title
    fontWeight: 'bold', // Make the title bold
    marginBottom: 10, // Add spacing below the title
    color: '#333', // Adjust the title color
  }});
