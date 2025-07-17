import { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import supabase from "~/utils/sb_client";
import Loading_Page from "~/loading_page";

const SessionContext = createContext<{
	session: Session | null;
}>({
	session: null
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
	const [isLoading, setIsLoading] = useState(true);

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

	return (
		<SessionContext.Provider value={{ session }}>
			{isLoading ? <Loading_Page /> : children}
		</SessionContext.Provider>
	);
};
