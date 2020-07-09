import * as actions from './errorActions';
import * as types from '../../constants/actionTypes';

describe('error actions', () => {
  it('should create an action to show error with message', () => {
    const error = 'dummy error';
    const expectedAction = {
      type: types.ERROR_SHOW,
      error,
    };
    expect(actions.showError(error)).toStrictEqual(expectedAction);
  });

  it('should create and action to hide error', () => {
    const expectedAction = {
      type: types.ERROR_HIDE,
    };
    expect(actions.hideError()).toStrictEqual(expectedAction);
  });
});
