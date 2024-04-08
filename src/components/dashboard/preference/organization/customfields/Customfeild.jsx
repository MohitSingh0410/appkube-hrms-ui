import React, { useState, useEffect, useRef } from "react";
import { IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Button, Input, Modal, message } from "antd"; 
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartments,
  setDesignations,
} from "@/redux/slices/organizationSetupSlice";

const Customfeild = () => {
  const accessToken = getAccessTokenFromCookie();
  const [showDesignationAccordion, setShowDesignationAccordion] =
    useState(false);
  const [showDepartmentAccordion, setShowDepartmentAccordion] = useState(false);
  const [designationModal, setDesignationModal] = useState(false);
  const [departmentModal, setDepartmentModal] = useState(false);
  const [designationInput, setDesignationInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [filledDesignation, setFilledDesignation] = useState(null); 
  const [filledDepartment, setFilledDepartment] = useState(null);

  const dispatch = useDispatch();
  const designations = useSelector(
    (state) => state.organizationSetup.designations
  );
  const departments = useSelector(
    (state) => state.organizationSetup.departments
  );

  const designationInputRef = useRef(null);
  const departmentInputRef = useRef(null);

  useEffect(() => {
    if (designationModal) {
      setTimeout(() => {
        designationInputRef.current.focus();
      }, 0);
    }
  }, [designationModal]);
  
  useEffect(() => {
    if (departmentModal) {
      setTimeout(() => {
        departmentInputRef.current.focus();
      }, 0);
    }
  }, [departmentModal]);
    
    useEffect(() => {
      const fetchDesinationData = async () => {
        try {
          const response = await axios.get("/designation", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          dispatch(setDesignations(response.data));
          console.log(response);
        } catch (error) {
          console.error("Error fetching designations:", error);
        }
      };
      fetchDesinationData();
    }, [dispatch, accessToken]);
    
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get("/department", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        dispatch(setDepartments(response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartmentData();
  }, [dispatch, accessToken]);


  // Designation POST APi
const handleAddDesignation = async () => {
  const data = {
    designation: designationInput,
    org_id: "482d8374-fca3-43ff-a638-02c8a425c492",
  };
  try {
    const response = await axios.post("/designation", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setFilledDesignation(data); 
    message.success("Designation added successfully"); 
    setDesignationInput(""); 
    setDesignationModal(false); 
  } catch (error) {
    console.error("Error adding designation:", error);
    message.error("Error adding designation"); 
  }
  fetchDesinationData();
};


// Department POST API
const handleAddDepartment = async () => {
  const data = {
    name: departmentInput,
    org_id: "482d8374-fca3-43ff-a638-02c8a425c492",
  };
  try {
    const response = await axios.post("/department", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setFilledDepartment(data); 
    message.success("Department added successfully"); 
    setDepartmentInput(""); 
    setDepartmentModal(false); 
  } catch (error) {
    console.error("Error adding department:", error);
    message.error("Error adding department"); 
  }
  fetchDepartmentData();
};


  //   Designation Remove User Button
  const handleRemoveDesignation = (indexToRemove) => {
    const updatedDesignations = designations.filter(
      (_, index) => index !== indexToRemove
    );
    dispatch(setDesignations(updatedDesignations));
  };
  //   Designation Remove User Button
  const handleRemoveDepartment = (indexToRemove) => {
    const updatedDepartments = departments.filter(
      (_, index) => index !== indexToRemove
    );
    dispatch(setDepartments(updatedDepartments));
  };

  const handledesignationvalue = (e) => {
    setDesignationInput(e.target.value);
  };

  const handleDepartmentValue = (e) => {
    setDepartmentInput(e.target.value);
  };

  const toggleDesignationAccordion = () => {
    setShowDesignationAccordion(!showDesignationAccordion);
  };

  const toggleDepartmentAccordion = () => {
    setShowDepartmentAccordion(!showDepartmentAccordion);
  };

  const DesignationModal = () => {
    setDesignationModal(true);
  };

  const DepartmentModal = () => {
    setDepartmentModal(true);
  };

  const handleCancel = () => {
    setDesignationModal(false);
    setDepartmentModal(false);
    setDesignationInput(""); 
    setDepartmentInput(""); 
  };

  const handleToggleAccordion = (accordionType) => {
    if (accordionType === "designation") {
      setShowDesignationAccordion(!showDesignationAccordion);
      setShowDepartmentAccordion(false);
    } else {
      setShowDepartmentAccordion(!showDepartmentAccordion);
      setShowDesignationAccordion(false);
    }
  };

  // show Popup of filled designation data
  const showFilledDesignationPopup = () => {
    Modal.info({
      title: "Filled Designation",
      content: (
        <div>
          {filledDesignation && (
            <>
              <p>Designation: {filledDesignation.designation}</p>
              <p>Org ID: {filledDesignation.org_id}</p>
            </>
          )}
        </div>
      ),
    });
  };
  
  // show Popup of filled department data
  const showFilledDepartmentPopup = () => {
    Modal.info({
      title: "Filled Department",
      content: (
        <div>
          {filledDepartment && (
            <>
              <p>Name: {filledDepartment.name}</p>
              <p>Org ID: {filledDepartment.org_id}</p>
            </>
          )}
        </div>
      ),
    });
  };

  //  To Clear Input Field
  useEffect(() => {
    if (!designationModal) {
      setDesignationInput("");
    }
  }, [designationModal]);
  
  useEffect(() => {
    if (!departmentModal) {
      setDepartmentInput(""); 
    }
  }, [departmentModal]);

  return (
    <div>
      <div>
        <h2 className="font-semibold text-2xl">Organization Setup</h2>
        <p className="mt-4 font-normal">
          Define supplementary information that can be added to workers
          personal profiles or contracts.
        </p>

        {/* Designation */}
        <div>
          <div className="w-[80%] flex justify-between mt-4">
            <div className="flex items-center">
              <IoIosArrowDown
                className={`text-gray-500 ${
                  showDesignationAccordion ? "transform rotate-180" : ""
                }`}
                onClick={() => handleToggleAccordion("designation")}
              />
              <button
                className="ml-2 focus:outline-none font-medium"
                onClick={() => handleToggleAccordion("designation")}
              >
                Designation
              </button>
            </div>
            <span
              className="flex w-20 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white p-1 items-center justify-center"
              onClick={DesignationModal}
            >
              <IoAddOutline className="text-2xl mr-2" />
              <button className="text-white">Add</button>
            </span>
          </div>

          {showDesignationAccordion &&
            designations.map((designation, index) => (
              <div className="w-[80%] mt-2" key={index}>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{designation.designation}</p>
                  <button
                    onClick={() => handleRemoveDesignation(index)}
                    className="bg-red-500 text-white  hover:bg-red-700  rounded-md w-16 h-6 text-center items-center content-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          <Modal
            title="Add Designation"
            visible={designationModal}
            onCancel={handleCancel}
            footer={null}
            className="p-24"
          >
            <h6 className="mt-4">Designation Name</h6>
            <Input
              type="text"
              className="mt-4"
              onChange={handledesignationvalue}
              ref={designationInputRef}
            />
            <div className="content-center text-center mt-10">
              <button
                onClick={handleAddDesignation}
                className="w-24 p-1 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white mr-4"
              >
                Apply
              </button>
              <Button onClick={handleCancel} className="w-24">
                Cancel
              </Button>
            </div>
          </Modal>
        </div>

        {/* Department */}
        <div>
          <div className="w-[80%] flex justify-between mt-4">
            <div className="flex items-center">
              <IoIosArrowDown
                className={`text-gray-500 ${
                  showDepartmentAccordion ? "transform rotate-180" : ""
                }`}
                onClick={() => handleToggleAccordion("department")}
              />
              <button
                className="ml-2 focus:outline-none font-medium"
                onClick={() => handleToggleAccordion("department")}
              >
                Department
              </button>
            </div>
            <span
              className="flex w-20 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white p-1 items-center justify-center"
              onClick={DepartmentModal}
            >
              <IoAddOutline className="text-2xl mr-2" />
              <button className="text-white"> Add</button>
            </span>
          </div>

          {showDepartmentAccordion &&
            departments.map((department, index) => (
              <div className="w-[80%] mt-2" key={index}>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{department.name}</p>
                  <button
                    onClick={() => handleRemoveDepartment(index)}
                    className="bg-red-500 text-white hover:bg-red-700 rounded-md w-16 h-6 text-center items-center content-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          <Modal
            title="Add Department"
            visible={departmentModal}
            onCancel={handleCancel}
            footer={null}
            className="p-24"
          >
            <h6 className="mt-4">Department Name</h6>
            <Input
              type="text"
              className="mt-4"
              onChange={handleDepartmentValue}
              ref={departmentInputRef}
            />
            <div className="content-center text-center mt-10">
              <button
                onClick={handleAddDepartment}
                className="w-24 p-1 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white mr-4"
              >
                Apply
              </button>
              <Button onClick={handleCancel} className="w-24">
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Customfeild;