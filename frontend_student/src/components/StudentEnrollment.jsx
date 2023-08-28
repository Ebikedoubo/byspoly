import React,{ useState } from "react";
import moment from "moment";
import Moment from 'react-moment';
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
    const [status, setStatus] = React.useState("success");
    const [message, setMessage] = React.useState("");
    const [nationality, setNationality] = React.useState("");
    const [stateArea, setStateArea] = React.useState("");
    const [localGovt, setLocalGovt] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [dateValue, setDateValue] = useState("");
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
      address: "",
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
          gender: false,
          birthcertificate: null,
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
          department: "",
          morefaculty: "",
          moredepartment: ""
      });
  

      const handleOnChange = (e) => {
        const { id, value, type, files } = e.target;
      
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
        const handleOnChangeDate = e => {
          const newDate =  moment(new Date().getDate(), "MM-DD-YYYY").format("MM-DD-YYYY");
          setDateValue(newDate);
          console.log(newDate); //value picked from date picker
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
  
    const handleSelectOnChange = (e, inputeName) => {
      switch (inputeName) {
            
              case "stateArea":
              // code to be executed when the expression matches value3
              setStateArea(e.target.value)
              break;
              case "localGovt":
                // code to be executed when the expression matches value3
                setLocalGovt(e.target.value)
                break;
              case "nationality":
              // code to be executed when the expression matches value3
              setNationality(e.target.value)
              break;
              default:
              // code to be executed when the expression does not match any of the cases
              setGender(e.target.value)
      }
  };
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
              value={gender.length < 1 ?"Male":gender }
              label={"Gender"}
              error={error["gender"]}
              onChange={
                  (e) => {
  
                    handleSelectOnChange(e, "gender")
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
              id="dateValue"
              label="Date of Birth"
              error={error["dateofbirth"]}
              value={dateValue}
              onChange={(e) => {
                handleOnChangeDate(e, "dateofbirth")
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
              value= {nationality.length < 1 ? "" : nationality}
              onChange={
                  (e) => {
  
                    handleSelectOnChange(e, "nationality")
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
              id="stateArea"
              label="Select State"
              value= {stateArea.length < 1 ? "" : stateArea}
              onChange={
                  (e) => {
  
                    handleSelectOnChange(e, "stateArea")
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
              value= {localGovt.length < 1 ? "": localGovt}
              onChange={
                  (e) => {
  
                      handleSelectOnChange(e, "localGovt")
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
              id="enYear"
              label="End Year"
              error={error["endYear"]}
              value={dateValue}
              onChange={(e) => {
                handleOnChangeDate(e, "endYear")
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
              value={formData.otherexamname}
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
              className=""
              type="date"
              required
              id="enYear"
              label="End Year"
              error={error["endYear"]}
              value={dateValue}
              onChange={(e) => {
                handleOnChangeDate(e, "endYear")
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
              className=""
              type="date"
              required
              id="enYear"
              label="End Year"
              error={error["endYear"]}
              value={dateValue}
              onChange={(e) => {
                handleOnChangeDate(e, "endYear")
              }}
          />
          </div>
          <Button
                variant="contained"
                color="secondary"
                onClick={handleRemoveForm}
                sx={{ marginLeft: 8 }}
              >
                Cancel
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
              className=""
              required
              id="faculty"
              label="Faculty"
              error={error["faculty"]}
              value={formData.faculty}
              onChange={(e) => {
                  handleOnChange(e, "faculty")
              }}
          />
           <TextInput
              className=""
              required
              id="department"
              label="Department"
              error={error["department"]}
              value={formData.department}
              onChange={(e) => {
                  handleOnChange(e, "department")
              }}
          />
            </div>
      </div>
      <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6">
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Second Choice</span>
                <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                <TextInput
              className=""
              required
              id="morefaculty"
              label="Faculty"
              error={error["morefaculty"]}
              value={formData.morefaculty}
              onChange={(e) => {
                  handleOnChange(e, "morefaculty")
              }}
          />
           <TextInput
              className=""
              required
              id="moredeparment"
              label="Department"
              error={error["moredepartment"]}
              value={formData.moredepartment}
              onChange={(e) => {
                  handleOnChange(e, "moredepartment")
              }}
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
  
