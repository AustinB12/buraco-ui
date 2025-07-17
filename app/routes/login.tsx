import type { Route } from "./+types/login";
import { Login_Page } from "~/auth/login_page";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Login to Play!" },
		{ name: "description", content: "Welcome to Buraco!" }
	];
}

export default function Login() {
	return <Login_Page />;
}
