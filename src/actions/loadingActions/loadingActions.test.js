import * as actions from './loadingActions';
import * as types from '../../constants/actionTypes';

describe('loading actions', () => {
  it('should create an action to show loading', () => {
    const expectedAction = {
      type: types.LOADING_SHOW,
    };
    expect(actions.showLoading()).toStrictEqual(expectedAction);
  });

  it('should create and action to hide loading', () => {
    const expectedAction = {
      type: types.LOADING_HIDE,
    };
    expect(actions.hideLoading()).toStrictEqual(expectedAction);
  });
});
