;
import { COLORS } from '../../../resources/constants';
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

export const viewStyles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16},
  pointBlue: {
    width: 12,
    height: 12,
    marginRight: 8},
  viewBlue: {
    paddingTop: 4},
  viewText: {
    paddingHorizontal: 5,
    flex: 1
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 15.15,
    letterSpacing: 1.5,
    color: COLORS.black,
    alignItems: 'center',
    textTransform: 'uppercase'},
  value: {
    top: 2,
    fontSize: 13,
    lineHeight: 15.15,
    letterSpacing: 1.5,
    color: COLORS.black,
    alignItems: 'center'},
  candidateAboutItem: {
    width: '50%'},
  candidateAboutContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: COLORS.white,
    borderStyle: 'dashed',
    marginHorizontal: 24,
    paddingTop: 24}});
