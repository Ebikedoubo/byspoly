import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function StudentEnrollmentPage({ 
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
    primaryname,
    primaryresult,
    primarydate,
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
            <table class="min-w-full bg-white border rounded-lg">
        <thead>
            <tr>
                <th class="border-b-2 border-gray-300 py-2">Serial Number</th>
                <th class="border-b-2 border-gray-300 py-2">Title</th>
                <th class="border-b-2 border-gray-300 py-2">Datas</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">1</td>
                <td class="border-b border-gray-300 py-2 px-4">First Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{firstname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">2</td>
                <td class="border-b border-gray-300 py-2 px-4">Middle name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{middlename}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">3</td>
                <td class="border-b border-gray-300 py-2 px-4">Last Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{lastname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">4</td>
                <td class="border-b border-gray-300 py-2 px-4">Mother's Maiden Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{maidenname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">5</td>
                <td class="border-b border-gray-300 py-2 px-4">Gender:</td>
                <td class="border-b border-gray-300 py-2 px-4">{gender}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">6</td>
                <td class="border-b border-gray-300 py-2 px-4">Phone Number:</td>
                <td class="border-b border-gray-300 py-2 px-4">{phone}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">7</td>
                <td class="border-b border-gray-300 py-2 px-4">Email:</td>
                <td class="border-b border-gray-300 py-2 px-4">{email}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">8</td>
                <td class="border-b border-gray-300 py-2 px-4">Date of Birth:</td>
                <td class="border-b border-gray-300 py-2 px-4">{dateofbirth}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">9</td>
                <td class="border-b border-gray-300 py-2 px-4">Birth Certificate:</td>
                <td class="border-b border-gray-300 py-2 px-4"><img src={birthcertificate} alt="birthcertificate" /></td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">10</td>
                <td class="border-b border-gray-300 py-2 px-4">Nationality:</td>
                <td class="border-b border-gray-300 py-2 px-4">{nationality}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">11</td>
                <td class="border-b border-gray-300 py-2 px-4">Residential Address:</td>
                <td class="border-b border-gray-300 py-2 px-4">{address}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">12</td>
                <td class="border-b border-gray-300 py-2 px-4">State of Origin:</td>
                <td class="border-b border-gray-300 py-2 px-4">{stateArea}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">13</td>
                <td class="border-b border-gray-300 py-2 px-4">Local Government:</td>
                <td class="border-b border-gray-300 py-2 px-4">{localGovt}</td>
            </tr>
        </tbody>
    </table>
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
                <table class="min-w-full bg-white border rounded-lg">
        <thead>
            <tr>
                <th class="border-b-2 border-gray-300 py-2">Serial Number</th>
                <th class="border-b-2 border-gray-300 py-2">Title</th>
                <th class="border-b-2 border-gray-300 py-2">Datas</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">1</td>
                <td class="border-b border-gray-300 py-2 px-4">Primary School Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{primaryname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">2</td>
                <td class="border-b border-gray-300 py-2 px-4">Primary School Result:</td>
                <td class="border-b border-gray-300 py-2 px-4"><img src={primaryresult} alt="primaryschoolresult" /></td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">3</td>
                <td class="border-b border-gray-300 py-2 px-4">Date of Graduation:</td>
                <td class="border-b border-gray-300 py-2 px-4">{primarydate}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">4</td>
                <td class="border-b border-gray-300 py-2 px-4">Secondary School Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{schoolname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">5</td>
                <td class="border-b border-gray-300 py-2 px-4">Date:</td>
                <td class="border-b border-gray-300 py-2 px-4">{schooldate}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">6</td>
                <td class="border-b border-gray-300 py-2 px-4">Exam Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{examname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">7</td>
                <td class="border-b border-gray-300 py-2 px-4">Exam Number:</td>
                <td class="border-b border-gray-300 py-2 px-4">{examnumber}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">8</td>
                <td class="border-b border-gray-300 py-2 px-4">Exam Result:</td>
                <td class="border-b border-gray-300 py-2 px-4">{examresult}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">9</td>
                <td class="border-b border-gray-300 py-2 px-4">Jamb Number:</td>
                <td class="border-b border-gray-300 py-2 px-4">{jambnumber}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">10</td>
                <td class="border-b border-gray-300 py-2 px-4">Jamb Score:</td>
                <td class="border-b border-gray-300 py-2 px-4">{jambscore}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">11</td>
                <td class="border-b border-gray-300 py-2 px-4">Jamb Result:</td>
                <td class="border-b border-gray-300 py-2 px-4"><img src={jambresult} alt="jambresult" /></td>
            </tr>
            {addInputFields.map((data, index)=>(
            <div key={index}>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">12</td>
                <td class="border-b border-gray-300 py-2 px-4">Other Exam Name:</td>
                <td class="border-b border-gray-300 py-2 px-4">{data.otherexamname}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">13</td>
                <td class="border-b border-gray-300 py-2 px-4">Other Exam Certificate:</td>
                <td class="border-b border-gray-300 py-2 px-4">{data.otherexamcertificate}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">14</td>
                <td class="border-b border-gray-300 py-2 px-4">Other Exam Date:</td>
                <td class="border-b border-gray-300 py-2 px-4">{data.otherexamdate}</td>
            </tr>
             </div>
             ))}
        </tbody>
    </table>
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
            <table class="min-w-full bg-white border rounded-lg">
        <thead>
            <tr>
                <th class="border-b-2 border-gray-300 py-2">Serial Number</th>
                <th class="border-b-2 border-gray-300 py-2">Title</th>
                <th class="border-b-2 border-gray-300 py-2">Datas</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">1</td>
                <td class="border-b border-gray-300 py-2 px-4">Faculty:</td>
                <td class="border-b border-gray-300 py-2 px-4">{faculty}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">2</td>
                <td class="border-b border-gray-300 py-2 px-4">Department:</td>
                <td class="border-b border-gray-300 py-2 px-4">{department}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">3</td>
                <td class="border-b border-gray-300 py-2 px-4">Other Faculty:</td>
                <td class="border-b border-gray-300 py-2 px-4">{morefaculty}</td>
            </tr>
            <tr>
                <td class="border-b border-gray-300 py-2 px-4">4</td>
                <td class="border-b border-gray-300 py-2 px-4">Other Department:</td>
                <td class="border-b border-gray-300 py-2 px-4">{moredepartment}</td>
            </tr>
        </tbody>
    </table>
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

export default StudentEnrollmentPage;