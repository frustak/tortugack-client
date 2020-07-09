import reducer from './errorReducer';
import * as types from '../../constants/actionTypes';

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      errorMsg: null,
    });
  });

  it(`should handle ${types.ERROR_SHOW}`, () => {
    const error = 'DUMMY ERROR';
    expect(
      reducer(undefined, {
        type: types.ERROR_SHOW,
        error,
      })
    ).toStrictEqual({
      errorMsg: error,
    });
  });

  it(`should handle ${types.ERROR_HIDE}`, () => {
    expect(
      reducer(undefined, {
        type: types.ERROR_HIDE,
      })
    ).toStrictEqual({
      errorMsg: null,
    });
  });
});
