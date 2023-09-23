import React,{ useState,useEffect } from "react";
import moment from "moment";
import Moment from 'react-moment';
import Logo from "../assests/bayelsalogo.jpeg";
import logo1 from "../assests/bayelsalogo.png"
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import TextInput from "./TextInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackbarComponent from "./SnackbarComponent";
import StudentEnrollmentPage from "../pages/studentEnrollmentPage/StudentEnrollmentPage"



const steps = ["Personal Details", "Educational Detail", "Faculty", "Summary"];

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff"
    },
    danger: {
      main: "#DC3545",
      contrastText: "#fff"
    }
  }
});

const StudentEnrollment = () => {
  const cancelIconStyle = {
    color: 'red',
    fontSize: '70px'
  };

    const [activeStep, setActiveStep] = useState(0);
    const [status, setStatus] = React.useState("success");
    const [message, setMessage] = React.useState("")
    // BIO
    const [firstname, setFirstname] = React.useState("");
    const [middlename, setMiddlename] = React.useState("")
    const [lastname, setLastname] = React.useState("")
    const [maidenname, setMaidenname] = React.useState("")
    const [gender, setGender] = React.useState("");
    const [dateofbirth, setDateofbirth] = React.useState("")
    const [birthcertificate, setBirthcertificate] = React.useState("")
    // // contact address
    const [phone, setPhone] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [nationality, setNationality] = React.useState("")
    const [address, setAddress] = React.useState("");
    const [stateArea, setStateArea] = React.useState("");
    const [localGovt, setLocalGovt] = React.useState("");
    //primary school
    const [primaryname, setPrimaryname] = React.useState("")
    const [primaryresult, setPrimaryresult] = React.useState("")
    const [primarydate, setPrimarydate] = React.useState("")
    // // step 2/secondary school
    const [schoolname, setSchoolname] = React.useState("")
    const [schooldate, setSchooldate] = React.useState("")
    const [examname, setExamname] = React.useState("")
    const [examnumber, setExamnumber] = React.useState("")
    const [examresult, setExamresult] = React.useState("")
    // // jamb result
    const [jambnumber, setJambnumber] = React.useState("")
    const [jambscore, setJambscore] = React.useState("")
    const [jambresult, setJambresult] = React.useState("")
    // faculties/deparment
 
    const [faculty, setFaculty] = React.useState("")
    const [department, setDepartment] = React.useState("")
    const [morefaculty, setMorefaculty] = React.useState("")
    const [moredepartment, setMoredepartment] = React.useState("")
    const [show, setShow] = React.useState(false);

    const [addInputFields, setAddInputFields] = React.useState([{
      otherexamname:"",
      otherexamcertificate: "",
      otherexamdate: ""
  }]);
 
  const [error, setError] = React.useState({
        firstname: false,
        middlename: false,
        lastname: false,
        maidenname: false,
        email: false,
        address: false,
        phone: false,
        gender: false,
        dateofbirth: false,
        birthcertificate: false,
        nationality: false,
        address: false,
        stateArea: false,
        localGovt: false,
        primaryname: false,
        primaryresult: false,
        primarydate: false,
        schoolname: false,
        schooldate: false,
        examname: false,
        examnumber: false,
        examresult: false,
        jambname: false,
        jambnumber: false,
        jambscore: false,
        jambresult: false,
        faculty: false,
        department: false,
        morefaculty: false,
        moredepartment: false,
        addInputFields: [
          {
            otherexamname: false,
            otherexamcertificate: false,
            otherexamdate: false
          }
        ]
    });

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token")

      if (token !== null) {
          navigate('/dashboard');
      }

  }, [])
    const handleAddInputOnchange = (index, e) =>{
      console.log(e);
  // Create a copy of the addInputFields array and update the specific field by index
  const updatedFields = [...addInputFields];
  updatedFields[index][e.target.name] = e.target.value;
  // Set the updated array back to state
  setAddInputFields(updatedFields);
    }

    const handleOnChange = (e, inputeName) => {
      switch (inputeName) {
          case "firstname":
              // code to be executed when the expression matches value1
              setFirstname(e.target.value)
              break;
          case "middlename":
                // code to be executed when the expression matches value1
                setMiddlename(e.target.value)
                break;
          case "lastname":
                  // code to be executed when the expression matches value1
                setLastname(e.target.value)
                break;
          case "maidenname":
                    // code to be executed when the expression matches value1
                setMaidenname(e.target.value)
                break;
       
          case "birthcertificate":
                  // code to be executed when the expression matches value1
                setBirthcertificate(e.target.value)
                break;
          case "email":
              // code to be executed when the expression matches value2
              setEmail(e.target.value)
              break;
          case "phone":
              // code to be executed when the expression matches value3
              setPhone(e.target.value)
              break;
          case "address":
              // code to be executed when the expression matches value3
              setAddress(e.target.value)
              break;
          case "nationality":
                // code to be executed when the expression matches value1
              setNationality(e.target.value)
              break;
          case "stateArea":
                // code to be executed when the expression matches value1
              setStateArea(e.target.value)
              break;
          case "localGovt":
                // code to be executed when the expression matches value1
              setLocalGovt(e.target.value)
              break;
          case "primaryname":
                // code to be executed when the expression matches value1
              setPrimaryname(e.target.value)
              break;
          case "primaryresult":
                // code to be executed when the expression matches value1
              setPrimaryresult(e.target.value)
              break;
          case "schoolname":
                // code to be executed when the expression matches value1
              setSchoolname(e.target.value)
              break;
          case "examname":
                // code to be executed when the expression matches value1
              setExamname(e.target.value)
              break;
          case "examnumber":
                // code to be executed when the expression matches value1
              setExamnumber(e.target.value)
              break;
          case "examresult":
                // code to be executed when the expression matches value1
              setExamresult(e.target.value)
              break;
          case "jambnumber":
                // code to be executed when the expression matches value1
              setJambnumber(e.target.value)
              break;
          case "jambscore":
                // code to be executed when the expression matches value1
              setJambscore(e.target.value)
              break;
          case "jambresult":
                // code to be executed when the expression matches value1
              setJambresult(e.target.value)
              break;
          case "faculty":
                // code to be executed when the expression matches value1
              setFaculty(e.target.value)
              break;
          case "department":
                // code to be executed when the expression matches value1
              setDepartment(e.target.value)
              break;
          case "morefaculty":
                // code to be executed when the expression matches value1
              setMorefaculty(e.target.value)
              break;
          case "moredepartment":
                // code to be executed when the expression matches value1
              setMoredepartment(e.target.value)
              break;
          // more cases...
          default:
              // code to be executed when the expression does not match any of the cases
              setGender(e.target.value)
      }
  };

  const submit = () => {
    // validate input 
    setLoading(true)
    let status = false
    setError({
      firstname: false,
      middlename: false,
      lastname: false,
      maidenname: false,
      email: false,
      address: false,
      phone: false,
      gender: false,
      dateofbirth: false,
      birthcertificate: false,
      nationality: false,
      address: false,
      stateArea: false,
      localGovt: false,
      schoolname: false,
      schooldate: false,
      examname: false,
      examnumber: false,
      examresult: false,
      jambname: false,
      jambnumber: false,
      jambscore: false,
      jambresult: false,
      faculty: false,
      department: false,
      morefaculty: false,
      moredepartment: false
    })
    if (firstname.trim() === "") {
        setError((prevError) => ({ ...prevError, firstname: true }));
        status = true;
    }

    if (middlename.trim() === "") {
      setError((prevError) => ({ ...prevError, middlename: true }));
      status = true;
    }

  if (lastname.trim() === "") {
    setError((prevError) => ({ ...prevError, lastname: true }));
    status = true;
    }

    if (maidenname.trim() === "") {
      setError((prevError) => ({ ...prevError, maidenname: true }));
      status = true;
    }

    if (email.trim() === "") {
        setError((prevError) => ({ ...prevError, email: true }));
        status = true;
    }

    if (gender.trim() === "") {
        setError((prevError) => ({ ...prevError, gender: true }));
        status = true;
    }

    if (address.trim() === "") {
        setError((prevError) => ({ ...prevError, address: true }));
        status = true;
    }

    if (phone.trim() === "") {
        setError((prevError) => ({ ...prevError, phone_number: true }));
        status = true;
    }
    if (dateofbirth.trim() === "") {
      setError((prevError) => ({ ...prevError, dateofbirth: true }));
      status = true;
    }

    if (birthcertificate.trim() === "") {
      setError((prevError) => ({ ...prevError, birthcertificate: true }));
      status = true;
    }

    if (nationality.trim() === "") {
      setError((prevError) => ({ ...prevError, nationality: true }));
      status = true;
    }

    if (stateArea.trim() === "") {
      setError((prevError) => ({ ...prevError, stateArea: true }));
      status = true;
    }

    if (localGovt.trim() === "") {
      setError((prevError) => ({ ...prevError, localGovt: true }));
      status = true;
    }

    if (schoolname.trim() === "") {
      setError((prevError) => ({ ...prevError, schoolname: true }));
      status = true;
    }

    if (schooldate.trim() === "") {
      setError((prevError) => ({ ...prevError, schooldate: true }));
      status = true;
    }

    if (examname.trim() === "") {
      setError((prevError) => ({ ...prevError, examname: true }));
      status = true;
    }

    if (examnumber.trim() === "") {
      setError((prevError) => ({ ...prevError, examnumber: true }));
      status = true;
    }

    if (examresult.trim() === "") {
      setError((prevError) => ({ ...prevError, examresult: true }));
      status = true;
    }

    if (jambname.trim() === "") {
      setError((prevError) => ({ ...prevError, jambname: true }));
      status = true;
    }

    if (jambnumber.trim() === "") {
      setError((prevError) => ({ ...prevError, jambnumber: true }));
      status = true;
    }

    if (jambscore.trim() === "") {
      setError((prevError) => ({ ...prevError, jambscore: true }));
      status = true;
    }

    if (jambresult.trim() === "") {
      setError((prevError) => ({ ...prevError, jambresult: true }));
      status = true;
    }

    if (faculty.trim() === "") {
      setError((prevError) => ({ ...prevError, faculty: true }));
      status = true;
    }

    if (department.trim() === "") {
      setError((prevError) => ({ ...prevError, department: true }));
      status = true;
    }

    if (otherexamname.trim() === "") {
      setError((prevError) => ({ ...prevError, otherexamname: true }));
      status = true;
    }

    if (otherexamcertificate.trim() === "") {
      setError((prevError) => ({ ...prevError, otherexamcertificate: true }));
      status = true;
    }

    if (otherexamdate.trim() === "") {
      setError((prevError) => ({ ...prevError, otherexamdate: true }));
      status = true;
    }

    if (morefaculty.trim() === "") {
      setError((prevError) => ({ ...prevError, morefaculty: true }));
      status = true;
    }

    if (moredepartment.trim() === "") {
      setError((prevError) => ({ ...prevError, moredepartment: true }));
      status = true;
    }
    let data = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      maidenname: maidenname,
      email: email,
      address: address,
      phone: phone,
      gender: gender,
      dateofbirth: dateofbirth,
      birthcertificate: birthcertificate,
      nationality: nationality,
      address: address,
      stateArea: stateArea,
      localGovt: localGovt,
      schoolname: schoolname,
      schooldate: schooldate,
      examname: examname,
      examnumber: examnumber,
      examresult: examresult,
      jambname: jambname,
      jambnumber: jambnumber,
      jambscore: jambscore,
      jambresult: jambresult,
      faculty: faculty,
      department: department,
      morefaculty: morefaculty,
      moredepartment: moredepartment

    }

    if (status) {
        setLoading(false)
        setStatus("error")
        setMessage("all fields are required")
        setShow(true)
        setTimeout(()=>{
            setShow(false)
        },6000)
        return;
    }
        create(data)
    
    
    // send to save and use feedback to show toast message.
};
       

        const handleOnChangeDate = e =>{
            
            let formattedDate = moment(e).format("YYYY-MM-DD");
            console.log("checking date", formattedDate)
            setDateofbirth(formattedDate); // Set the formatted date in your state
        };
        const handleOnChangeDate1 = e => {
          let formattedDate = moment(e).format("YYYY-MM-DD");
            console.log("checking date", formattedDate)
            setSchooldate(formattedDate); // Set the formatted date in your state
        };
        const handleOnChangePrimaryDate = e => {
          let formattedDate = moment(e).format("YYYY-MM-DD");
            console.log("checking date", formattedDate)
            setPrimarydate(formattedDate); // Set the formatted date in your state
        };
      
        const handleOnChangeDate2 = (index, e) => {
         
          let formattedDate = moment(e).format("YYYY-MM-DD");
          console.log("checking date", formattedDate);
        
          // Create a copy of the addInputFields array and update the specific field by index
          const updatedFields = [...addInputFields];
          updatedFields[index].otherexamdate = formattedDate;
        
          // Set the updated array back to state
          setAddInputFields(updatedFields)
      };
      
  const handleNext = () => {
    let status = false;
  
    if (activeStep === 0) {
      if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        maidenname.trim() === "" ||
        gender.trim() === "" ||
        dateofbirth === "" ||
        birthcertificate.trim() === "" ||
        phone.trim() === "" ||
        email.trim() === "" ||
        nationality === "" ||
        address.trim() === "" ||
        stateArea === "" ||
        localGovt === ""
      ) {
        setError((prevError) => ({
          ...prevError,
          firstname: firstname.trim() === "",
          maidenname: maidenname.trim() === "",
          lastname: lastname.trim() === "",
          dateofbirth: dateofbirth === "",
          gender: gender.trim() === "",
          birthcertificate: birthcertificate.trim() === "",
          phone: phone.trim() === "",
          email: email.trim() === "",
          nationality: nationality === "",
          address: address.trim() === "",
          stateArea: stateArea === "",
          localGovt: localGovt === "",
        }));
        status = true;
  
        if (status) {
          setStatus("error");
          setMessage("All fields are required");
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 6000);
          return;
        }
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (
        primaryname.trim() === "" ||
        primaryresult.trim() === "" ||
        primarydate === "" ||
        schoolname.trim() === "" ||
        schooldate === "" ||
        examname.trim() === "" ||
        examnumber.trim() === "" ||
        examresult.trim() === "" ||
        jambnumber.trim() === "" ||
        jambscore.trim() === "" ||
        jambresult.trim() === "" ||
        addInputFields.some((field) =>
        Object.values(field).some((value) => value.trim() === "")
      )
      ) {
        setError((prevError) => ({
          ...prevError,
          primaryname: primaryname.trim() === "",
          primaryresult: primaryresult.trim() === "",
          primarydate: primarydate === "",
          schoolname: schoolname.trim() === "",
          schooldate: schooldate === "",
          examname: examname.trim() === "",
          examnumber: examnumber.trim() === "",
          examresult: examresult.trim() === "",
          jambnumber: jambnumber.trim() === "",
          jambscore: jambscore.trim() === "",
          jambresult: jambresult.trim() === "",
          addInputFields: addInputFields.map((field) => ({
            otherexamname: field.otherexamname.trim() === "",
            otherexamcertificate: field.otherexamcertificate.trim() === "",
            otherexamdate: field.otherexamdate === "",
          })),
          
        }));
        status = true;
  
        setStatus("error");
        setMessage("All fields are required");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        return;
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (
        faculty === "" ||
        department === "" ||
        morefaculty === "" ||
        moredepartment === ""
      ) {
        setError((prevError) => ({
          ...prevError,
          faculty: faculty === "",
          department: department === "",
          morefaculty: morefaculty === "",
          moredepartment: moredepartment === "",
        }));
        status = true;
  
        setStatus("error");
        setMessage("All fields are required");
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
        return;
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleRemoveForm = (index) =>{
      const updatedFields = [...addInputFields];
      updatedFields.splice(index, 1);
      setAddInputFields(updatedFields);
    }
  
    const handleAddForm = () =>{
      setAddInputFields([...addInputFields, { otherexamname: "", otherexamcertificate: "", otherexamdate: "" }]);
    }

  const options = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
  ];
  const option = [
      { label: "Lagos", value: "Lagos" },
      { label: "FCT-Abuja", value: "FCT-Abuja" },
      { label: "Nassarawa", value: "Nassarawa" },
      { label: "Kogi", value: "Kogi" },
    ];
    const option2 = [
      { label: "ikeja", value: "ikeja" },
      { label: "Gwagwalada", value: "Gwagwalada" },
      { label: "Lafia", value: "Lafia" },
      { label: "Lokoja", value: "Lokoja" },
    ];
  
    return (
      <>
      <div className="flex w-screen w-[100%] ">
      <div className="flex w-[50%] bg-blue-600 items-center justify-center">
                <div className=" ">
                    <div className="flex justify-center h-[160px]"><img src={Logo} alt="logo" className="rounded-lg"/></div>
                    <div className="flex justify-center text-[15px] text-[white] font-medium mt-[15px]">BAYELSA STATE POLYTECNIC ALEIBIRI</div>
                    <div className="w-[410px] flex justify-center text-[16px] mt-[17px] text-slate-400">
                       Light, Skill and Self-Reliance
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-[70%] h-screen">
      <SnackbarComponent status={status} show={show} message={message} />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
      <div className="min-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-blue-600 mb-6 font-bold text-xl">STUDENT REGISTRATION</h1>
        </div>
        </div>
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
  
  <div className="w-full px-4 py-2 rounded-md border-2">
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Applicant Bio</span>
      <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
          <TextInput
              required
              name="firstname"
              label="First Name"
              error={error["firstname"]}
              value={firstname}
              onChange={(e) => {
                handleOnChange(e, "firstname")
              }}
          />
          <TextInput
              name="middlename"
              label="Middle Name"
              error={error["middlename"]}
              value={middlename}
              onChange={(e) => {
                handleOnChange(e, "middlename")
              }}
          />
          <TextInput
              required
              name="lastname"
              label="Last Name"
              error={error["lastname"]}
              value={lastname}
              onChange={(e) => {
                handleOnChange(e, "lastname")
              }}
          />
      </div>
      <div className="grid grid-cols-2 gap-8  mb-6 mt-4 ml-2">
          <TextInput
              required
              name="maidenname"
              label="Mother's Maiden Name"
              error={error["maidenname"]}
              value={maidenname}
              onChange={(e) => {
                handleOnChange(e, "maidenname")
              }}
          />
          <TextInput
              required
              type="select"
              isSelect={true}
              value={gender< 1 ?"":gender }
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
              name="dateofbirth"
              label="Date of Birth"
              error={error["dateofbirth"]}
              onChange={(e) => {
                handleOnChangeDate(e, "dateofbirth")
              }}
          />
           <TextInput
              type="file"
              required
              name="birthcertificate"
              label="Upload Birth Certificate"
              error={error["birthcertificate"]}
              value={birthcertificate}
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
              required
              name="phone"
              label="Phone Number"
              value={phone}
              error={error["phone"]}
              onChange={(e) => {
                handleOnChange(e, "phone")
              }}
          />
          <TextInput
              required
              name="email"
              label="email"
              error={error["email"]}
              value={email}
              onChange={(e) => {
                handleOnChange(e, "email")
              }}
          />
      </div>
      <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
      <TextInput
              required
              type="select"
              name="nationality"
              label="Nationality"
              error={error["nationality"]}
              value= {nationality < 1 ? "" : nationality}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "nationality")
                  }
              }
              isSelect={true}
              options={option}
            />
  
          <TextInput
              required
              name="address"
              label="Residence"
              value={address}
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
              name="stateArea"
              error={error["stateArea"]}
              label="Select State"
              value= {stateArea < 1 ? "" : stateArea}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "stateArea")
                  }
              }
              isSelect={true}
              options={option}
            />
  
  <TextInput
              required
              type="select"
              name="localGovt"
              error={error["localGovt"]}
              label="Select Local Government"
              value= {localGovt < 1 ? "": localGovt}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "localGovt")
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
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Primary School</span>
      <div className="grid grid-cols-3 gap-4  mb-6 mt-2 ml-2">
          <TextInput
              className="h-[70px] mt-6"
              required
              name="primaryname"
              label="Primary School Name"
              error={error["primaryname"]}
              value={primaryname}
              onChange={(e) => {
                handleOnChange(e, "primaryname")
              }}
          />
          <TextInput
              className="h-[70px] mt-6"
              required
              type="file"
              name="primaryresult"
              label="Upload Primary School Result"
              error={error["primaryresult"]}
              value={primaryresult}
              onChange={(e) => {
                handleOnChange(e, "primaryresult")
              }}
          />
          <TextInput
              className="h-[70px] mt-6"
              required
              type="date"
              name="primarydate"
              label="Date of Graduation"
              error={error["primarydate"]}
              onChange={(e) => {
                handleOnChangePrimaryDate(e, "primarydate")
              }}
          />
      </div>
      <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2">
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Secondary School</span>
      <div className="grid grid-cols-2 gap-8  mb-6 mt-4 ml-2">
          <TextInput
              className=""
              required
              name="schoolname"
              label="School Name"
              error={error["schoolname"]}
              value={schoolname}
              onChange={(e) => {
                handleOnChange(e, "schoolname")
              }}
          />
         <TextInput
              className=""
              type="date"
              required
              name="schooldate"
              label="Date"
              error={error["schooldate"]}
              onChange={(e) => {
                handleOnChangeDate1(e, "schooldate")
              }}
          />
      </div>
      <div className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
          {/* <TextInput
              className="h-[70px] mt-6"
              required
              name="examname"
              label="Exam Name"
              error={error["examname"]}
              value={examname}
              onChange={(e) => {
                handleOnChange(e, "examname")
              }}
          /> */}
          <TextInput
              className="h-[70px] mt-6"
              required
              type="select"
              name="examname"
              error={error["examname"]}
              label="Select Exam Type"
              value= {examname < 1 ? "" : examname}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "examname")
                  }
              }
              isSelect={true}
              options={option}
            />
          <TextInput
              className="h-[70px] mt-6"
              required
              name="examnumber"
              label="Exam Number"
              error={error["examnumber"]}
              value={examnumber}
              onChange={(e) => {
                handleOnChange(e, "examnumber")
              }}
          />
          <TextInput
              className="h-[70px] mt-6"
              required
              type="file"
              name="examresult"
              label="Result"
              error={error["examresult"]}
              value={examresult}
              onChange={(e) => {
                handleOnChange(e, "examresult")
              }}
          />
          </div>
      </div>
      <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 mt-4">
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Jamb Result</span>
      <div className="grid grid-cols-3 gap-4  mb-6 mt-2 ml-2">
          <TextInput
              className="h-[70px] mt-6"
              required
              name="jambnumber"
              label="Jamb Number"
              error={error["jambnumber"]}
              value={jambnumber}
              onChange={(e) => {
                handleOnChange(e, "jambnumber")
              }}
          />
          <TextInput
              className="h-[70px] mt-6"
              required
              name="jambscore"
              label="Jamb Score"
              error={error["jambscore"]}
              value={jambscore}
              onChange={(e) => {
                handleOnChange(e, "jambscore")
              }}
          />
          <TextInput
              className="h-[70px] mt-6"
              required
              type="file"
              name="jambresult"
              label="Result"
              error={error["jambresult"]}
              value={jambresult}
              onChange={(e) => {
                handleOnChange(e, "jambresult")
              }}
          />
      </div>
      </div>
      <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-2">
      <span style={{position:"relative", left:"-300px", bottom:"24px"}}>Other Exam Certificate</span>
      {addInputFields?.map((field, index) => (
        <div key={index} className="grid grid-cols-3 gap-4  mb-6 mt-4 ml-2">
        <TextInput


        className="h-[70px] mt-6"
        required
        name="otherexamname"
        label="Exam Name"
        error={error.addInputFields?.[index]?.otherexamname}
        value={field.otherexamname}
        onChange={(e) =>{
          handleAddInputOnchange(index, e)
        }}
    />
    <TextInput
        className="h-[70px] mt-6"
        required
        type="file"
        name="otherexamcertificate"
        label="Exam Certificate"
        error={error.addInputFields?.[index]?.otherexamcertificate}
        value={field.otherexamcertificate}
        onChange={(e) =>{
          handleAddInputOnchange(index, e)
        }}
    />
       <TextInput
        type="date"
        required
        name="otherexamdate"
        label="Exam Year"
        error={error.addInputFields?.[index]?.otherexamdate}
        onChange={(e) =>{ 
          handleOnChangeDate2(index, e)
        }}
    />
     <IconButton
                style={cancelIconStyle}
                variant="contained"
                aria-label="Cancel"
                onClick={() => handleRemoveForm(index)}
                sx={{ marginLeft: 120 }}
              >
                 <CancelIcon />
              </IconButton>

    </div>
                    ))}
      <Button
                variant="contained"
                color="primary"
                onClick={handleAddForm}
                sx={{ marginLeft: 8 }}
              >
                Add other Certificate
              </Button>
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
              name="faculty"
              error={error["faculty"]}
              label="Select Faculty"
              value= {faculty < 1 ? "" : faculty}
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
              name="department"
              error={error["department"]}
              label="Select Department"
              value= {department < 1 ? "" : department}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "department")
                  }
              }
              isSelect={true}
              options={option}
            />
            </div>
      </div>
      <div className="w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6">
      <span style={{position:"relative", left:"-452px", bottom:"23px"}}>Second Choice</span>
                <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                <TextInput
              required
              type="select"
              name="morefaculty"
              error={error["morefaculty"]}
              label="Select More Faculty"
              value= {morefaculty < 1 ? "" : morefaculty}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "morefaculty")
                  }
              }
              isSelect={true}
              options={option}
            />
           <TextInput
              required
              type="select"
              name="moredepartment"
              error={error["moredepartment"]}
              label="Select More Department"
              value= {moredepartment < 1 ? "" : moredepartment}
              onChange={
                  (e) => {
  
                    handleOnChange(e, "moredepartment")
                  }
              }
              isSelect={true}
              options={option}
            />
            </div>
      </div>
      </div>
              </>
            )}
             {activeStep === 3 && (
              <>
            <StudentEnrollmentPage 
                firstname={firstname}
                middlename={middlename}
                lastname={lastname}
                maidenname ={maidenname}
                gender ={gender}
                phone = {phone}
                email = {email}
                dateofbirth ={dateofbirth}
                birthcertificate = {birthcertificate}
                nationality = {nationality}
                address = {address}
                stateArea = {stateArea}
                localGovt = {localGovt}
                primaryname = {primaryname}
                primaryresult = {primaryresult}
                primarydate = {primarydate}
                schoolname ={schoolname}
                schooldate = {schooldate}
                examname = {examname}
                examnumber = {examnumber}
                examresult= {examresult}
                jambnumber = {jambnumber}
                jambscore = {jambscore}
                jambresult = {jambresult}
                faculty = {faculty}
                department = {department}
                morefaculty = {morefaculty}
                moredepartment = {moredepartment}
                addInputFields = {addInputFields}
            />
              </>
            )}
          </Grid>
          <Grid item xs={0}>
          {activeStep > 0 && (
             <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="danger"
                onClick={handleBack}
                sx={{ marginLeft: 8 }}
              >
                Back
              </Button>
              </ThemeProvider>
            )}
            <Button
              variant="contained"
              color={activeStep === steps.length - 1 ? "success" : "primary"}
              onClick={handleNext}
              disabled={activeStep === steps.length + 1}
              sx={{ marginLeft: 2 }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
           
          </Grid>
        </Grid>
      </Container>
      </div>
      </div>
      </>
    );
  };
  
  export default StudentEnrollment;
  
