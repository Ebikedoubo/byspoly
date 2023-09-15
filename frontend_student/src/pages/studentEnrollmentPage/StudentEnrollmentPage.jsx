// import React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FormDataDisplay({ 
    firstname, 
    middlename, 
    lastname,
    maidenname,
    gender,
    phone,
    email,
    dateofbirth,
    birthcertificate,
    nationality,
    address,
    stateArea,
    localGovt,
    schoolname,
    schooldate,
    examname,
    examnumber,
    examresult,
    jambnumber,
    jambscore,
    jambresult,
    faculty,
    department,
    morefaculty,
    moredepartment,
    addInputFields
}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange =
      (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  return (
    // <Accordion>
    //   <AccordionSummary>
    //     <Typography>Data Summary</Typography>
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     {/* Render the data here */}
    //     <div>
    //       <p>First Name: {firstname}</p>
    //       <p>Middle Name: {middlename}</p>
    //       <p>Last Name: {lastname}</p>
    //     </div>
    //   </AccordionDetails>
    //   <AccordionDetails>
    //     {/* Render the data here */}
    //     <div>
    //       <p>First Name: {firstname}</p>
    //       <p>Middle Name: {middlename}</p>
    //       <p>Last Name: {lastname}</p>
    //     </div>
    //   </AccordionDetails>
    //   <AccordionDetails>
    //     {/* Render the data here */}
    //     <div>
    //       <p>First Name: {firstname}</p>
    //       <p>Middle Name: {middlename}</p>
    //       <p>Last Name: {lastname}</p>
    //     </div>
    //   </AccordionDetails>
    // </Accordion>

    <div>
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ color: 'text.secondary' }}>PERSONAL DETAILS</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
            <p>First Name: {firstname}</p>
            <p>Middle Name: {middlename}</p>
            <p>Last Name: {lastname}</p>
            <p>maidenname: {maidenname}</p>
            <p>gender: {gender}</p>
            <p>phone: {phone}</p>
            <p>email: {email}</p>
            <p>dateofbirth: {dateofbirth}</p>
            <img src={birthcertificate} alt="birthcertificate" />
            <p>nationality: {nationality}</p>
            <p>address: {address}</p>
            <p>stateArea: {stateArea}</p>
            <p>localGovt: {localGovt}</p>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2bh-content"
        id="panel2bh-header"
      >
        <Typography sx={{ color: 'text.secondary' }}>
           EDUCATIONAL DETAILS
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
            <p>School Name: {schoolname}</p>
            <p>Date: {schooldate}</p>
            <p>Exam Name: {examname}</p>
            <p>Exam Number: {examnumber}</p>
            <img src={examresult} alt="exam result" />
            <p>Jamb Number: {jambnumber}</p>
            <p>Jame Score: {jambscore}</p>
            <img src={jambresult} alt="Jamb Result" />
           {addInputFields.map((data, index)=>(
            <div key={index}>
            <p>Other Exam: {data.otherexamname}</p>
            <p>Other Exam Result: {data.otherexamcertificate}</p>
            <p>Other Exam Date: {data.otherexamdate}</p>
            
            </div>
           ))}
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
      >
        <Typography sx={{ color: 'text.secondary' }}>
            FACULTY
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
            <p>Faculty: {faculty}</p>
            <p>Department: {department}</p>
            <p>More Faculty: {morefaculty}</p>
            <p>More Department: {moredepartment}</p>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}></Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <p>PAYMENT</p>
        </Typography>
      </AccordionDetails>
    </Accordion>
  </div>
  );
}

export default FormDataDisplay;