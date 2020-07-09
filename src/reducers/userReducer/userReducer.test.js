import reducer from './userReducer';
import * as types from '../../constants/actionTypes';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      username: null,
      isVerified: false,
    });
  });

  it(`should handle ${types.USER_LOGIN}`, () => {
    const username = 'DUMMY USERNAME';
    expect(
      reducer(undefined, {
        type: types.USER_LOGIN,
        username,
      })
    ).toStrictEqual({
      username,
      isVerified: true,
    });
  });

  it(`should handle ${types.USER_VERIFY}`, () => {
    const username = 'DUMMY USERNAME';
    expect(
      reducer(undefined, {
        type: types.USER_VERIFY,
        username,
      })
    ).toStrictEqual({
      username,
      isVerified: true,
    });
  });

  it(`should handle ${types.USER_CHECK_STATE}`, () => {
    expect(
      reducer(undefined, {
        type: types.USER_CHECK_STATE,
      })
    ).toStrictEqual({
      username: null,
      isVerified: false,
    });
  });

  it(`should handle ${types.USER_LOGOUT}`, () => {
    expect(
      reducer(undefined, {
        type: types.USER_LOGOUT,
      })
    ).toStrictEqual({
      username: null,
      isVerified: false,
    });
  });
});
