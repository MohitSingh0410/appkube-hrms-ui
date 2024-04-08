"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalDetail from "./personaldetails/Personaldetail";
import Organizationdetails from "./organization/Organizationdetails";
import getAccessTokenFromCookie from "@/utils/getAccessToken";
import axios from "@/api/axios";

const Preference = () => {
  const [isClient, setIsClient] = useState(false);
  const [fetchedData, setFetchData] = useState([]);
  const accessToken = getAccessTokenFromCookie();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // console.log('in useEffect');
    if (isClient) {
      const hrId = localStorage.getItem('hrId');
      // console.log('Hr id from local storage', hrId);
      const fetchData = async () => {
        try {
          const response = await axios.get(`/employee/${hrId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log("Response of employee data for overview", response.data);
          setFetchData(response.data);
        } catch (error) {
          // console.log('Error fetching employee data', error);
        }
      };
      fetchData();
    }
  }, [accessToken, isClient]);

  // console.log('Fetched HR data', fetchedData);

  return (
    <Tabs defaultActiveKey="1" className="px-2">
      <Tabs.TabPane tab="Personal Information" key="1">
        <PersonalDetail fetchedData={fetchedData.personal_information} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Organizational Information" key="2">
        <Organizationdetails />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Security" key="3" disabled></Tabs.TabPane>
      <Tabs.TabPane tab="Notifications" key="4" disabled></Tabs.TabPane>
    </Tabs>
  );
};

export default Preference;
