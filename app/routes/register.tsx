import type { Route } from "./+types/home";
import { Signup_Page } from "~/auth/signup_page";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sign Up!" },
		{ name: "description", content: "Welcome to Buraco!" }
	];
}

export default function Register() {
	return <Signup_Page />;
}
