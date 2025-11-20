;
import { COLORS, SIZES } from '../../../resources/constants';

let windowWidth = window.innerWidth;

export const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'},
  alignHorizontally: {
    flexDirection: 'row',
    marginVertical: 7},
  imgStyle: {
    objectFit: 'contain' as const,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
    height: 120,
    width: 120},
  intermediate: {
    width: 40}});
