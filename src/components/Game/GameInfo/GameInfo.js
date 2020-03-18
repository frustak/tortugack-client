import React from 'react';

function GameInfo(props) {
  console.log(props.data);

  return (
    <>
      <p>turn: {props.data.turn.username}</p>
      <p>team: {props.data.player_game_info.team}</p>
    </>
  );
}

export default GameInfo;

// const t = {
//   game_status: {
//     players_position: {},
//     chests_position: {},
//     player_game_info: {
//       team: 'france',
//       vote_cards: null,
//       event_cards: null,
//       role: null,
//     },
//     last_action: null,
//     is_over: false,
//     turn: { username: 'frost' },
//     winner: null,
//   },
// };
