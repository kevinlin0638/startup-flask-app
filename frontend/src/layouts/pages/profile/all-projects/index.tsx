/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexProjectCard from "examples/Cards/ProjectCards/ComplexProjectCard";

// Project page components
import Header from "layouts/pages/profile/components/Header";

// Images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import logoSlack from "assets/images/BS.png";
import accountancy from "assets/images/Accountancy.png";
import BA from "assets/images/BA.png";
import CE from "assets/images/CE.png";
import CS from "assets/images/CS.png";
import Marketing from "assets/images/Marketing.png";
import PageLayout from "examples/LayoutContainers/PageLayout";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import breakpoints from "assets/theme/base/breakpoints";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { searchAsync, selectData, selectStatus } from "features/search/searchSlice";

function AllProjects(): JSX.Element {
  const [semester, setSemester] = useState("2018-Fall");
  const [department, setDepartment] = useState("All");
  const [course, setCourse] = useState("");
  const [teacher, setTeacher] = useState("");
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectStatus)
  const data = useAppSelector(selectData)
  const [tabsOrientation, setTabsOrientation] = useState<"horizontal" | "vertical">("horizontal");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
     */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const semesters = [
    {
      label: "The 1st semester of 2018/2019",
      value: "2018-Fall"
    },
    {
      label: "The 2nd semester of 2018/2019",
      value: "2018-Spring"
    },
    {
      label: "The 1st semester of 2019/2020",
      value: "2019-Fall"
    },
    {
      label: "The 2nd semester of 2019/2020",
      value: "2019-Spring"
    },
    {
      label: "The 1st semester of 2020/2021",
      value: "2020-Fall"
    },
    {
      label: "The 2nd semester of 2020/2021",
      value: "2020-Spring"
    },
    ]



  return (
    <PageLayout>
      <div style={{margin: 64}}>
        <Header />
        <MDBox pb={3}>
          <Grid container alignItems="start">
            <Grid item xs={12} md={12}>
              <Grid container xs={12} md={12}>
                <Grid item xs={12} md={4} lg={3} mr={3}>
                  <MDBox mb={3}>
                    <MDBox mb={1.625} display="inline-block">
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        textTransform="capitalize"
                      >
                        Academic year
                      </MDTypography>
                    </MDBox>
                    <Autocomplete
                      defaultValue={{label: "The 1st semester of 2018/2019"}}
                      options={semesters as any}
                      getOptionLabel={(option: any) => option.label}
                      onChange={(v) => {
                        const selected = semesters.find(s => s.label === v.currentTarget.textContent)
                        if(selected) {
                          setSemester(selected.value)
                        }
                      }}
                      renderInput={(params) => <MDInput {...params} variant="standard" />}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                  <MDBox mb={3}>
                    <MDBox mb={1.625} display="inline-block">
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        textTransform="capitalize"
                      >
                        Department
                      </MDTypography>
                    </MDBox>
                    <Autocomplete
                      defaultValue={'All'}
                      options={['All', 'Accountancy', 'Business Analytics', 'Biomedical Sciences',
                        'Computer Engineering', 'Computer Science', 'Marketing'
                      ]}
                      onChange={(v) => {
                        setDepartment(v.currentTarget.textContent)
                      }}
                      renderInput={(params) => <MDInput {...params} variant="standard" />}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <MDBox mb={1}>
                <MDTypography variant="h5">Search by Name</MDTypography>
              </MDBox>


              <MDTypography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Course Name/Course ID
              </MDTypography>
              <MDBox mt={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDInput value={course} type="text"
                               variant="standard" fullWidth
                      onChange={(event: any)=> {
                        console.log(event.target.value);
                        setCourse(event.target.value)
                      }}/>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>

              <MDTypography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Teacher's Name
              </MDTypography>
              <MDBox mt={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <MDBox mb={2}>
                      <MDInput value={teacher} type="text"
                            variant="standard" fullWidth
                            onChange={(event: any)=> {
                              setTeacher(event.target.value)
                            }}/>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: "left" }}>
              <MDButton
                disabled={status !== "idle"}
                variant="gradient" color="info" onClick={() => {
                dispatch(searchAsync({
                  semester: semester,
                  department: department,
                  course: course,
                  teacher: teacher
                }))
              }}>
                <Icon>search</Icon>&nbsp; Search
              </MDButton>
            </Grid>
          </Grid>

          <MDBox mt={5}>
            <MDTypography variant="h5">{data.length} Results</MDTypography>
          </MDBox>
          <MDBox mt={2}>
            <Grid container spacing={3}>
              {data.map(data => {

                let icon = logoSlack
                if(data[2] === 'Biomedical Sciences')
                  icon = logoSlack
                else if(data[2] === 'Accountancy')
                  icon = accountancy
                else if(data[2] === 'Business Analytics')
                  icon = BA
                else if(data[2] === 'Computer Engineering')
                  icon = CE
                else if(data[2] === 'Computer Science')
                  icon = CS
                else if(data[2] === 'Marketing')
                  icon = Marketing

                return (
                  <Grid item xs={12} md={6} lg={4}>
                    <MDBox mb={1.5} mt={1.5}>
                      <ComplexProjectCard
                        image={icon}
                        title={data[1]}
                        description={data[0] + " - " + data[2]}
                        teacher={data[3]}
                        dateTime={data[5]}
                        credit={data[4]}
                      />
                    </MDBox>
                  </Grid>
                )
              })}
            </Grid>
          </MDBox>
        </MDBox>
      </div>
    </PageLayout>
  );
}
export default AllProjects;
