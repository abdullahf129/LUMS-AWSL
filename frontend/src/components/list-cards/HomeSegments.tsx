import { useNavigate } from "react-router";

function HomeSegments({
	user = true,
	img = "alex-cat.jpg",
	title = "Catto sick near PDC",
	postedBy = "Anon",
	timePassed = "12",
	locationDescription = "PDC main gate",
	shortDescription = "Likes to play ball",
	longDescription = "In an attempt to bolster their abuse-prevention efforts, the government of America has launched a new awareness program that targets children from kindergarten to",
}) {
	const navigate = useNavigate();

	return (
		<div className="bg-white">
			<div className="align-bottom bg-white rounded-lg px-4 py-2 text-left overflow-hidden shadow-md transform transition-all my-8 max-w-lg w-full p-6">
				<div className="relative">
					<div className="flex items-center ">
						<div className="mr-4 w-32">
							<img
								className="rounded-lg object-cover"
								src={`/uploads/${img}`}
								alt="Profile"
							/>
						</div>
						<div>
							<div className="flex justify-start">
								<h2 className="text-[#811F19] font-bold text-lg">{title}</h2>
							</div>

							<div className="flex justify-start">
								<h2 className="text-black text-sm">{shortDescription}</h2>
							</div>

							<div className="flex justify-start">
								<h2 className="text-gray-400 text-xs mt-3">
									{longDescription}
								</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomeSegments;
