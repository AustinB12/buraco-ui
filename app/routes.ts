import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login.tsx"),
	route("signup", "routes/register.tsx"),
	route("profile", "routes/profile.tsx"),
	route("rules", "routes/how_to_play.tsx"),
	route("admin", "routes/admin.tsx"),
	route("games/:player_id", "routes/view_games.tsx"),
	route("four_player_games/:game_id", "./routes/four_player_game.tsx"),
	route("three_player_games/:game_id", "./routes/three_player_game.tsx"),
	route("two_player_games/:game_id", "./routes/two_player_game.tsx")
] satisfies RouteConfig;
