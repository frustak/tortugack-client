import reducer from './lobbyReducer';
import * as types from '../../constants/actionTypes';

describe('lobby reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual({
      lobbies: null,
      currentLobby: null,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBIES_FETCH}`, () => {
    const lobbies = [{ id: 'DUMMY LOBBY 1' }, { id: 'DUMMY LOBBY 2' }];
    expect(
      reducer(undefined, {
        type: types.LOBBIES_FETCH,
        lobbies,
      })
    ).toStrictEqual({
      lobbies,
      currentLobby: null,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBY_JOIN}`, () => {
    const data = 'DUMMY DATA';
    expect(
      reducer(undefined, {
        type: types.LOBBY_JOIN,
        data,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: data,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBY_FETCH}`, () => {
    const data = 'DUMMY DATA';
    expect(
      reducer(undefined, {
        type: types.LOBBY_FETCH,
        data,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: data,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBY_CREATE}`, () => {
    expect(
      reducer(undefined, {
        type: types.LOBBY_CREATE,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: null,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBY_LEAVE}`, () => {
    expect(
      reducer(undefined, {
        type: types.LOBBY_LEAVE,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: null,
      pollTimer: null,
    });
  });

  it(`should handle ${types.LOBBY_START_POLLING}`, () => {
    const timer = 'DUMMY TIMER';
    expect(
      reducer(undefined, {
        type: types.LOBBY_START_POLLING,
        timer,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: null,
      pollTimer: timer,
    });
  });

  it(`should handle ${types.LOBBY_STOP_POLLING}`, () => {
    expect(
      reducer(undefined, {
        type: types.LOBBY_STOP_POLLING,
      })
    ).toStrictEqual({
      lobbies: null,
      currentLobby: null,
      pollTimer: null,
    });
  });
});
