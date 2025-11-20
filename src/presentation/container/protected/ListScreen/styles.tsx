import { COLORS, SIZES, FONTS } from '../../../../resources/constants';
export const styles = {
  container: {
    width: '100%'
  },
  containers: {
    width: '100%',
    height: '100%',
    padding: SIZES.padding,
    minHeight:300,
    shadowColor: '#000',
    marginTop:55,
    backgroundColor:COLORS.white,
    borderRadius:10,
    paddingTop:50,
    shadowOffset: {
      width: 0,
      height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    boxShadow: 'none'
  },
  containerFormList: {
    width: '100%'
  },
  contentResultContainer: {
    alignItems: 'center',
    paddingVertical: 100
  },
  contentResult: {
    textAlign: 'center'
  },
  centeredView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleHome: {
    ...FONTS.titleHomeBlack,
    alignContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  detailSub: {
    marginBottom: 20,
    marginTop: 20
  },
  titleDetails: {
    fontFamily: 'Oxygen',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#01129E'
  },
  buttonAcheter: {
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: '#01129E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: SIZES.padding2
  },
  noEvents: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: '45%',
    color: COLORS.black,
    fontSize: 20
  },
  detailValue: {
    fontFamily: 'Oxygen',
    fontStyle: 'normal',
    fontWeight: '400',
    color: '#323F4B'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15
  },
  textBtnSecondary: {
    color: COLORS.white,
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: SIZES.h5
  }
};