import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import supabase from "~/utils/sb_client";

export const Signup_Page = () => {
	const nav = useNavigate();

	const [email, set_email] = useState("");
	const [password, set_password] = useState("");
	const [username, set_username] = useState("");

	const handle_submit = (e: React.FormEvent) => {
		e.preventDefault();

		supabase.auth.signUp({ email, password }).then(async ({ error, data }) => {
			if (error) {
				alert("Signup failed: " + error.message);
			} else {
				const { error } = await supabase
					.from("players")
					.insert({ user_id: data.user?.id, name: username });
				nav("/");
			}
		});
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<div id="box-1"></div>
			<div id="box-2"></div>
			<div id="box-3"></div>
			<form
				onSubmit={handle_submit}
				style={{
					padding: "2rem",
					borderRadius: "8px",
					boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
					minWidth: "300px"
				}}
			>
				<h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
					Create an Account
				</h1>
				<div style={{ marginBottom: "1rem" }}>
					<label style={{ display: "block", marginBottom: ".5rem" }}>
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => set_email(e.target.value)}
						style={{
							width: "100%",
							padding: ".5rem",
							borderRadius: "4px",
							border: "1px solid #ccc"
						}}
						required
					/>
				</div>
				<div style={{ marginBottom: "1.5rem" }}>
					<label style={{ display: "block", marginBottom: ".5rem" }}>
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => set_password(e.target.value)}
						style={{
							width: "100%",
							padding: ".5rem",
							borderRadius: "4px",
							border: "1px solid #ccc"
						}}
						required
					/>
				</div>
				<div style={{ marginBottom: "1.5rem" }}>
					<label style={{ display: "block", marginBottom: ".5rem" }}>
						Username <span style={{ color: "gray" }}>(optional)</span>
					</label>
					<input
						type="text"
						value={username}
						onChange={(e) => set_username(e.target.value)}
						style={{
							width: "100%",
							padding: ".5rem",
							borderRadius: "4px",
							border: "1px solid #ccc"
						}}
					/>
				</div>
				<button type="submit">
					<span>Create</span>
				</button>
				<button style={{ marginTop: "1rem" }}>
					<span>
						<NavLink to="/login">Back to Login</NavLink>
					</span>
				</button>
			</form>
		</div>
	);
};
