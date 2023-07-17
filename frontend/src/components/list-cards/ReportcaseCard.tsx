import React from "react";
import cat from "../../assets/alex-cat.jpg";

import ReportcasePopup from "../popups/ReportcasePopup";
import { instance } from "../../../config/axios.config";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface incident {
	user: any;
	img: any;
	title: string;
	time: any;
	postedBy: any;
	shortDescription: string;
}

function ReportList({
	user = true,
	img = cat,
	title = "Catto sick near PDC",
	postedBy = "Anon",
	timePassed = "12",
	locationDescription = "PDC main gate",
	shortDescription = "Likes to play ball",
}) {
	const [isOpen, setIsOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleViewClick = () => {
		setIsOpen(true);
	};

	const closePopup = () => {
		setIsOpen(false);
	};

	// const handleRemoveClick = () => {

	//   instance.delete(`/adoptions/delete/${adoptionprofilesid}/`, {

	//   })
	//   .then(function (response: any) {
	//     console.log(response)
	//     alert(response.data.message)

	//     window.location.reload()

	//     navigate("/adoption");

	//   })
	//   .catch(function (error: any) {
	//     console.log(error);
	//   });

	// }

	return (
		<div className="bg-white">
			<div className="align-bottom bg-white rounded-lg px-4 py-2 text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
				<div className="relative">
					<div className="flex items-center ">
						<div className="mr-4">
							<img
								className="w-24 h-42 rounded-lg object-cover"
								src={img}
								alt="Profile"
							/>
						</div>
						<div className="w-2/3 bg-[#f6e4e4] rounded-lg pl-2 pr-2 pt-2 pb-4  h-42">
							<div>
								<div className="flex justify-start">
									<h2 className="font-bold text-gray-800">{title}</h2>
								</div>

								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<span>Left string</span>
									<span>Right string</span>
								</div>

								<div className="flex justify-start">
									<h2 className=" text-gray-400">
										{shortDescription}{" "}
										<a onClick={handleViewClick}>read more..</a>{" "}
									</h2>
								</div>
							</div>

							<div className="flex justify-between mt-1">
								{!user ? (
									<button
										className="p-2 px-4 mx-2 bg-[#6c2c2c] rounded-lg text-white h-1/2 cursor-pointer"
										// onClick={handleRemoveClick}
									>
										Remove
									</button>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
					<ReportcasePopup
						img={img}
						title={title}
						postedBy={postedBy}
						time={timePassed}
						locationDescription={locationDescription}
						shortDescription={shortDescription}
						onClose={closePopup}
						id={0}
						user={false}
						status={""}
						locationId={0}
					/>
				</div>
			)}
		</div>
	);
}

export default ReportList;
