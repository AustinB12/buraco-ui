import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("login", "routes/login.tsx"),
	route("signup", "routes/register.tsx"),
	route("profile", "routes/profile.tsx"),
	route("rules", "routes/how_to_play.tsx")
] satisfies RouteConfig;
