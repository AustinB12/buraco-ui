import type { Route } from "./+types/how_to_play";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Profile Page" },
		{ name: "description", content: "User profile information" }
	];
}

export default function How_To_Play() {
	return <div>How to play content goes here.</div>;
}
