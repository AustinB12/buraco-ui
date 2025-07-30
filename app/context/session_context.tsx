import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import supabase from "~/utils/sb_client";
import Loading_Page from "~/loading_page";

type Player = {
	id: number;
	name: string;
	user_id: string;
};

export const SessionContext = createContext<{
	session: Session | null;
	player: Player | null;
}>({
	session: null,
	player: null
});

export const useSession = () => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider");
	}
	return context;
};

type Props = { children: React.ReactNode };
export const SessionProvider = ({ children }: Props) => {
	const [session, setSession] = useState<Session | null>(null);
	const [player, setPlayer] = useState<Player | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const authStateListener = supabase.auth.onAuthStateChange(
			async (_, session) => {
				setSession(session);

				setIsLoading(false);
			}
		);

		return () => {
			authStateListener.data.subscription.unsubscribe();
		};
	}, [supabase]);

	async function fetchPlayer() {
		console.log(session?.user?.id);

		if (session?.user?.id) {
			const found_player = await supabase
				.from("players")
				.select("id, name, user_id")
				.eq("user_id", session?.user?.id ?? "")
				.single();
			setPlayer({
				id: found_player.data?.id ?? 0,
				name: found_player.data?.name ?? "",
				user_id: found_player.data?.user_id ?? ""
			});
		}
	}

	useEffect(() => {
		fetchPlayer();

		if (isLoading) {
			setIsLoading(false);
		}
	}, [session]);

	return (
		<SessionContext.Provider value={{ session, player }}>
			{isLoading ? <Loading_Page /> : children}
		</SessionContext.Provider>
	);
};
