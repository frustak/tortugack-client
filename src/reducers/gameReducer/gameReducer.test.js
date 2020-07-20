import reducer from './gameReducer';
import * as types from '../../constants/actionTypes';

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      data: null,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_START}`, () => {
    expect(
      reducer(undefined, {
        type: types.GAME_START,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_FETCH}`, () => {
    const data = 'DUMMY DATA';
    expect(
      reducer(undefined, {
        type: types.GAME_FETCH,
        data,
      })
    ).toStrictEqual({
      data,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_DO_ACTION}`, () => {
    expect(
      reducer(undefined, {
        type: types.GAME_DO_ACTION,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_LEAVE}`, () => {
    expect(
      reducer(undefined, {
        type: types.GAME_LEAVE,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_START_POLLING}`, () => {
    const timer = 'DUMMY TIMER';
    expect(
      reducer(undefined, {
        type: types.GAME_START_POLLING,
        timer,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: timer,
      players: [],
    });
  });

  it(`should handle ${types.GAME_STOP_POLLING}`, () => {
    expect(
      reducer(undefined, {
        type: types.GAME_STOP_POLLING,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: null,
      players: [],
    });
  });

  it(`should handle ${types.GAME_SET_PLAYERS}`, () => {
    const players = ['DUMMY PLAYER 1', 'DUMMY PLAYER 2'];
    expect(
      reducer(undefined, {
        type: types.GAME_SET_PLAYERS,
        players,
      })
    ).toStrictEqual({
      data: null,
      pollTimer: null,
      players,
    });
  });
});
