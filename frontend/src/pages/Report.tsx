import { useEffect, useState } from "react";
import { instance } from "../../config/axios.config";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setActor } from "../redux/ActorSlice";
import cat from "../assets/cat.webp";
import ReportList from "../components/list-cards/ReportcaseCard";

interface incident {
	img: any;
	title: string;
	timePassed: any;
	postedBy: any;
	shortDescription: string;
}

function ReportPage() {
	const [email, setEmail] = useState("");
	const [privacy, setPrivacy] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [recentCases, setRecentCases] = useState([]);

	const handleSubmit = async (event: any) => {
		event.preventDefault();

		//check if email is valid lums email
		if (email.split("@")[1] !== "lums.edu.pk") {
			setSuccessMsg("");
			setErrorMsg("Please enter a valid LUMS email address.");
			return;
		}

		try {
			const response = await instance.post("/incidents/validate", {
				email,
			});

			const data = await response.data;

			if (data.success) {
				setErrorMsg("");
				setSuccessMsg(data.message);
			}
		} catch (err: any) {
			console.log(err);
		}

		setEmail("");
		setPrivacy(false);
	};

	const getRecentCases = async () => {
		try {
			const response = await instance.get("/incidents/from/1");
			const data = await response.data;

			if (data.success) {
				console.log(data);

				setRecentCases(data.data);
			}
		} catch (err: any) {
			console.log(err);
		}
	};

	useEffect(() => {
		getRecentCases();
	}, []);

	const getElapsedTime = (time: any) => {
		const now = new Date();
		const then = new Date(time);

		const diff = now.getTime() - then.getTime();

		const seconds = Math.floor(diff / 1000);

		if (seconds < 60) {
			return `${seconds} seconds ago`;
		}

		const minutes = Math.floor(seconds / 60);

		if (minutes < 60) {
			return `${minutes} minutes ago`;
		}

		const hours = Math.floor(minutes / 60);

		if (hours < 24) {
			return `${hours} hours ago`;
		}

		const days = Math.floor(hours / 24);

	}
	return (
		<div>
			<div className="flex items-center justify-center mt-20 mb-10 p-4">
				<p className="text-4xl md:text-5xl text-black whitespace-nowrap">
					Report an Incident
				</p>
			</div>

			<div className="max-w-lg mx-auto mb-5">
				<form
					onSubmit={handleSubmit}
					className="bg-white md:shadow-md rounded-md p-4 md:p-10 flex flex-col space-y-10 "
				>
					{successMsg && (
						<div className="alert alert-success shadow-lg">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current flex-shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{successMsg}</span>
							</div>
						</div>
					)}
					{errorMsg && (
						<div className="alert alert-error shadow-lg">
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current flex-shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<span>{errorMsg}</span>
							</div>
						</div>
					)}
					<div className="mb-4 rounded-xl flex bg-gray-100 items-center justify-center p-2 space-x-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 mx-2"
							viewBox="0 0 448 512"
						>
							<path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
						</svg>
						<input
							type="email"
							id="email"
							placeholder="LUMS Email Address"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
							className="bg-gray-100 text-black w-full h-20 outline-none"
						/>
					</div>
					<div className="flex items-center mb-4 space-x-4">
						<input
							className="checkbox bg-gray-100"
							type="checkbox"
							id="privacy"
							checked={privacy}
							onChange={(event) => setPrivacy(event.target.checked)}
							required
						/>
						<label className="text-slate-300 text-sm">
							By continuing you agree to our privacy policy and terms of use.
						</label>
					</div>
					<div className="flex justify-center">
						<button
							type="submit"
							className="w-full text-lg bg-[#84221D] hover:scale-105 transition-all duration-150 text-white p-4 rounded-full shadow-lg"
						>
							Verify Email
						</button>
					</div>
				</form>
			</div>

			<div className="max-w-lg mx-auto px-4 text-black">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
					}}
				>
					<span style={{ fontWeight: "bold", fontSize: "24px" }}>
						Recent Cases
					</span>
				</div>
			</div>

			<div className="w-full flex flex-col items-center space-y-10 ">
				{recentCases.map((recentCase: any) => {
					return (
						<div className="md:w-1/3 object-contain" key={recentCase.IncidentId}>
							<div className="grid grid-cols-6 p-2">
								<figure className="w-full col-span-2 flex items-center justify-center">
									<img src={`/uploads/${recentCase?.Image}`} loading="lazy" alt="" className="p-2 m-2" />
								</figure>
								<div id="text" className="col-span-4 m-2">
									<div
										id="header"
										className="flex flex-col space-y-2 text-black"
									>
										<p className="text-2xl">{recentCase.Title}</p>
										<div className="flex flex-col items-center justify-items-center text-gray-400">
											<p className="w-full">{recentCase.Email}</p>
											<p className="w-full">{getElapsedTime(recentCase.CreatedAt)}</p>
										</div>
									</div>
									<div id="desc">
										<p className="h-40 leading-loose overflow-y-auto text-black">
											{recentCase.Description}
										</p>
									</div>
								</div>
							</div>

							<div className="divider"></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ReportPage;
