import React, { useState, useEffect } from 'react'
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from '@/api/axios'
import { useEffect,useState } from 'react';
const ProfessionalInfo = () => {
  const [empdata, setempdata] = useState({})
 console.log(empdata,'this is empdata')
  
const accessToken = getAccessTokenFromCookie()

  useEffect(()=>{
    const empId = typeof window !== "undefined" ? localStorage.getItem("empId") : null;
  console.log(empId, 'from localStorage')
      const fetchData = async ()=>{
        try{
          const empdetails = await axios.get(`/employee/${empId}`,{
  
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
         
          // console.log("data",employees)
          setempdata(empdetails.data.professional_information
            )
  
        }
        catch(error){
          console.log('error',error);
        }
      }
      fetchData()
    },[])


  return (
    <div className="grid grid-cols-2 grid-rows-3 ">
      {/* first row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Designation</h2>
        <p className="font-semibold text-base">{empdata.emp_designation
}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Department</h2>
        <p className="font-semibold text-base">{empdata.department_name}</p>
      </span>

      {/* second row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">PF Number</h2>
        <p className="font-semibold text-base">{empdata.pf}</p>
      </span>
      <span>
        <h2 className="text-gray-400">UAN Number</h2>
        <p className="font-semibold text-base"> {empdata.uan} </p>
      </span>

      {/* third row  */}
      <span className="mb-4">
        <h2 className="text-gray-400">Direct Reporting Manager</h2>
        <p className="font-semibold text-base">{empdata.reporting_manager_first_name && empdata.reporting_manager_last_name}</p>
      </span>
      <span>
        <h2 className="text-gray-400">Work location</h2>
        <p className="font-semibold text-base">{empdata.work_location}</p>
      </span>

    </div>
  )
}

export default ProfessionalInfo