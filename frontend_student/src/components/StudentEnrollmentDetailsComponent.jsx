import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BlockSectionComponent from "./BlockSectionComponent";

function StudentEnrollmentDetailsComponent(props) {
  const { data } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const renderFilePreview = (filePath, altText) => {
    if (filePath) {
      return <img src={filePath} alt={altText} />;
    } else {
      return null;
    }
  };
  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: "text.secondary" }}>
            PERSONAL DETAILS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="mt-8">
            <BlockSectionComponent title="Applicat Bio">
              <div className="grid grid-cols-3 gap-4 mt-4 ">
                <BlockSectionComponent title="First Name">
                  {data.firstname}
                </BlockSectionComponent>
                <BlockSectionComponent title="Middle Name">
                  {data.middlename}
                </BlockSectionComponent>
                <BlockSectionComponent title="Last Name">
                  {data.lastname}
                </BlockSectionComponent>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 ">
                <BlockSectionComponent title="Mother's Maiden Name">
                  {data.maidenname}
                </BlockSectionComponent>
                <BlockSectionComponent title="Gender">
                  {data.gender}
                </BlockSectionComponent>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <BlockSectionComponent title="Date of Birth">
                  {data.dateofbirth}
                </BlockSectionComponent>
                <BlockSectionComponent title="Birth Certificate">
                  {data.birthcertificate[0].name}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>

            <BlockSectionComponent title="Contact Address">
              <div className="grid grid-cols-2 gap-4 ">
                <BlockSectionComponent title="Phone Number">
                  {data.phone}
                </BlockSectionComponent>
                <BlockSectionComponent title="Email">
                  {data.email}
                </BlockSectionComponent>
              </div>
              <div className="grid grid-cols-2 gap-4  mt-4">
                <BlockSectionComponent title="Nationality">
                  {data.nationality}
                </BlockSectionComponent>
                <BlockSectionComponent title="Residence">
                  {data.address}
                </BlockSectionComponent>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 ">
                <BlockSectionComponent title="State">
                  {data.stateArea}
                </BlockSectionComponent>
                <BlockSectionComponent title="Local Government">
                  {data.localGovt}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ color: "text.secondary" }}>
            EDUCATIONAL DETAILS
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <BlockSectionComponent title="Primary School">
              <div className="grid grid-cols-3 gap-8   mt-4">
                <BlockSectionComponent title="Primary School">
                  {data.primaryname}
                </BlockSectionComponent>
                <BlockSectionComponent title="First Leaving school Certificate">
                  {data.primaryresult[0].name}
                </BlockSectionComponent>
                <BlockSectionComponent title="Date of Graduation">
                  {data.primarydate}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>

            <BlockSectionComponent title="Secondary School">
              <div className="grid grid-cols-2 gap-8   mt-4">
                <BlockSectionComponent title="Secondary School">
                  {data.schoolname}
                </BlockSectionComponent>
                <BlockSectionComponent title="Date Of Graduation">
                  {data.schooldate}
                </BlockSectionComponent>
              </div>
              <div className="grid grid-cols-4 gap-4  ">
                <BlockSectionComponent title="Exam Name">
                  {data.examname}
                </BlockSectionComponent>

                <BlockSectionComponent title="Exam Number">
                  {data.examnumber}
                </BlockSectionComponent>

                <BlockSectionComponent title="Exam Result">
                  {data.examresult[0].name}
                </BlockSectionComponent>

                <BlockSectionComponent title="Exam Date">
                  {data.examdate}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>

            <BlockSectionComponent title="Jamb Result">
              <div className="grid grid-cols-4 gap-4  mb-6 mt-2 ">
                <BlockSectionComponent title="Jamb Number">
                  {data.jambnumber}
                </BlockSectionComponent>

                <BlockSectionComponent title="Jamb Score">
                  {data.jambscore}
                </BlockSectionComponent>

                <BlockSectionComponent title="Jamb Result">
                  {data.jambresult[0].name}
                </BlockSectionComponent>
                <BlockSectionComponent title="Jamb Date">
                  {data.jambdate}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>
            <BlockSectionComponent title="Other Exams">
              {data.addInputFields.length == 1 &&
              data.addInputFields[0].otherexamname.length > 0
                ? data.addInputFields?.map((field, index) => (
                    <div>
                      <div
                        key={index}
                        className="grid grid-cols-10 gap-4 mb-6 mt-4"
                      >
                        <div className="col-span-3">
                          <BlockSectionComponent title="Exams Name">
                            {field.otherexamname}
                          </BlockSectionComponent>
                        </div>
                        <div className="col-span-2">
                          <BlockSectionComponent title="Exams Number">
                            {field.otherexamnumber}
                          </BlockSectionComponent>
                        </div>

                        <div className="col-span-2">
                          <BlockSectionComponent title="Exams Certificate">
                            {field?.otherexamcertificate[0]?.name}
                          </BlockSectionComponent>
                        </div>

                        <div className="col-span-3">
                          <BlockSectionComponent title="Exams Date">
                            {field.otherexamdate}
                          </BlockSectionComponent>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </BlockSectionComponent>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ color: "text.secondary" }}>FACULTY</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <BlockSectionComponent title="First Choice">
              <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                <BlockSectionComponent title="Faculty">
                  {data.faculty}
                </BlockSectionComponent>

                <BlockSectionComponent title="Department">
                  {data.department}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>

            <BlockSectionComponent title="Second Choice">
              <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                <BlockSectionComponent title="Faculty">
                  {data.morefaculty}
                </BlockSectionComponent>

                <BlockSectionComponent title="Department">
                  {data.moredepartment}
                </BlockSectionComponent>
              </div>
            </BlockSectionComponent>
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default StudentEnrollmentDetailsComponent;
