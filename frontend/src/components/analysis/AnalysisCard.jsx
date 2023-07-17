import React from 'react'


function AnalysisCard({title = "Default", value = 0}) {
    return (
        <div className='flex justify-center mb-7'>
            <div className="card w-96 shadow-xl" style={{backgroundColor: "#F6ECEA"}}>
                <div className="card-body">
                    <div className='flex justify-center my-5'>
                        <h2 className="card-title" style={{marginRight: "50%", color: "#813F31"}}>{title}</h2>
                        <div className="dropdown dropdown-left">
                            <label tabIndex={0} className="btn bg-white text-black border-white hover:bg-white" style={{marginRight: "50%"}}>Filter</label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Weekly</a></li>
                                <li><a>Monthly</a></li>
                                <li><a>Yearly</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <div className="card-actions justify-center">
                                    <div className="radial-progress bg-transparent text-primary-content border-4 border-transparent" style={{ "--value": value, color: "#813F31" }}>{value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisCard