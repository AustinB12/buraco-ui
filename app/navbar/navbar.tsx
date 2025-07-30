import { use, useState } from "react";
import { Link } from "react-router";
import supabase from "~/utils/sb_client";

import "./nav_styles.css";
import { SessionContext, useSession } from "~/context/session_context";

export const Nav_Bar = () => {
	const [player_name, setPlayerName] = useState<string | null>(null);

	const { player } = use(SessionContext);

	async function get_player_name() {
		const { data, error } = await supabase
			.from("players")
			.select("name")
			.eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "")
			.single();
		if (error) {
			setPlayerName("Guest");
		} else {
			setPlayerName(data.name);
		}
	}

	if (!player_name) get_player_name();

	async function signOut() {
		supabase.auth.signOut();
	}
	return (
		<header>
			<div className="flex items-center">
				<input type="checkbox" id="checkbox" />
				<label htmlFor={"checkbox"} className="toggle">
					<div className="bars" id="bar1"></div>
					<div className="bars" id="bar2"></div>
					<div className="bars" id="bar3"></div>
				</label>
			</div>

			<nav>
				<Link to={"/games/" + player?.id}>Play</Link>
				<Link to="/rules">Rules</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/login" onClick={signOut}>
					Sign Out
				</Link>
			</nav>

			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-2">
					<span className="text-sm font-medium text-white">
						{player_name ? `Welcome, ${player_name}` : "Guest"}
					</span>
				</div>
			</div>
		</header>
	);
};
