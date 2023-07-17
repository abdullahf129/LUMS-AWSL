
import { useNavigate } from "react-router"
import MemberMenuPage from "./MemberMenu";
import MenuImage from "../../assets/awsllogo.jpg"


export const MemberNavbar = () => {

    const navigate = useNavigate(); 
    const handleClick = () =>{

     navigate("/awsl-member/Menu");

    }


    return (
        <div className="navbar bg-base-100" data-theme="light">
            <div className="navbar-start">
                <img src={MenuImage} alt="AWSL LUMS" />
            </div>
            {/* <div className="navbar-center">
                <a className="btn btn-ghost normal-case text-xl"></a>
            </div> */}
            <div className="navbar-end">
                <div onClick={handleClick} className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                </div>
            </div>
        </div>
    )
}