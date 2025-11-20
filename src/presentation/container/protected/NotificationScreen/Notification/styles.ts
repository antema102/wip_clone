;
import { COLORS, SIZES } from '../../../../../resources/constants';
const windowDim = window.innerWidth;
export const styles = {
  containers: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden'},
  itemList: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 10},
  container_no_notification: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    minHeight: 400,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'relative'},
  imagesDimension: {
    width: 100,
    height: 100},
  content: {
    position: 'absolute',
    top: -25,
    backgroundColor: COLORS.blue_title,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10},
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.black},
  contentImage: {
    maxWidth: 500,
    justifyContent: 'center',
    alignItems: 'center'},
  textContent: {
    marginVertical: 16,
    fontSize: 16,
    textAlign: 'center'}});
