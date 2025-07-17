import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "~/utils/sb_client";

import "./nav_styles.css";

export const Nav_Bar = () => {
	const [player_name, setPlayerName] = useState<string | null>(null);

	const nav = useNavigate();

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

	get_player_name();

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		if (!error) nav("/login");
	}
	return (
		<header className="">
			<div className="flex items-center">
				{/* <span className="text-xl font-bold text-white">Buraco</span> */}
				<input type="checkbox" id="checkbox" />
				<label htmlFor={"checkbox"} className="toggle">
					<div className="bars" id="bar1"></div>
					<div className="bars" id="bar2"></div>
					<div className="bars" id="bar3"></div>
				</label>
			</div>

			<nav>
				<a href="/" className="text-white px-3 py-2 cursor-pointer">
					Play Now
				</a>
				<a href="/rules" className="text-white px-3 py-2 cursor-pointer">
					Rules
				</a>
				<a href="/profile" className="text-white px-3 py-2 cursor-pointer">
					Profile
				</a>
				<a onClick={signOut} className="text-white px-3 py-2 cursor-pointer">
					Sign Out
				</a>
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
