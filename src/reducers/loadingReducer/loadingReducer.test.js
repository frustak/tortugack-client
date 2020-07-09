import reducer from './loadingReducer';
import * as types from '../../constants/actionTypes';

describe('loading reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      show: false,
    });
  });

  it(`should handle ${types.LOADING_SHOW}`, () => {
    expect(
      reducer(undefined, {
        type: types.LOADING_SHOW,
      })
    ).toStrictEqual({
      show: true,
    });
  });

  it(`should handle ${types.LOADING_HIDE}`, () => {
    expect(
      reducer(undefined, {
        type: types.LOADING_HIDE,
      })
    ).toStrictEqual({
      show: false,
    });
  });
});
