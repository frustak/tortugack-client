import * as actions from './modalActions';
import * as types from '../../constants/actionTypes';

describe('modal actions', () => {
  it('should create an action to show modal with data', () => {
    const modalType = 'DUMMY TYPE';
    const data = 'DUMMY DATA';
    const expectedAction = {
      type: types.MODAL_SHOW,
      modalType,
      data,
    };
    expect(actions.showModal(modalType, data)).toStrictEqual(expectedAction);
  });

  it('should create an action to hide modal', () => {
    const expectedAction = {
      type: types.MODAL_HIDE,
    };
    expect(actions.hideModal()).toStrictEqual(expectedAction);
  });
});
