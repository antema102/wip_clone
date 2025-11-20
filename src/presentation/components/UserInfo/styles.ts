import { COLORS } from '../../../resources/constants';

export default {
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  iconEdit: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D9D9D933',
  },
  editIcon: {
    position: 'absolute',
    bottom: '10%',
    right: 0,
    backgroundColor: COLORS.fb_color,
    borderRadius: 16,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginLeft: 20,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  username: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    textAlign: 'center',
  },
};
