import "./games_styles.css";
import { useSession } from "~/context/session_context";

export const Four_Player = ({
	game_data
}: {
	game_data: {
		players: { id: number; name: string; user_id: string }[] | null;
		game_id: string;
	};
}) => {
	const { session } = useSession();

	console.log(game_data);

	return (
		<div id="four-player-game-container">
			<div className="team" data-team={1}>
				<h4 className="team-name">Team 1</h4>
				<div className="players">
					<div
						className="player"
						data-team={1}
						data-current-player={
							session?.user.id === game_data?.players?.[0].user_id
						}
					>
						{game_data?.players && game_data?.players[0].name}
					</div>
					<div
						className="player"
						data-team={1}
						data-current-player={
							session?.user.id === game_data?.players?.[1].user_id
						}
					>
						{game_data?.players && game_data?.players[1].name}
					</div>
				</div>
			</div>
			<div className="team" data-team={2}>
				<h4 className="team-name">Team 2</h4>
				<div className="players">
					<div
						className="player"
						data-team={2}
						data-current-player={
							session?.user.id === game_data?.players?.[2].user_id
						}
					>
						{game_data?.players && game_data?.players[2].name}
					</div>
					<div
						className="player"
						data-team={2}
						data-current-player={
							session?.user.id === game_data?.players?.[3].user_id
						}
					>
						{game_data?.players && game_data?.players[3].name}
					</div>
				</div>
			</div>
		</div>
	);
};
