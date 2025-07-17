import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import supabase from "~/utils/sb_client";

import "./auth_styles.css";

export const Login_Page = () => {
	const [email, set_email] = useState("");
	const [password, set_password] = useState("");

	const nav = useNavigate();

	async function check_session(): Promise<void> {
		const session = await supabase.auth.getSession();
		if (session.data.session) {
			nav("/");
		}
	}

	check_session();

	async function handle_submit(e: React.FormEvent) {
		e.preventDefault();

		await supabase.auth
			.signInWithPassword({ email, password })
			.then(({ error }) => {
				if (error) {
					alert("Login failed: " + error.message);
					return;
				} else {
					console.log("Login successful");
					nav("/");
				}
			})
			.catch((error) => {
				alert("An error occurred: " + error.message);
			});
	}

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
					padding: "2rem 1rem",
					minWidth: "350px"
				}}
			>
				<h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login</h1>
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
				<button type="submit">
					<span>Login</span>
				</button>
				<button type="submit" style={{ marginTop: "1rem" }}>
					<span>
						<NavLink to="/signup">Create New Account</NavLink>
					</span>
				</button>
			</form>
		</div>
	);
};
