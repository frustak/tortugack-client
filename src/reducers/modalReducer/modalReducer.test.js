import reducer from './modalReducer';
import * as types from '../../constants/actionTypes';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      isOpen: false,
      type: null,
      data: null,
    });
  });

  it(`should handle ${types.MODAL_SHOW}`, () => {
    const modalType = 'DUMMY MODAL';
    const data = 'DUMMY DATA';
    expect(
      reducer(undefined, {
        type: types.MODAL_SHOW,
        modalType,
        data,
      })
    ).toStrictEqual({
      isOpen: true,
      type: modalType,
      data,
    });
  });

  it(`should handle ${types.MODAL_HIDE}`, () => {
    expect(
      reducer(undefined, {
        type: types.MODAL_HIDE,
      })
    ).toStrictEqual({
      isOpen: false,
      type: null,
      data: null,
    });
  });
});
