import { Four_Player } from "~/games/four_player";
import type { Route } from "./+types/four_player_game";
import supabase from "~/utils/sb_client";

// provides type safety/inference

// provides `loaderData` to the component
export async function loader({ params }: Route.LoaderArgs) {
	let game_data = await supabase
		.from("4p_games")
		.select("t1p1, t1p2, t2p1, t2p2")
		.eq("id", params.game_id)
		.single();
	console.log("\n\nGame data:", game_data);

	let players = await supabase
		.from("players")
		.select("id, name, user_id")
		.in("id", [
			game_data.data?.t1p1,
			game_data.data?.t1p2,
			game_data.data?.t2p1,
			game_data.data?.t2p2
		]);
	console.log("\n\nPlayers data:", players.data);

	// const user = await supabase.auth.getSession();
	const {
		data: { user }
	} = await supabase.auth.getUser();
	console.log("\n\nUser data:", user);

	let current_player;
	if (user?.id) {
		current_player = await supabase
			.from("players")
			.select("id, name")
			.eq("user_id", user?.id)
			.single();
	}
	return {
		user_id: current_player ? current_player.data?.id : null,
		players: players.data,
		game_id: params.game_id
	};
}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Lets Play Cards!" },
		{ name: "description", content: "Welcome to Buraco!" }
	];
}

// renders after the loader is done
export default function Four_Player_Game({ loaderData }: Route.ComponentProps) {
	return <Four_Player game_data={loaderData} />;
}
