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

const steps = ["Personal Details", "Educational Detail", "Uploads"];


const StudentEnrollment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState("success");
  const [state, setState] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({
        name: false,
        email: false,
        address: false,
        phone_number: false,
        gender: false
    });



  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
        case "name":
            // code to be executed when the expression matches value1
            setName(e.target.value)
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
        default:
            // code to be executed when the expression does not match any of the cases
            setGender(e.target.value)
    }
};
const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
];

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {activeStep === 0 && (
            <>
              <Typography variant="h6">Personal Details</Typography>
              <div className="">

<div className="">

    <div className="">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="name"
            label="Name"
            error={error["name"]}
            value={name}
            onChange={(e) => {
                handleOnChange(e, "name")
            }}
        />
    </div>
    <div className="">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="email"
            error={error["email"]}
            value={email}
            label="email"
            onChange={(e) => {
                handleOnChange(e, "email")
            }}
        />
    </div>
</div>
<div className="grid grid-cols-1 gap-4  mb-6">

    <div className="ml-2">
        <TextInput
            required
            type="select"
            isSelect={true}
            value={gender.length < 1 ?"Male":gender }
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

</div>
<div className="grid grid-cols-2 gap-4  mb-6">

    <div className="">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="phonenumber"
            label="Phone Number"
            value={phone}
            error={error["phone_number"]}
            onChange={(e) => {
                handleOnChange(e, "phone")
            }}
        />
    </div>
    <div className="">
        <TextInput
            className="h-[70px] mt-6"
            required
            id="address"
            label="address"
            value={address}
            error={error["address"]}
            onChange={(e) => {
                handleOnChange(e, "address")
            }}
        />
    </div>
</div>

</div>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Typography variant="h6">Educational Details</Typography>
              <TextField
                label="Email"
                name="email"
                onChange={handleOnChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
          {activeStep === 2 && (
            <>
              <Typography variant="h6">Uploads</Typography>
              <TextField
                label="Phone"
                name="phone"
                onChange={handleOnChange}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </Grid>
        <Grid item xs={12}>
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
