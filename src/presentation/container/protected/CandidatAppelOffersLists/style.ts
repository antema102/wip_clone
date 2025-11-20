import { COLORS } from '../../../../resources/constants';
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
export const styles = {
  appelOffersContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderColor: COLORS.gray_border,
    padding: 18,
    gap: 24,
    marginTop:24,
    minHeight:275
  },
  appelOffersTitle: {
    fontSize: 18,
    fontWeight: 600
  },
  appelOffersContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  appelOffersButton: {
    backgroundColor: COLORS.blueInput,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginBottom:24,
    width:250
  },
  appelOffersButtonText: {
    color: COLORS.white,
    textAlign:'center',
    fontWeight:700
  
  }
};