import { useNavigate } from 'react-router'
import MemberList from '../../components/list-cards/MemberList'
import MemberPopUp from '../../components/popups/MemberPopUp'
import { instance } from "../../../config/axios.config"
import person from '../../assets/cat.webp'
import { useState } from 'react'
import { useEffect } from 'react'
import FilterComponent from '../../components/buttons/filter'


function MembersPage({user =false}) {

  interface MemberList {
    img: any;
    Name: string;
    rollNumber: string;
    Department: any;
    designation: string;
    solvedCases: number;
    Email: string;
    AWSLMemberId: number;
    action : any;
    actionValue : boolean;
  }

  const handleMembers = (event: any) => {
    event.preventDefault()

    instance.get('/members')
      .then(function (response: any) {

        console.log(response.data)
        setMembers(response.data)


      })
      .catch(function (error: any) {
        console.log(error);
      });
      
  }
  
  const [deleteAction , setDeleteAction] = useState(false)
  
  
  

  const [members, setMembers] = useState([{
    img: person,
    Name: "Abdul Wahab",
    rollNumber: "18L-1234",
    Department: "Computer Science",
    designation: "President",
    solvedCases: 10,
    Email: "",
    AWSLMemberId: 1
  }
  ])

  const navigate = useNavigate();

  const handleAddMember = () => {
    navigate("/admin/add-member")

  }

  useEffect(() => {
    handleMembers({preventDefault: () => {}})
  }, [deleteAction])

  // if(deleteAction){
  //   setDeleteAction(false)
  // }
  const [filteredMembers, setFilteredMembers] = useState<any>([])

  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
    setFilteredMembers(members?.filter((member: any) => member.Name.toLowerCase().includes(search.toLowerCase())))

  }

  return (
    <div className='bg-white' onLoad={(e) => handleMembers(e)}>


      <div className='rounded-lg mt-20 pb-10 flex justify-between items-center'>
        <h1 className='text-xl md:text-4xl font-bold text-left p-5 text-[#813F31]'>AWSL Team</h1>
        {!user ? < button className='bg-[#EFE5E2] text-[#813F31] font-bold py-2 px-4 rounded-full mr-5' onClick={handleAddMember}>Add Member</button>: null}
      </div>

      <div className='my-7'>
          <FilterComponent onClick={() => console.log('filter')} options={[]} handleSearch={handleSearch} />
      </div>

      <div className='mt-5'>

        

        {(filteredMembers?.length == 0)?members.map((item, id) => {
          return( <MemberList user={user} key={id} img={item.img} Name={item.Name} rollNumber={item.rollNumber} Department={item.Department} designation={item.designation} solvedCases={item.solvedCases} email={item.Email} id={item.AWSLMemberId} action ={setDeleteAction} actionValue = {deleteAction}/>
        )}
        
        
        ):filteredMembers.map((item: any, id: any) => {
          return <MemberList user={user} key={id} img={item.img} Name={item.Name} rollNumber={item.rollNumber} Department={item.Department} designation={item.designation} solvedCases={item.solvedCases} email={item.Email} id={item.AWSLMemberId} action ={setDeleteAction} actionValue = {deleteAction}/>
        }

        )}



      </div>
    </div>



  )
}

export default MembersPage