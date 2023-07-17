import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../../config/axios.config";

function AddReport() {
	const [previewImage, setPreviewImage] = useState<string | undefined>();
	const [locations, setLocations] = useState([]);
	const [image, setImage] = useState<any>(null);
	const [values, setValues] = useState({});
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [successMsg, setSuccessMsg] = useState<string>("");
	const navigate = useNavigate();

	//check if there is a token in the URL on mount
	useEffect(() => {
		const url = window.location.href;
		const hasToken = url.includes("token=");
		if (hasToken) {
			const token = url.split("token=")[1];
			localStorage.setItem("token", token);
		}
	}, []);

	const handleImageChange = (event: any) => {
		const file = event.target.files?.[0];

		if (!file) {
			setPreviewImage(undefined);
			return;
		}

		const reader = new FileReader();

		reader.onload = (event) => {
			setPreviewImage(event.target?.result as string);
		};

		reader.readAsDataURL(file);

		setImage(file);
		setValues({ ...values, incidentImg: file });
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const form = new FormData(event.target);
		form.append("incidentImg", image);

		setValues({ ...values, incidentImg: image });

		try {
			const response = await instance.post(
				`${import.meta.env.VITE_API_URL}/api/incidents/create`,
				values,
				{
					headers: {
						"Authorization" : `Bearer ${localStorage.getItem("token")}`,
						"Content-Type" : "multipart/form-data",

					},
				}
			);

			const data = await response.data;

			if (data.success) {
				setSuccessMsg(data.message);
				setErrorMsg("");

				//reset form
				event.target.reset();

				//remove token from local storage
				localStorage.removeItem("token");

				//redirect to home page
				setTimeout(() => {
					navigate("/");
				}, 2000);
			} else {
				setErrorMsg(data.message);
				setSuccessMsg("");
			}
		} catch (error) {}
	};

	const getLocations = async () => {
		try {
			const response = await instance.get("/locations/");
			const data = await response.data;
			console.log(data);

			if (data.success) {
				console.log(data.data);

				setLocations(data.data);
			}
		} catch (err: any) {
			console.log(err);
		}
	};

	const changeHandler = (e: any) => {
		console.log(e.target.name, e.target.value);

		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		getLocations();
	}, []);

	return (
		<div className="w-full flex flex-col space-y-10">
			<div className="flex flex-col items-center justify-center space-y-2">
				<p className="text-2xl font-thin md:text-3xl  text-center mt-10 text-gray-400">
					Almost There,
				</p>
				<p className="text-4xl md:text-5xl text-center text-black">
					Tell Us More
				</p>
			</div>

			<div className="flex items-center justify-center">
				<form
					action=""
					// encType="multipart/form-data"
					name="reportForm"
					onSubmit={handleSubmit}
					className="w-full md:w-auto p-5 md:p-10 flex flex-col space-y-10 md:shadow rounded-xl"
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
					<div className="flex flex-col md:flex-row md:space-x-10 space-y-10 md:space-y-0 ">
						<div className="flex flex-col space-y-10">
							<div className="rounded-xl flex bg-gray-100 items-center justify-center p-2 space-x-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 m-2"
									viewBox="0 0 384 512"
								>
									<path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
								</svg>
								<input
									name="title"
									type="text"
									id="title"
									placeholder="Case Title"
									required
									onChange={changeHandler}
									className="bg-gray-100 text-black w-full h-20 outline-none"
								/>
							</div>
							<select
								className="select w-full bg-gray-100 h-20 text-gray-400"
								placeholder="Location"
								onChange={changeHandler}
								data-theme="light"
								name="location"
							>
								<option disabled selected>
									Choose Location
								</option>
								{locations.map((location: any) => (
									<option
										key={location?.LocationId}
										className="text-lg text-black"
										value={location?.LocationId}
									>
										{location?.Name}
									</option>
								))}
							</select>
							<div className="mb-4 rounded-xl flex bg-gray-100 items-center justify-center p-2 space-x-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 m-2"
									viewBox="0 0 384 512"
								>
									<path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
								</svg>
								<input
									name="locationDescription"
									type="text"
									id="locationDescription"
									placeholder="Location Description"
									onChange={changeHandler}
									required
									className="bg-gray-100 text-black w-full h-20 outline-none"
								/>
							</div>
						</div>

						<div className="flex flex-col space-y-10">
							<div className="rounded-xl flex bg-gray-100 items-center justify-center p-2 space-x-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 m-2"
									viewBox="0 0 384 512"
								>
									<path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z" />
								</svg>

								<input
									name="description"
									type="text"
									id="description"
									placeholder="Case Description"
									required
									onChange={changeHandler}
									className="bg-gray-100 text-black w-full h-20 outline-none"
								/>
							</div>
							<div className="border-dotted border-2 border-gray-400 rounded-lg p-2 w-full mt-2 relative">
								<input
									type="file"
									name="incidentImg"
									form="reportForm"
									// accept="image/jpeg, image/png ,image/jpg "
									onChange={handleImageChange}
									required
									className="opacity-0 absolute w-full h-full cursor-pointer top-0 left-0"
								/>
								<label htmlFor="file-input"></label>
								{previewImage ? (
									<img
										src={previewImage}
										alt="Preview of uploaded image"
										height={200}
										width={200}
										className="object-contain mx-auto"
									/>
								) : (
									<div className="flex flex-col items-center justify-center space-y-2 ">
										<svg
											width="24"
											height="21"
											viewBox="0 0 24 21"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M11.3294 12.9365C11.3294 13.3169 11.6377 13.6252 12.0181 13.6252C12.3984 13.6252 12.7067 13.3169 12.7067 12.9365H11.3294ZM12.505 0.51305C12.2361 0.244117 11.8001 0.244117 11.5311 0.51305L7.14861 4.89557C6.87967 5.1645 6.87967 5.60052 7.14861 5.86946C7.41754 6.13839 7.85356 6.13839 8.1225 5.86946L12.0181 1.97389L15.9136 5.86946C16.1826 6.13839 16.6186 6.13839 16.8875 5.86946C17.1565 5.60052 17.1565 5.1645 16.8875 4.89557L12.505 0.51305ZM12.7067 12.9365V0.999996H11.3294V12.9365H12.7067Z"
												fill="#263238"
											/>
											<path
												d="M1 6.96802V17.9864C1 18.747 1.61663 19.3636 2.37729 19.3636H21.2003C21.9609 19.3636 22.5776 18.747 22.5776 17.9864V6.96802"
												stroke="#263238"
												strokeWidth="1.37729"
												strokeLinecap="round"
											/>
										</svg>

										<p className="text-lg text-center pb-2 text-gray-600">
											Browse to upload
										</p>
									</div>
								)}

								{previewImage && (
									<button
										onClick={() => {
											setPreviewImage(undefined);
										}}
										className="absolute top-2 right-2 bg-[#84221D] hover:scale-105 transition-all duration-150 text-white p-2 rounded-full shadow-lg"
									>
										Remove Picture
									</button>
								)}
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="w-full text-lg bg-[#84221D] hover:scale-105 transition-all duration-150 text-white p-4 rounded-full shadow-lg"
					>
						Report Case
					</button>
				</form>
			</div>
		</div>
	);
}


export default AddReport;
