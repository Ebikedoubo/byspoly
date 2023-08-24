import React,{ useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import TextInput from "./TextInput";

const steps = ["Personal Details", "Educational Detail", "Faculty"];


const StudentEnrollment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [addForm, setAddForm] = useState(false)
//   const [firstname, setFirstname] = React.useState("");
//   const [middlename, setMiddlename] = React.useState("");
//   const [lastname, setLastname] = React.useState("");
//   const [maidenname, setMaidenname] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [gender, setGender] = React.useState("");
//   const [address, setAddress] = React.useState("");
//   const [phone, setPhone] = React.useState("");
//   const [dateofbirth, setDateofbirth] = React.useState("");
//   const [birthcertificate, setBirthcertificate] = React.useState("");
//   const [nationality, setNationality] = React.useState("");
//   const [startYear, setStartYear] = React.useState("");
//   const [endYear, setEndYear] = React.useState("");
//   const [primarySchool, setPrimarySchool] = React.useState("");
//   const [schoolname, setSchoolname] = React.useState("");
  const [status, setStatus] = React.useState("success");
//   const [state, setState] = React.useState("");
  const [message, setMessage] = React.useState("");
//   const [localGovt, setLocalGovt] = React.useState("");
const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    maidenname: "",
    gender: "",
    dateofbirth: "",
    birthcertificate: null,
    phone: "",
    email: "",
    nationality: "",
    address: "",
    state: "",
    localGovt: "",
    schoolname: "",
    endYear: "",
    examname: "",
    examnumber: "",
    examresult: null,
    jambname: "",
    jambnumber: "",
    jambscore: "",
    jambresult: null,
    faculty: "",
    department: ""
})
  const [error, setError] = React.useState({
        firstname: false,
        middlename: false,
        lastname: false,
        email: false,
        address: false,
        phone_number: false,
        gender: false
    });

    const handleOnChange = (event) => {
        const { id, value, type, files } = event.target;
    
        if (type === 'file') {
          setFormData((prevData) => ({
            ...prevData,
            [id]: files[0],
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [id]: value,
          }));
        }
      };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleAddForm = () =>{
    setAddForm(true)
  }
  const handleRemoveForm = () =>{
    setAddForm(false)
  }

//   const handleOnChange = (e, inputeName) => {
//     switch (inputeName) {
//         case "firstname":
//             // code to be executed when the expression matches value1
//             setFirstname(e.target.value)
//             break;
//             case "middlename":
//             // code to be executed when the expression matches value1
//             setMiddlename(e.target.value)
//             break;
//             case "lastname":
//             // code to be executed when the expression matches value1
//             setLastname(e.target.value)
//             break;
//             case "maidenname":
//             // code to be executed when the expression matches value1
//             setMaidenname(e.target.value)
//             break;
//             case "dateofbirth":
//             // code to be executed when the expression matches value3
//             setDateofbirth(e.target.value)
//             break;
//             case "birthcertificate":
//             // code to be executed when the expression matches value3
//             setBirthcertificate(e.target.value)
//             break;
//             case "nationality":
//             // code to be executed when the expression matches value3
//             setNationality(e.target.value)
//             break;
//             case "email":
//             // code to be executed when the expression matches value2
//             setEmail(e.target.value)
//             break;
//             case "phone":
//             // code to be executed when the expression matches value3
//             setPhone(e.target.value)
//             break;
//             case "address":
//             // code to be executed when the expression matches value3
//             setAddress(e.target.value)
//             break;
//             case "state":
//             // code to be executed when the expression matches value3
//             setState(e.target.value)
//             break;
//             case "localGovt":
//                 // code to be executed when the expression matches value3
//             setLocalGovt(e.target.value)
//             break;
//             case "primarySchool":
//                     // code to be executed when the expression matches value3
//             setPrimarySchool(e.target.value)
//             break;
//             case "startYear":
//                 // code to be executed when the expression matches value3
//             setStartYear(e.target.value)
//             break;
//             case "endYear":
//                 // code to be executed when the expression matches value3
//             setEndYear(e.target.value)
//             break;
//             case "schoolname":
//                         // code to be executed when the expression matches value3
//             setSchoolname(e.target.value)
//             break;
//             default:
//             // code to be executed when the expression does not match any of the cases
//             setGender(e.target.value)
//     }
// };
const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
];
const option = [
    { label: "Lagos", value: 2 },
    { label: "FCT-Abuja", value: 5 },
    { label: "Nassarawa", value: 3 },
    { label: "Kogi", value: 4 },
  ];
  const option2 = [
    { label: "ikeja", value: 2 },
    { label: "Gwagwalada", value: 5 },
    { label: "Lafia", value: 3 },
    { label: "Lokoja", value: 4 },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <>
              <Typography variant="h6">Personal Details</Typography>
              <div className="">

<div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Applicant Bio</span>

    <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="firstname"
            label="First Name"
            error={error["firstname"]}
            value={formData.firstname}
            onChange={(e) => {
                handleOnChange(e, "firstname")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            id="middlename"
            label="Middle Name"
            error={error["middlename"]}
            value={formData.middlename}
            onChange={(e) => {
                handleOnChange(e, "middlename")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            id="lastname"
            label="Last Name"
            error={error["lastname"]}
            value={formData.lastname}
            onChange={(e) => {
                handleOnChange(e, "lastname")
            }}
        />
    </div>
    <div className="grid grid-cols-2 gap-8  mb-6 mt-4 ml-2">
        <TextInput
            className=""
            required
            id="maidenname"
            label="Mother's Maiden Name"
            error={error["maidenname"]}
            value={formData.maidenname}
            onChange={(e) => {
                handleOnChange(e, "maidenname")
            }}
        />
        <TextInput
            required
            type="select"
            isSelect={true}
            value={formData.gender.length < 1 ?"Male":formData.gender }
            label={"Gender"}
            error={error["gender"]}
            onChange={
                (e) => {

                    handleOnChange(e, "gender")
                }
            }
            options={options}
        />
    </div>
    <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
        <TextInput
            className=""
            type="date"
            required
            id="dateofbirth"
            label="Date of Birth"
            error={error["dateofbirth"]}
            value={formData.dateofbirth}
            onChange={(e) => {
                handleOnChange(e, "dateofbirth")
            }}
        />
         <TextInput
            type="file"
            required
            id="birthcertificate"
            label="Upload Birth Certificate"
            error={error["birthcertificate"]}
            // value={birthcertificate}
            onChange={(e) => {
                handleOnChange(e, "birthcertificate")
            }}
        />
    </div>
</div>
<div className="w-full px-4 py-2 mt-12 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
<span style={{position:"relative", left:"-452px", bottom:"23px"}}>Contact Address</span>

    <div className="grid grid-cols-2 gap-4  mb-4 mt-4 ml-2">
    <TextInput
            className="h-[70px] mt-6"
            required
            id="phone"
            label="Phone Number"
            value={formData.phone}
            error={error["phone"]}
            onChange={(e) => {
                handleOnChange(e, "phone")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            id="email"
            label="email"
            error={error["email"]}
            value={formData.email}
            onChange={(e) => {
                handleOnChange(e, "email")
            }}
        />
    </div>
    <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
    <TextInput
            required
            type="select"
            id="nationality"
            label="Nationality"
            value= {formData.nationality.length < 1 ?"select state":formData.nationality}
            onChange={
                (e) => {

                    handleOnChange(e, "nationality")
                }
            }
            isSelect={true}
            options={option}
          />

        <TextInput
            className="h-[70px] mt-6"
            required
            id="address"
            label="Residence"
            value={formData.address}
            error={error["address"]}
            onChange={(e) => {
                handleOnChange(e, "address")
            }}
        />
    </div>
    <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
    <TextInput
            required
            type="select"
            id="state"
            label="Select State"
            value= {formData.state.length < 1 ?"select state":formData.state}
            onChange={
                (e) => {

                    handleOnChange(e, "state")
                }
            }
            isSelect={true}
            options={option}
          />

<TextInput
            required
            type="select"
            id="localGovt"
            label="Select Local Government"
            value= {formData.localGovt.length < 1 ?"select localgovt":formData.LocalGovt}
            onChange={
                (e) => {

                    handleOnChange(e, "localgovt")
                }
            }
            isSelect={true}
            options={option2}
          />
    </div>
</div>
</div>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Typography variant="h6">Educational Details</Typography>
              <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Secondary School</span>
    <div className="grid grid-cols-2 gap-8  mb-6 mt-4 ml-2">
        <TextInput
            className=""
            required
            id="schoolname"
            label="School Name"
            error={error["schoolname"]}
            value={formData.schoolname}
            onChange={(e) => {
                handleOnChange(e, "schoolname")
            }}
        />
        <TextInput
            className=""
            type="date"
            required
            id="endYear"
            label="Year"
            error={error["endYear"]}
            value={formData.endYear}
            onChange={(e) => {
                handleOnChange(e, "endYear")
            }}
        />
    </div>
    <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="examname"
            label="Exam Name"
            error={error["examname"]}
            value={formData.examname}
            onChange={(e) => {
                handleOnChange(e, "examname")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            id="examnumber"
            label="Exam Number"
            error={error["examnumber"]}
            value={formData.examnumber}
            onChange={(e) => {
                handleOnChange(e, "examnumber")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            type="file"
            id="examresult"
            label="Result"
            error={error["examresult"]}
            // value={lastname}
            onChange={(e) => {
                handleOnChange(e, "examresult")
            }}
        />
    </div>
    <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Jamb Result</span>
    <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="jambnumber"
            label="Jamb Number"
            error={error["jambnumber"]}
            value={formData.jambnumber}
            onChange={(e) => {
                handleOnChange(e, "jambnumber")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            id="jambscore"
            label="Jamb Score"
            error={error["jambscore"]}
            value={formData.jambscore}
            onChange={(e) => {
                handleOnChange(e, "jambscore")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            type="file"
            id="jambresult"
            label="Result"
            error={error["jambresult"]}
            // value={lastname}
            onChange={(e) => {
                handleOnChange(e, "jambresult")
            }}
        />
    </div>
    </div>
    <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-2">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Other Exam Certificate</span>
    <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="otherexamname"
            label="Exam Name"
            error={error["otherexamname"]}
            // value={firstname}
            onChange={(e) => {
                handleOnChange(e, "otherexamname")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            type="file"
            id="document"
            label="Document"
            error={error["document"]}
            // value={lastname}
            onChange={(e) => {
                handleOnChange(e, "document")
            }}
        />
           <TextInput
            className="h-[70px] mt-6"
            required
            type="date"
            id="endYear"
            label="Date"
            error={error["endYear"]}
            value={formData.date}
            onChange={(e) => {
                handleOnChange(e, "endYear")
            }}
        />
    </div>
    <Button
              variant="contained"
              color="primary"
              onClick={handleAddForm}
              sx={{ marginLeft: 8 }}
            >
              Add other Certificate
            </Button>
    {addForm && (
        <>
    <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
            <TextInput
            className="h-[70px] mt-6"
            required
            id="otherexamname"
            label="Exam Name"
            error={error["otherexamname"]}
            // value={firstname}
            onChange={(e) => {
                handleOnChange(e, "otherexamname")
            }}
        />
        <TextInput
            className="h-[70px] mt-6"
            required
            type="file"
            id="document"
            label="Document"
            error={error["document"]}
            // value={lastname}
            onChange={(e) => {
                handleOnChange(e, "document")
            }}
        />
           <TextInput
            className="h-[70px] mt-6"
            required
            type="date"
            id="endYear"
            label="Date"
            error={error["endYear"]}
            // value={middlename}
            onChange={(e) => {
                handleOnChange(e, "endYear")
            }}
        />
        </div>
        <Button
              variant="contained"
              color="secondary"
              onClick={handleRemoveForm}
              sx={{ marginLeft: 8 }}
            >
              Cance
            </Button>
        </>
    )}
    </div>
</div>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="h6">Faculties/Departments</Typography>
              <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Select Course to Study</span>
    <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>First Choice</span>
              <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
    <TextInput
            required
            type="select"
            id="outlined-required"
            label="Faculty"
            value= {state.length < 1 ?"select state":state}
            onChange={
                (e) => {

                    handleOnChange(e, "faculty")
                }
            }
            isSelect={true}
            options={option}
          />

<TextInput
            required
            type="select"
            id="outlined-required"
            label="Department"
            value= {localGovt.length < 1 ?"select localgovt":LocalGovt}
            onChange={
                (e) => {

                    handleOnChange(e, "department")
                }
            }
            isSelect={true}
            options={option2}
          />
          </div>
    </div>
    <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6">
    <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Second Choice</span>
              <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
    <TextInput
            required
            type="select"
            id="outlined-required"
            label="Faculty"
            value= {state.length < 1 ?"select state":state}
            onChange={
                (e) => {

                    handleOnChange(e, "faculty")
                }
            }
            isSelect={true}
            options={option}
          />

<TextInput
            required
            type="select"
            id="outlined-required"
            label="Department"
            value= {localGovt.length < 1 ?"select localgovt":LocalGovt}
            onChange={
                (e) => {

                    handleOnChange(e, "department")
                }
            }
            isSelect={true}
            options={option2}
          />
          </div>
    </div>
    </div>
            </>
          )}
        </Grid>
        <Grid item xs={0}>
        {activeStep > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              sx={{ marginLeft: 8 }}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
         
        </Grid>
      </Grid>
    </Container>
  );
};

export default StudentEnrollment;
