import { View_Games_Page } from "~/games/view_games_page";
import type { Route } from "./+types/view_games";
import supabase from "~/utils/sb_client";
import type {
	Four_Player_Game_Data,
	Three_Player_Game_Data,
	Two_Player_Game_Data
} from "~/games/types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "View Games" },
		{ name: "description", content: "Welcome to Buraco!" }
	];
}
export async function loader({ params }: Route.LoaderArgs) {
	const four_player_games = await supabase
		.from("4p_games")
		.select(
			"id, t1p1_name:players!t1p1( id, name ), t1p2_name:players!t1p2( id, name ), t2p1_name:players!t2p1( id, name ), t2p2_name:players!t2p2( id, name )"
		)
		.or(
			"t1p1.eq." +
				params.player_id +
				",t1p2.eq." +
				params.player_id +
				",t2p1.eq." +
				params.player_id +
				",t2p2.eq." +
				params.player_id
		);
	const three_player_games = await supabase
		.from("3p_games")
		.select(
			"id, p1_name:players!p1( id, name ), p2_name:players!p2( id, name ), p3_name:players!p3( id, name )"
		)
		.or(
			"p1.eq." +
				params.player_id +
				",p2.eq." +
				params.player_id +
				",p3.eq." +
				params.player_id
		);
	const two_player_games = await supabase
		.from("2p_games")
		.select(
			"id, p1_name:players!p1( id, name ), p2_name:players!p2( id, name )"
		)
		.or("p1.eq." + params.player_id + ",p2.eq." + params.player_id);
	return {
		four_player_games: four_player_games?.data
			? four_player_games.data.map((game) => {
					return {
						id: game.id,
						t1p1_name: { id: game.t1p1_name.id, name: game.t1p1_name.name },
						t1p2_name: { id: game.t1p2_name.id, name: game.t1p2_name.name },
						t2p1_name: { id: game.t2p1_name.id, name: game.t2p1_name.name },
						t2p2_name: { id: game.t2p2_name.id, name: game.t2p2_name.name }
					} as Four_Player_Game_Data;
			  })
			: [],
		three_player_games: three_player_games.data
			? three_player_games.data.map((game) => {
					return {
						id: game.id,
						p1_name: { id: game.p1_name.id, name: game.p1_name.name },
						p2_name: { id: game.p2_name.id, name: game.p2_name.name },
						p3_name: { id: game.p3_name.id, name: game.p3_name.name }
					} as Three_Player_Game_Data;
			  })
			: [],
		two_player_games: two_player_games.data
			? two_player_games.data.map((game) => {
					return {
						id: game.id,
						p1_name: { id: game.p1_name.id, name: game.p1_name.name },
						p2_name: { id: game.p2_name.id, name: game.p2_name.name }
					} as Two_Player_Game_Data;
			  })
			: []
	};
}

export default function View_Games({ loaderData }: Route.ComponentProps) {
	return <View_Games_Page games={loaderData} />;
}
