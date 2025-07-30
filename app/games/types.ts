export type Four_Player_Game_Data = {
	id: string;
	t1p1_name: { id: string; name: string };
	t1p2_name: { id: string; name: string };
	t2p1_name: { id: string; name: string };
	t2p2_name: { id: string; name: string };
};

export type Three_Player_Game_Data = {
	id: string;
	p1_name: { id: string; name: string };
	p2_name: { id: string; name: string };
	p3_name: { id: string; name: string };
};
export type Two_Player_Game_Data = {
	id: string;
	p1_name: { id: string; name: string };
	p2_name: { id: string; name: string };
};
