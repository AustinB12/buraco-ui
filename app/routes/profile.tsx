import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Profile Page" },
		{ name: "description", content: "User profile information" }
	];
}

export default function Profile() {
	return <div>Profile content goes here.</div>;
}
