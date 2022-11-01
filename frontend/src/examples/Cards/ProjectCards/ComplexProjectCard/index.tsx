/* eslint-disable no-unused-vars */
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

import { ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team5 from "assets/images/team-5.jpg";
import team4 from "assets/images/team-4.jpg";

// Declaring prop types for the ComplexProjectCard
interface Props {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  image: string;
  title: string;
  dateTime?: string;
  description: ReactNode;
  teacher: string;
  members?: string[];
  dropdown?: {
    action?: (...arg: any) => void;
    menu?: ReactNode;
  };
  [key: string]: any;
}

const randGroup = [
  [team1, team2, team3],
  [team3, team5, team4],
  [team1, team5, team4, team3],
  [team1, team5, team4, team2],
  [team2, team5, team4, team3],
  [team2, team5, team1, team4, team3],
]
let members = randGroup[Math.floor(Math.random() * 6)]

// Custom styles for ComplexProjectCard
function ComplexProjectCard({
  color,
  image,
  title,
  dateTime,
  description,
  teacher,
  credit,
  dropdown,
}: Props): JSX.Element {

  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;


    return (
      <MDAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center">
          <MDAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 1, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
          />
          <MDBox ml={2} mt={-1} lineHeight={0}>
            <MDTypography style={{height: 48}} variant="h6" textTransform="capitalize" fontWeight="medium">
              {title}
            </MDTypography>
            {members.length > -1 ? <MDBox display="flex">{renderMembers}</MDBox> : null}
          </MDBox>
          {dropdown && (
            <MDTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }}>more_vert</Icon>
            </MDTypography>
          )}
          {dropdown.menu}
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
            <br />
            Teacher: {teacher}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" flexDirection="column" lineHeight={0}>
            <MDTypography variant="button" fontWeight="medium">
              {credit}
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="secondary">
              Credit
            </MDTypography>
          </MDBox>
          <MDBox display="flex" flexDirection="column" lineHeight={0}>
            <MDTypography variant="button" fontWeight="medium">
              {dateTime}
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="secondary">
              Duration
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Declaring default props for ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

export default ComplexProjectCard;
