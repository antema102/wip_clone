import { COLORS, SIZES } from '../../../resources/constants';

export const styles = {
  logo: {
    width: 100,
    height: 30,
    objectFit: 'contain' as const,
    marginBottom: 16
  },
  logoMobile: {
    width: 80,
    height: 30,
    marginBottom: 5,
    objectFit: 'contain' as const
  },
  logoGuideline: {
    width: 24,
    height: 24,
    objectFit: 'contain' as const
  },
  container: {
    marginTop: 20,
    marginHorizontal: 10},

  containerLogo: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 50,
    marginTop: 5
  },
  logoWip: {
    width: 200,
    height: 50,
    objectFit: 'contain' as const
  },
  underline: {
    borderBottomWidth: 4,
    borderBottomColor: '#FE6D02'
  },
  navigationContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginRight:75
    
  },
  navigationContainerMobile: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'},

  active: {
    tintColor: COLORS.blueInput
  },
  nonActive: {
    tintColor:'rgba(114, 174, 233, 0.5)'
  },
  bellContainer: {
    flexDirection: 'row', // Ensure the bell and badge are in a row
    alignItems: 'center', // Align them vertically
  },

  badge: {
    position: 'absolute', // Position the badge absolutely within the container
    top: -8, // Adjust this value to position the badge as desired
    right: 25, // Adjust this value to position the badge as desired
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10
  },
  boxShadowBottom: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4}
});
