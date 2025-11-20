;
import { COLORS, SIZES } from '../../../../resources/constants';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 120,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 30,
    objectFit: 'contain' as const},
  centeredContent: {
    alignItems: 'center', // Center title and description horizontally
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10},
  homeTitle: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'},
  title: {
    bottom: 50,
    color: COLORS.white,
    fontWeight: 'bold'
  },
  titleLine: {
    width: 65,
    height: 5,
    backgroundColor: COLORS.white,
    bottom: 40
  },
  description: {
    padding: 30,
    fontSize: SIZES.h4,
    color: 'white',
    bottom: 40},
  cardContainer: {
    position: 'absolute',
    bottom: -120,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  cardContainerMobile: {
    position: 'relative'},
  card: {
    backgroundColor: 'white',
    padding: 60,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  cardMobile: {
    backgroundColor: "white",
    borderRadius: 10,
    gap: SIZES.padding,
    margin: 'auto',
    padding: 40
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'},
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5},
  columnText: {
    fontSize: 16},
  customIcon: {
    width: 64,
    height: 64,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20},
  locationIcon: {
    backgroundColor: COLORS.badge_color},
  emailIcon: {
    backgroundColor: COLORS.badge_color},
  phoneIcon: {
    backgroundColor: COLORS.badge_color},
  iconText: {
    fontSize: 24}});