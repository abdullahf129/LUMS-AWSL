import MenuImage from "../../assets/menu_admin.png";
import { useNavigate } from "react-router-dom";

function MemberMenuPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${MenuImage})` }}
    >
      <div className="w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <div className="relative mt-10 ">
          <button
            onClick={handleClick}
            className="absolute top-0 right-0 m-4 p-2 bg-transparent text-gray-200 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <ul className="p-10 rounded-lg text-left md:text-left lg:text-center text-white">
            <li className="mb-4">
              <a href="/">Home</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/emergency">Emergencies</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/catalog">CATalog</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/adoption">Adoption</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/analysis">Data Analysis</a>
            </li>
            <li className="mb-4">
              <a href="/pet-care">Pet Care Information</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/doctors">Doctors</a>
            </li>
            <li className="mb-4">
              <a href="/awsl-member/login">Member Login</a>
            </li>
            <li className="mb-4">
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default MemberMenuPage;
