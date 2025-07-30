import "./games_styles.css";
import { useSession } from "~/context/session_context";

export const Three_Player = ({
	game_data
}: {
	game_data: {
		players: { id: number; name: string; user_id: string }[] | undefined;
		game_id: string;
	};
}) => {
	const { session } = useSession();

	return (
		<div id="three-player-game-container">
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
				</div>
			</div>
			<div className="team" data-team={2}>
				<h4 className="team-name">Team 2</h4>
				<div className="players">
					<div
						className="player"
						data-team={2}
						data-current-player={
							session?.user.id === game_data?.players?.[1].user_id
						}
					>
						{game_data?.players && game_data?.players[1].name}
					</div>
				</div>
			</div>
			<div className="team" data-team={3}>
				<h4 className="team-name">Team 3</h4>
				<div className="players">
					<div
						className="player"
						data-team={3}
						data-current-player={
							session?.user.id === game_data?.players?.[2].user_id
						}
					>
						{game_data?.players && game_data?.players[2].name}
					</div>
				</div>
			</div>
		</div>
	);
};
