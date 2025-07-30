import React from "react";
import { Link } from "react-router";
import type {
	Four_Player_Game_Data,
	Three_Player_Game_Data,
	Two_Player_Game_Data
} from "./types";

type ViewGamesPageProps = {
	games: {
		four_player_games: Four_Player_Game_Data[] | null;
		three_player_games: Three_Player_Game_Data[] | null;
		two_player_games: Two_Player_Game_Data[] | null;
	};
};

export const View_Games_Page: React.FC<ViewGamesPageProps> = ({ games }) => {
	console.log(games);
	return (
		<div>
			<h3>4 Player Games</h3>
			<ul>
				{games.four_player_games &&
					games.four_player_games.map((game: any) => (
						<li key={game.id}>
							<Link to={`/four_player_games/${game.id}`} key={game.id}>
								{game.t1p1_name.name} & {game.t1p2_name.name} vs{" "}
								{game.t2p1_name.name} & {game.t2p2_name.name}
							</Link>
						</li>
					))}
			</ul>
			<h3>3 Player Games</h3>
			<h3>2 Player Games</h3>
		</div>
	);
};
