import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import {
  fetchFacultyData,
  fetchDepartmentData,
} from "../../services/Choice.module";
import { state, localGovts } from "../../services/Sites.module";
import { examTypeData } from "../../services/Exams.module";
import { currentApplicationFeeData } from "../../services/Currentfee.module";
import { jambData } from "../../services/Jamb.module";
// import Moment from 'react-moment';
import Logo from "../../assests/bayelsalogo.jpeg";
import logo1 from "../../assests/bayelsalogo.png";
import { useNavigate } from "react-router-dom";
import FBNChecheckout from "payment-checkout";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import TextInput from "../../components/TextInput";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackbarComponent from "../../components/SnackbarComponent";
import StudentEnrollmentDetailsComponent from "../../components/StudentEnrollmentDetailsComponent";
import BlockSectionComponent from "../../components/BlockSectionComponent";
import AppModal from "../../components/AppModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = [
  "Personal Details",
  "Educational Detail",
  "Course Of Study",
  "Summary",
];

const theme = createTheme({
  palette: {
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
    danger: {
      main: "#DC3545",
      contrastText: "#fff",
    },
  },
});

const StudentEnrollmentPage = () => {
  const navigation = useNavigate();
  const [paymentOptions, setpaymentOptions] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [ayncsState, setAyncsState] = useState(true);
  const [ayncsLga, setAyncsLga] = useState(false);
  const [ayncsFaculty, setAyncsFaculty] = useState(true);
  const [ayncsDepartment, setAyncsDepartment] = useState(false);
  const [ayncsMoreDepartment, setAyncsMoreDepartment] = useState(false);
  const [ayncsExam, setAyncsExam] = useState(true);
  const [jambExamId, setJambExamId] = useState();
  const [localGovtOptions, setLocalGovtOptions] = useState([]);
  const [facultyOption, setFacultyOption] = useState([]);
  const [departmentOption, setDepartmentOption] = useState([]);
  const [moreDepartmentOption, setMoreDepartmentOption] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [examOptions, setExamOptions] = useState([]);
  const [data, setData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = React.useState("success");
  const [message, setMessage] = React.useState("");
  // BIO
  const [firstname, setFirstname] = React.useState("");
  const [middlename, setMiddlename] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [maidenname, setMaidenname] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [dateofbirth, setDateofbirth] = React.useState("");
  const [birthcertificate, setBirthcertificate] = React.useState("");
  // // contact address
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [stateArea, setStateArea] = React.useState("");
  const [localGovt, setLocalGovt] = React.useState("");
  //primary school
  const [primaryname, setPrimaryname] = React.useState("");
  const [primaryresult, setPrimaryresult] = React.useState("");
  const [primarydate, setPrimarydate] = React.useState("");
  // // step 2/secondary school
  const [schoolname, setSchoolname] = React.useState("");
  const [schooldate, setSchooldate] = React.useState("");
  const [examname, setExamname] = React.useState("");
  const [examdate, setExamdate] = React.useState("");
  const [examnumber, setExamnumber] = React.useState("");
  const [examresult, setExamresult] = React.useState("");
  // // jamb result
  const [jambnumber, setJambnumber] = React.useState("");
  const [jambscore, setJambscore] = React.useState("");
  const [jambresult, setJambresult] = React.useState("");
  const [jambdate, setJambdate] = React.useState("");
  // faculties/deparment

  const [faculty, setFaculty] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [morefaculty, setMorefaculty] = React.useState("");
  const [moredepartment, setMoredepartment] = React.useState("");
  const [show, setShow] = React.useState(false);

  const [addInputFields, setAddInputFields] = React.useState([
    {
      otherexamname: "",
      otherexamcertificate: "",
      otherexamdate: "",
      otherexamnumber: "",
    },
  ]);

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
    examdate: false,
    examresult: false,
    jambname: false,
    jambnumber: false,
    jambscore: false,
    jambresult: false,
    jambdate: false,
    faculty: false,
    department: false,
    morefaculty: false,
    moredepartment: false,
    addInputFields: [
      {
        otherexamname: false,
        otherexamcertificate: false,
        otherexamdate: false,
        otherexamnumber: false,
      },
    ],
  });

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = () => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/dashboard");
    }
    examTypeDatas();
    facultyData();
    stateData();
    currentApplicationFee();
    jambTypeDatas();
  };

  const generate12DigitTimestamp = () => {
    var currentTimestamp = Date.now();

    if (currentTimestamp.toString().length > 12) {
      return currentTimestamp.toString().slice(0, 12);
    }
    if (currentTimestamp.toString().length < 12) {
      // Convert to a string and pad with zeros to ensure it has 12 digits
      const timestampString = currentTimestamp.toString().padStart(12, "0");

      return timestampString;
    }
    return currentTimestamp;
  };
  const initiatePayment = () => {
    const txn = {
      live: false,
      ref: generate12DigitTimestamp(), // Unique translation reference compulsory
      amount: parseInt(paymentOptions.amount), // transaction amount compulsory
      customer: {
        firstname: firstname,
        lastname: lastname,
        email: email, // Customer email compulsory
        id: generate12DigitTimestamp(),
      },
      fees: [
        {
          amount: parseInt(paymentOptions.amount),
          label: "Application Fee",
        },
      ],
      meta: {},
      publicKey: "sb-pk-qip2Wpdio1utTdVAIvyVOh4qVvfxrt4g", // Merchant public key from your dashboard compulsory
      description: "Application Fee",
      currency: "NGN",
      callback: (res) => submit(res), // Your callback function
      onClose: () => console.log("onclose"), // Your onclose function
      options: ["QR", "CARD", "WALLET", "PAYATTITUE"],
    };

    FBNChecheckout.initiateTransaction(txn); // initiates the payment
  };
  const contentArea = useRef(null);

  const scrollToTop = () => {
    if (contentArea.current) {
      contentArea.current.scrollTop = 0;
    }
  };

  const navigate = useNavigate();

  const ApiDatas = async (importer, id = 0) => {
    let response;
    if (id !== 0) {
      response = await importer(id);
    } else {
      response = await importer();
    }
    return response;
  };

  const currentApplicationFee = async () => {
    let apiData = await ApiDatas(currentApplicationFeeData);
    setpaymentOptions(apiData.data.data);
  };

  const stateData = async () => {
    let response = await state();

    let reArrangeData = [];
    response.data.data.map((datas) => {
      reArrangeData.push({ label: datas.name, value: datas.id });
    });
    setStateOptions(reArrangeData);
    setAyncsState(false);
  };

  const localGovtData = async (id) => {
    let response = await localGovts(id);

    let reArrangeData = [];
    response.data.data.map((datas) => {
      reArrangeData.push({ label: datas.name, value: datas.id });
    });
    setLocalGovtOptions(reArrangeData);
    setAyncsLga(false);
  };

  const facultyData = async () => {
    let apiData = await ApiDatas(fetchFacultyData);
    let reArrangeData = [];
    apiData.data.data.map((datas) => {
      reArrangeData.push({ label: datas.title, value: datas.id });
    });
    setFacultyOption(reArrangeData);
    setAyncsFaculty(false);
  };

  const departmentData = async (id) => {
    let apiData = await ApiDatas(fetchDepartmentData, id);
    let reArrangeData = [];
    apiData.data.data.map((datas) => {
      reArrangeData.push({ label: datas.title, value: datas.id });
    });
    setDepartmentOption(reArrangeData);
    setAyncsDepartment(false);
  };

  const moreDepartmentData = async (id) => {
    let apiData = await ApiDatas(fetchDepartmentData, id);
    let reArrangeData = [];
    apiData.data.data.map((datas) => {
      reArrangeData.push({ label: datas.title, value: datas.id });
    });
    setAyncsMoreDepartment(false);
    setMoreDepartmentOption(reArrangeData);
  };

  const examTypeDatas = async () => {
    let apiData = await ApiDatas(examTypeData);
    let reArrangeData = [];
    apiData.data.data.map((datas) => {
      reArrangeData.push({ label: datas.title, value: datas.id });
    });
    setExamOptions(reArrangeData);
    setAyncsExam(false);
  };

  const jambTypeDatas = async () => {
    let apiData = await ApiDatas(jambData);
    setJambExamId(apiData.data.data.id);
  };

  const handleAddInputOnchange = (index, e) => {
    const updatedFields = [...addInputFields];
    if (e.target.type === "file") {
      // For file input, store the file name in otherexamcertificate
      setError((prevError) => ({
        ...prevError,
        address: false,
      }));
      updatedFields[index].otherexamcertificate = e.target.files;
    } else {
      // For other input types, store the value directly
      updatedFields[index][e.target.name] = e.target.value;
    }
    setAddInputFields(updatedFields);
  };

  const handleAddInputOnchangeForSelect = (index, e) => {
    const updatedFields = [...addInputFields];
    updatedFields[index].otherexamname = e.target.value;
    setAddInputFields(updatedFields);
  };

  const handleOnChange = (e, inputeName) => {
    switch (inputeName) {
      case "firstname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          firstname: false,
        }));
        setFirstname(e.target.value);
        break;
      case "middlename":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          middlename: false,
        }));
        setMiddlename(e.target.value);
        break;
      case "lastname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          lastname: false,
        }));
        setLastname(e.target.value);
        break;
      case "maidenname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          maidenname: false,
        }));
        setMaidenname(e.target.value);
        break;

      case "birthcertificate":
        // code to be executed when the expression matches value1

        setError((prevError) => ({
          ...prevError,
          birthcertificate: false,
        }));
        setBirthcertificate(e.target.files);
        break;
      case "email":
        // code to be executed when the expression matches value2
        setError((prevError) => ({
          ...prevError,
          email: false,
        }));
        setEmail(e.target.value);
        break;
      case "phone":
        // code to be executed when the expression matches value3
        setError((prevError) => ({
          ...prevError,
          phone: false,
        }));
        setPhone(e.target.value);
        break;
      case "address":
        // code to be executed when the expression matches value3
        setError((prevError) => ({
          ...prevError,
          address: false,
        }));
        setAddress(e.target.value);
        break;
      case "nationality":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          nationality: false,
        }));
        setNationality(e.target.value);
        break;
      case "stateArea":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          stateArea: false,
        }));
        localGovtData(e.target.value);
        setAyncsLga(true);
        setStateArea(e.target.value);

        break;
      case "localGovt":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          localGovt: false,
        }));
        setLocalGovt(e.target.value);
        break;
      case "primaryname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          primaryname: false,
        }));
        setPrimaryname(e.target.value);
        break;
      case "primaryresult":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          primaryresult: false,
        }));
        setPrimaryresult(e.target.files);
        break;
      case "schoolname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          schoolname: false,
        }));
        setSchoolname(e.target.value);
        break;
      case "examname":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          examname: false,
        }));
        setExamname(e.target.value);
        break;
      case "examdate":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          examdate: false,
        }));
        let formattedDate = moment(e).format("YYYY-MM-DD");
        setExamdate(formattedDate);
        break;
      case "jambdate":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          jambdate: false,
        }));
        let formattedJambDate = moment(e).format("YYYY-MM-DD");
        setJambdate(formattedJambDate);
        break;
      case "examnumber":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          examnumber: false,
        }));
        setExamnumber(e.target.value);
        break;
      case "examresult":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          examresult: false,
        }));
        setExamresult(e.target.files);
        break;
      case "jambnumber":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          jambnumber: false,
        }));
        setJambnumber(e.target.value);
        break;
      case "jambscore":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          jambscore: false,
        }));
        setJambscore(e.target.value);
        break;
      case "jambresult":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          jambresult: false,
        }));
        setJambresult(e.target.files);
        break;
      case "faculty":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          faculty: false,
        }));
        departmentData(e.target.value);
        setAyncsDepartment(true);
        setFaculty(e.target.value);
        break;
      case "department":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          department: false,
        }));
        setDepartment(e.target.value);
        break;
      case "morefaculty":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          morefaculty: false,
        }));
        setAyncsMoreDepartment(true);
        moreDepartmentData(e.target.value);
        setMorefaculty(e.target.value);
        break;
      case "moredepartment":
        // code to be executed when the expression matches value1
        setError((prevError) => ({
          ...prevError,
          moredepartment: false,
        }));
        setMoredepartment(e.target.value);
        break;
      // more cases...
      default:
        // code to be executed when the expression does not match any of the cases
        setError((prevError) => ({
          ...prevError,
          gender: false,
        }));
        setGender(e.target.value);
    }
  };

  const submit = async (payment) => {
    if (payment.data.status == "SUCCESS") {
      setLoader(true);
      //e.preventDefault();

      // Create a new FormData object
      const formData = new FormData();
      // Append data from your form fields to the FormData object
      formData.append("email", email);
      formData.append("payment_reff", payment.data.transactionReference);
      formData.append("amount", payment.amount);
      formData.append("first_name", firstname);
      formData.append("middle_name", middlename);
      formData.append("last_name", lastname);
      formData.append("maiden_name", maidenname);
      formData.append("gender", gender);
      formData.append("dob", dateofbirth);
      formData.append("certificate", birthcertificate[0]);
      formData.append("phone_number", phone);
      formData.append("country_id", nationality);
      formData.append("address", address);
      formData.append("state_id", stateArea);
      formData.append("lga_id", localGovt);

      let studentResult = [
        {
          exam_type_id: examname,
          exam_number: examnumber,
          exam_date: examdate,
          image: examresult[0],
        },
        {
          exam_type_id: jambExamId,
          exam_number: jambnumber,
          exam_date: jambdate,
          image: jambresult[0],
          exam_score: jambscore,
        },
      ];
      formData.append("student_results[0][exam_type_id]", examname);
      formData.append("student_results[0][exam_number]", examnumber);
      formData.append("student_results[0][exam_date]", examdate);
      formData.append("student_results[0][image]", examresult[0]);

      formData.append("student_results[1][exam_type_id]", jambExamId);
      formData.append("student_results[1][exam_number]", jambnumber);
      formData.append("student_results[1][exam_date]", jambdate);
      formData.append("student_results[1][image]", jambresult[0]);
      formData.append("student_results[1][exam_score]", jambscore);

      addInputFields.forEach((field, index) => {
        let newIndex = index + 2;
        formData.append(
          `student_results[${newIndex}][exam_type_id]`,
          field.otherexamname
        );
        formData.append(
          `student_results[${newIndex}][exam_number]`,
          field.otherexamnumber
        );
        formData.append(
          `student_results[${newIndex}][exam_date]`,
          field.otherexamdate
        );
        formData.append(
          `student_results[${newIndex}][image]`,
          field.otherexamcertificate[0]
        );
      });

      // if (
      //   addInputFields.length == 1 &&
      //   addInputFields[0].exam_number.length !== 0
      // ) {
      //   addInputFields.forEach((field, index) => {
      //     // let otherExams = {
      //     //   exam_type_id: field.otherexamname,
      //     //   exam_number: field.otherexamnumber,
      //     //   exam_date: field.otherexamdate,
      //     //   image: field.otherexamcertificate[0],
      //     // };
      //     // studentResult.push(otherExams);

      //     let newIndex = index + 2;
      //     formData.append(
      //       `student_results[${newIndex}][exam_type_id]`,
      //       field.otherexamname
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][exam_number]`,
      //       field.otherexamnumber
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][exam_date]`,
      //       field.otherexamdate
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][image]`,
      //       field.otherexamcertificate[0]
      //     );
      //   });
      // }

      // if (addInputFields.length > 1) {
      //   addInputFields.forEach((field, index) => {
      //     // let otherExams = {
      //     //   exam_type_id: field.otherexamname,
      //     //   exam_number: field.otherexamnumber,
      //     //   exam_date: field.otherexamdate,
      //     //   image: field.otherexamcertificate[0],
      //     // };
      //     // studentResult.push(otherExams);

      //     let newIndex = index + 2;
      //     formData.append(
      //       `student_results[${newIndex}][exam_type_id]`,
      //       field.otherexamname
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][exam_number]`,
      //       field.otherexamnumber
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][exam_date]`,
      //       field.otherexamdate
      //     );
      //     formData.append(
      //       `student_results[${newIndex}][image]`,
      //       field.otherexamcertificate[0]
      //     );
      //   });
      // }

      //formData.append('student_results', jsonBlob );
      //formData.append('student_results', JSON.stringify(studentResult) );
      // studentResult.forEach((item, index) => {
      //   const serializedItem = JSON.stringify(item);
      //   formData.append(`student_results[${index}]`, serializedItem);
      // });
      let schoolsAttended = [
        {
          school_name: primaryname,
          graduation_year: primarydate,
          image: primaryresult[0],
        },

        {
          school_name: schoolname,
          graduation_year: schooldate,
        },
      ];

      // schoolsAttended.forEach((item, index) => {
      //   const serializedItem = JSON.stringify(item);
      //   formData.append(`schools_attended[${index}]`, serializedItem);
      // });

      formData.append("schools_attended[0][school_name]", primaryname);
      formData.append("schools_attended[0][graduation_year]", primarydate);
      formData.append("schools_attended[0][image]", primaryresult[0]);

      formData.append("schools_attended[1][school_name]", schoolname);
      formData.append("schools_attended[1][graduation_year]", schooldate);
      formData.append("schools_attended[1][image]", examresult[0]);
      let choice = [
        {
          faculty_id: faculty,
          department_id: department,
        },
        {
          faculty_id: morefaculty,
          department_id: moredepartment,
        },
      ];
      formData.append("choice", JSON.stringify(choice));

      try {
        // Make an HTTP POST request to the API endpoint
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/student/application",
          formData
        );

        // Handle the API response as needed

        setLoader(false);
        setOpenModal(true);
      } catch (error) {
        // Handle errors, such as network issues or API validation errors
        setLoader(false);
      }
    }
  };

  const closeAndRedirect = () => {
    setOpenModal(false);
    navigation("/");
  };

  const handleOnChangeDate = (e) => {
    let formattedDate = moment(e).format("YYYY-MM-DD");
    setError((prevError) => ({
      ...prevError,
      dateofbirth: false,
    }));
    setDateofbirth(formattedDate); // Set the formatted date in your state
  };

  const handleOnChangeDate1 = (e) => {
    let formattedDate = moment(e).format("YYYY-MM-DD");
    setError((prevError) => ({
      ...prevError,
      schooldate: false,
    }));
    setSchooldate(formattedDate); // Set the formatted date in your state
  };

  const handleOnChangePrimaryDate = (e) => {
    let formattedDate = moment(e).format("YYYY-MM-DD");

    setError((prevError) => ({
      ...prevError,
      primarydate: false,
    }));
    setPrimarydate(formattedDate); // Set the formatted date in your state
  };

  const handleOnChangeDate2 = (index, e) => {
    let formattedDate = moment(e).format("YYYY-MM-DD");

    // Create a copy of the addInputFields array and update the specific field by index
    const updatedFields = [...addInputFields];
    updatedFields[index].otherexamdate = formattedDate;

    // Set the updated array back to state
    setAddInputFields(updatedFields);
  };
  const checkAddInputFields = () => {
    let otherexamcertificate = addInputFields[0].otherexamcertificate.length;
    if (addInputFields[0].otherexamcertificate[0]) {
      otherexamcertificate = JSON.stringify(
        addInputFields[0].otherexamcertificate[0]
      ).length;
    }

    let otherexamdate = addInputFields[0].otherexamdate.length;
    let otherexamname = addInputFields[0].otherexamname.length;
    let otherexamnumber = addInputFields[0].otherexamnumber.length;

    if (
      otherexamcertificate > 0 &&
      (otherexamdate == 0 || otherexamname == 0 || otherexamnumber == 0)
    ) {
      return true;
    }

    if (
      otherexamdate > 0 &&
      (otherexamcertificate == 0 || otherexamname == 0 || otherexamnumber == 0)
    ) {
      return true;
    }

    if (
      otherexamname > 0 &&
      (otherexamdate == 0 || otherexamcertificate == 0 || otherexamnumber == 0)
    ) {
      return true;
    }

    if (
      otherexamnumber > 0 &&
      (otherexamdate == 0 || otherexamname == 0 || otherexamcertificate == 0)
    ) {
      return true;
    }

    return false;
  };

  const checkOtherExamIsGreaterthanOne = (field) => {};
  const handleNext = () => {
    let status = false;
    scrollToTop();
    if (activeStep === 0) {
      if (
        firstname.trim() === "" ||
        lastname.trim() === "" ||
        maidenname.trim() === "" ||
        gender.trim() === "" ||
        dateofbirth === "" ||
        birthcertificate === "" ||
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
          birthcertificate: birthcertificate === "",
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
      if (addInputFields.length == 1) {
        // check here the input has a field which is not empty and request a validation else do the below
        if (checkAddInputFields()) {
          setError((prevError) => ({
            ...prevError,
            primaryname: primaryname.trim() === "",
            primaryresult: primaryresult === "",
            primarydate: primarydate === "",
            schoolname: schoolname.trim() === "",
            schooldate: schooldate === "",
            examname: examname === "",
            examnumber: examnumber.trim() === "",
            examresult: examresult === "",
            jambnumber: jambnumber.trim() === "",
            jambscore: jambscore.trim() === "",
            jambresult: jambresult === "",
            jambdate: jambdate.trim() === "",
            examdate: examdate.trim() === "",
            addInputFields: addInputFields.map((field) => {
              return {
                otherexamname: field.otherexamname === "",
                otherexamcertificate: field.otherexamcertificate === "",
                otherexamdate: field.otherexamdate === "",
                otherexamnumber: field.otherexamnumber === "",
              };
            }),
          }));
          status = true;

          setStatus("error");
          setMessage("All fields are required a");
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 6000);
          return;
        } else {
          if (
            primaryname.trim() === "" ||
            primaryresult === "" ||
            primarydate === "" ||
            schoolname.trim() === "" ||
            schooldate === "" ||
            examname === "" ||
            examnumber.trim() === "" ||
            examdate.trim() === "" ||
            examresult === "" ||
            jambdate.trim() === "" ||
            jambnumber.trim() === "" ||
            jambscore.trim() === "" ||
            jambresult === ""
          ) {
            setError((prevError) => ({
              ...prevError,
              primaryname: primaryname.trim() === "",
              primaryresult: primaryresult === "",
              primarydate: primarydate === "",
              schoolname: schoolname.trim() === "",
              schooldate: schooldate === "",
              examname: examname === "",
              examnumber: examnumber.trim() === "",
              examresult: examresult === "",
              jambnumber: jambnumber.trim() === "",
              jambscore: jambscore.trim() === "",
              jambresult: jambresult === "",
              jambdate: jambdate.trim() === "",
              examdate: examdate.trim() === "",
            }));
            status = true;

            setStatus("error");
            setMessage("All fields are required ");
            setShow(true);
            setTimeout(() => {
              setShow(false);
            }, 6000);
            return;
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
      } else {
        if (
          primaryname.trim() === "" ||
          primaryresult === "" ||
          primarydate === "" ||
          schoolname.trim() === "" ||
          schooldate === "" ||
          examname === "" ||
          examnumber.trim() === "" ||
          examdate.trim() === "" ||
          examresult === "" ||
          jambdate.trim() === "" ||
          jambnumber.trim() === "" ||
          jambscore.trim() === "" ||
          jambresult === "" ||
          addInputFields.some((field) =>
            Object.values(field).some((value) => value === "")
          )
        ) {
          setError((prevError) => ({
            ...prevError,
            primaryname: primaryname.trim() === "",
            primaryresult: primaryresult === "",
            primarydate: primarydate === "",
            schoolname: schoolname.trim() === "",
            schooldate: schooldate === "",
            examname: examname === "",
            examnumber: examnumber.trim() === "",
            examresult: examresult === "",
            jambnumber: jambnumber.trim() === "",
            jambscore: jambscore.trim() === "",
            jambresult: jambresult === "",
            jambdate: jambdate.trim() === "",
            examdate: examdate.trim() === "",
            addInputFields: addInputFields.map((field) => {
              return {
                otherexamname: field.otherexamname === "",
                otherexamcertificate: field.otherexamcertificate === "",
                otherexamdate: field.otherexamdate === "",
                otherexamnumber: field.otherexamnumber === "",
              };
            }),
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
          primaryname: primaryname,
          primarydate: primarydate,
          primaryresult: primaryresult,
          localGovt: localGovt,
          schoolname: schoolname,
          schooldate: schooldate,
          examname: examname,
          examnumber: examnumber,
          examresult: examresult,
          examdate: examdate,
          jambnumber: jambnumber,
          jambscore: jambscore,
          jambresult: jambresult,
          jambdate: jambdate,
          faculty: faculty,
          department: department,
          morefaculty: morefaculty,
          moredepartment: moredepartment,
          addInputFields: addInputFields,
        };

        setData(data);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    scrollToTop();
    setBirthcertificate("");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRemoveForm = (index) => {
    const updatedFields = [...addInputFields];
    updatedFields.splice(index, 1);
    setAddInputFields(updatedFields);
  };

  const handleAddForm = () => {
    setAddInputFields([
      ...addInputFields,
      {
        otherexamname: "",
        otherexamcertificate: "",
        otherexamdate: "",
        otherexamnumber: "",
      },
    ]);
  };

  const genderOption = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const option = [{ label: "Nigeria", value: 1 }];

  const renderActionButton = (index) => {
    if (addInputFields.length > 1) {
      return (
        <div className="flex h-[60px] items-center w-[10%]">
          <div className=" ">
            <CancelIcon
              onClick={() => handleRemoveForm(index)}
              className="text-[red] text-2xl cursor-pointer"
            />
          </div>
          <div className="">
            <AddIcon
              onClick={handleAddForm}
              className="text-[green] text-2xl cursor-pointer"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex h-[60px] items-center w-[10%] ">
          <AddIcon
            onClick={handleAddForm}
            className="text-[green] cursor-pointer"
          />
        </div>
      );
    }
  };

  return (
    <div className="">
      <div className="flex h-[100vh] ">
        <div className="flex w-[30%] bg-blue-600 items-center justify-center  ">
          <div className=" ">
            <div className="flex justify-center h-[160px]">
              <img src={Logo} alt="logo" className="rounded-lg" />
            </div>
            <div className="flex justify-center text-[15px] text-[white] font-medium mt-[15px]">
              BAYELSA STATE POLYTECNIC ALEIBIRI
            </div>
            <div className="w-[410px] flex justify-center text-[16px] mt-[17px] text-slate-400">
              Light, Skill and Self-Reliance
            </div>
          </div>
        </div>
        <div
          ref={contentArea}
          className="z-0 h-[100%] flex items-center justify-center  w-[100%] pt-[200px] pb-[20px]    overflow-auto"
        >
          <SnackbarComponent status={status} show={show} message={message} />
          <Container maxWidth="lg" sx={{ mt: 2 }}>
            <div className="min-screen flex items-center justify-center">
              <div className="text-center mt-[15px]">
                <h1 className="text-blue-600 mb-6 font-bold text-xl">
                  STUDENT REGISTRATION
                </h1>
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
                  <div className="mt-8">
                    <BlockSectionComponent title="Applicat Bio">
                      <div className="grid grid-cols-3 gap-4 mt-4 ">
                        <TextInput
                          required
                          name="firstname"
                          label="First Name"
                          error={error["firstname"]}
                          value={firstname}
                          onChange={(e) => {
                            handleOnChange(e, "firstname");
                          }}
                        />
                        <TextInput
                          name="middlename"
                          label="Middle Name"
                          error={error["middlename"]}
                          value={middlename}
                          onChange={(e) => {
                            handleOnChange(e, "middlename");
                          }}
                        />
                        <TextInput
                          required
                          name="lastname"
                          label="Last Name"
                          error={error["lastname"]}
                          value={lastname}
                          onChange={(e) => {
                            handleOnChange(e, "lastname");
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 ">
                        <TextInput
                          required
                          name="maidenname"
                          label="Mother's Maiden Name"
                          error={error["maidenname"]}
                          value={maidenname}
                          onChange={(e) => {
                            handleOnChange(e, "maidenname");
                          }}
                        />
                        <TextInput
                          required
                          type="select"
                          isSelect={true}
                          value={gender < 1 ? "" : gender}
                          label={"Gender"}
                          error={error["gender"]}
                          onChange={(e) => {
                            handleOnChange(e, "gender");
                          }}
                          options={genderOption}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <TextInput
                          className=""
                          type="date"
                          required
                          name="dateofbirth"
                          label="Date of Birth"
                          error={error["dateofbirth"]}
                          onChange={(e) => {
                            handleOnChangeDate(e, "dateofbirth");
                          }}
                        />
                        <TextInput
                          type="file"
                          required
                          name="birthcertificate"
                          label="birth certificate"
                          error={error["birthcertificate"]}
                          isSelect={birthcertificate}
                          onChange={(e) => {
                            handleOnChange(e, "birthcertificate");
                          }}
                        />
                      </div>
                    </BlockSectionComponent>

                    <BlockSectionComponent title="Contact Address">
                      <div className="grid grid-cols-2 gap-4 ">
                        <TextInput
                          required
                          name="phone"
                          label="Phone Number"
                          value={phone}
                          error={error["phone"]}
                          onChange={(e) => {
                            handleOnChange(e, "phone");
                          }}
                        />
                        <TextInput
                          required
                          name="email"
                          label="email"
                          error={error["email"]}
                          value={email}
                          onChange={(e) => {
                            handleOnChange(e, "email");
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4  mt-4">
                        <TextInput
                          required
                          type="select"
                          name="nationality"
                          label="Nationality"
                          error={error["nationality"]}
                          value={nationality < 1 ? "" : nationality}
                          onChange={(e) => {
                            handleOnChange(e, "nationality");
                          }}
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
                            handleOnChange(e, "address");
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4 ">
                        <TextInput
                          required
                          type="select"
                          ayncs={ayncsState}
                          name="stateArea"
                          error={error["stateArea"]}
                          label="Select State"
                          value={stateArea < 1 ? "" : stateArea}
                          onChange={(e) => {
                            handleOnChange(e, "stateArea");
                          }}
                          isSelect={true}
                          options={stateOptions}
                        />

                        <TextInput
                          required
                          type="select"
                          name="localGovt"
                          error={error["localGovt"]}
                          label="Select Local Government"
                          value={localGovt < 1 ? "" : localGovt}
                          onChange={(e) => {
                            handleOnChange(e, "localGovt");
                          }}
                          ayncs={ayncsLga}
                          isSelect={true}
                          options={localGovtOptions}
                        />
                      </div>
                    </BlockSectionComponent>
                  </div>
                )}
                {activeStep === 1 && (
                  <div>
                    <BlockSectionComponent title="Primary School">
                      <div className="grid grid-cols-3 gap-8   mt-4">
                        <TextInput
                          className=""
                          required
                          name="primaryname"
                          label="Primary School"
                          error={error["primaryname"]}
                          value={primaryname}
                          onChange={(e) => {
                            handleOnChange(e, "primaryname");
                          }}
                        />
                        <TextInput
                          className="h-[70px] mt-6"
                          required
                          type="file"
                          name="primaryresult"
                          label="Result"
                          isSelect={primaryresult}
                          error={error["primaryresult"]}
                          onChange={(e) => {
                            handleOnChange(e, "primaryresult");
                          }}
                        />
                        <TextInput
                          className=""
                          type="date"
                          required
                          name="primarydate"
                          label="Date"
                          error={error["primarydate"]}
                          onChange={(e) => {
                            handleOnChangePrimaryDate(e);
                          }}
                        />
                      </div>
                    </BlockSectionComponent>

                    <BlockSectionComponent title="Secondary School">
                      <div className="grid grid-cols-2 gap-8   mt-4">
                        <TextInput
                          className=""
                          required
                          name="schoolname"
                          label="School Name"
                          error={error["schoolname"]}
                          value={schoolname}
                          onChange={(e) => {
                            handleOnChange(e, "schoolname");
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
                            handleOnChangeDate1(e, "schooldate");
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-4  ">
                        <TextInput
                          className="h-[70px] "
                          required
                          type="select"
                          name="examname"
                          error={error["examname"]}
                          label="Select Exam Type"
                          value={examname < 1 ? "" : examname}
                          onChange={(e) => {
                            handleOnChange(e, "examname");
                          }}
                          isSelect={true}
                          options={examOptions}
                          ayncs={ayncsExam}
                        />
                        <TextInput
                          className="h-[70px]"
                          required
                          name="examnumber"
                          label="Exam Number"
                          error={error["examnumber"]}
                          value={examnumber}
                          onChange={(e) => {
                            handleOnChange(e, "examnumber");
                          }}
                        />
                        <TextInput
                          className="h-[70px]"
                          required
                          type="file"
                          name="examresult"
                          label="Result"
                          error={error["examresult"]}
                          isSelect={examresult}
                          onChange={(e) => {
                            handleOnChange(e, "examresult");
                          }}
                        />
                        <TextInput
                          className=""
                          type="date"
                          required
                          name="examdate"
                          label="Exam Date"
                          error={error["examdate"]}
                          onChange={(e) => {
                            handleOnChange(e, "examdate");
                          }}
                        />
                      </div>
                    </BlockSectionComponent>

                    <BlockSectionComponent title="Jamb Result">
                      <div className="grid grid-cols-4 gap-4  mb-6 mt-2 ">
                        <TextInput
                          className="h-[70px] mt-6"
                          required
                          name="jambnumber"
                          label="Jamb Number"
                          error={error["jambnumber"]}
                          value={jambnumber}
                          onChange={(e) => {
                            handleOnChange(e, "jambnumber");
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
                            handleOnChange(e, "jambscore");
                          }}
                        />
                        <TextInput
                          className="h-[70px] mt-6"
                          required
                          type="file"
                          name="jambresult"
                          label="Result"
                          error={error["jambresult"]}
                          isSelect={jambresult}
                          onChange={(e) => {
                            handleOnChange(e, "jambresult");
                          }}
                        />
                        <TextInput
                          className=""
                          type="date"
                          required
                          name="jambdate"
                          label="Jamb Date"
                          error={error["jambdate"]}
                          onChange={(e) => {
                            handleOnChange(e, "jambdate");
                          }}
                        />
                      </div>
                    </BlockSectionComponent>
                    <BlockSectionComponent title="Other Exams">
                      {addInputFields?.map((field, index) => (
                        <div key={index}>
                          <div
                            key={index}
                            className="grid grid-cols-11 gap-4 mb-6 mt-4"
                          >
                            <div className="col-span-3">
                              <TextInput
                                className="h-[70px] "
                                required
                                type="select"
                                name="otherexamname"
                                error={
                                  error.addInputFields?.[index]?.otherexamname
                                }
                                label="Select Exam Type"
                                value={
                                  field.otherexamname < 1
                                    ? ""
                                    : field.otherexamname
                                }
                                onChange={(e) => {
                                  handleAddInputOnchangeForSelect(index, e);
                                }}
                                isSelect={true}
                                ayncs={ayncsExam}
                                options={examOptions}
                              />
                            </div>

                            <div className="col-span-2">
                              <TextInput
                                className="h-[70px] mt-6"
                                required
                                name="otherexamnumber"
                                label="Exam Number"
                                error={
                                  error.addInputFields?.[index]?.otherexamnumber
                                }
                                onChange={(e) => {
                                  handleAddInputOnchange(index, e);
                                }}
                              />
                            </div>

                            <div className="col-span-2">
                              <TextInput
                                className="h-[70px] mt-6"
                                required
                                type="file"
                                name="otherexamcertificate"
                                label="Exam Certificate"
                                error={
                                  error.addInputFields?.[index]
                                    ?.otherexamcertificate
                                }
                                isSelect={field.otherexamcertificate}
                                onChange={(e) => {
                                  handleAddInputOnchange(index, e);
                                }}
                              />
                            </div>

                            <div className="col-span-3">
                              <TextInput
                                type="date"
                                required
                                name="otherexamdate"
                                label="Exam Year"
                                error={
                                  error.addInputFields?.[index]?.otherexamdate
                                }
                                onChange={(e) => {
                                  handleOnChangeDate2(index, e);
                                }}
                              />
                            </div>

                            {renderActionButton(index)}
                          </div>
                        </div>
                      ))}
                    </BlockSectionComponent>
                  </div>
                )}
                {activeStep === 2 && (
                  <>
                    <BlockSectionComponent title="First Choice">
                      <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                        <TextInput
                          required
                          type="select"
                          name="faculty"
                          error={error["faculty"]}
                          label="Select Faculty"
                          value={faculty < 1 ? "" : faculty}
                          onChange={(e) => {
                            handleOnChange(e, "faculty");
                          }}
                          isSelect={true}
                          ayncs={ayncsFaculty}
                          options={facultyOption}
                        />
                        <TextInput
                          required
                          type="select"
                          name="department"
                          error={error["department"]}
                          label="Select Department"
                          value={department < 1 ? "" : department}
                          onChange={(e) => {
                            handleOnChange(e, "department");
                          }}
                          ayncs={ayncsDepartment}
                          isSelect={true}
                          options={departmentOption}
                        />
                      </div>
                    </BlockSectionComponent>

                    <BlockSectionComponent title="Second Choice">
                      <div className="grid grid-cols-2 gap-4  mb-6 mt-4 ml-2">
                        <TextInput
                          required
                          type="select"
                          name="morefaculty"
                          error={error["morefaculty"]}
                          label="Select More Faculty"
                          value={morefaculty < 1 ? "" : morefaculty}
                          onChange={(e) => {
                            handleOnChange(e, "morefaculty");
                          }}
                          isSelect={true}
                          ayncs={ayncsFaculty}
                          options={facultyOption}
                        />
                        <TextInput
                          required
                          type="select"
                          name="moredepartment"
                          error={error["moredepartment"]}
                          label="Select More Department"
                          value={moredepartment < 1 ? "" : moredepartment}
                          onChange={(e) => {
                            handleOnChange(e, "moredepartment");
                          }}
                          isSelect={true}
                          ayncs={ayncsMoreDepartment}
                          options={moreDepartmentOption}
                        />
                      </div>
                    </BlockSectionComponent>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <StudentEnrollmentDetailsComponent data={data} />
                  </>
                )}
              </Grid>
              <Grid item xs={0} className="w-[100%]">
                <div className="grid grid-cols-2 gap-4 w-[100%] ">
                  <div>
                    {activeStep > 0 && (
                      <ThemeProvider theme={theme}>
                        <Button
                          variant="contained"
                          color="danger"
                          onClick={handleBack}
                        >
                          Back
                        </Button>
                      </ThemeProvider>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      color={
                        activeStep === steps.length - 1 ? "success" : "primary"
                      }
                      onClick={
                        activeStep === steps.length - 1
                          ? initiatePayment
                          : handleNext
                      }
                      disabled={activeStep === steps.length + 1 || loader}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                      {loader ? (
                        <CircularProgress
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : null}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
      <AppModal modalIsOpen={openModal} dontClose={true}>
        <div className="w-[100%] h-[618px] flex justify-center items-center ">
          <div className="w-[50%] h-[50%] ">
            <div className="mb-[35px]  flex justify-center ">
              <CheckCircleIcon
                className="text-[green]"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
            <h1 className="text-[green] text-[26px]">
              Registration was successfull, we would send you feedback via your
              email address
            </h1>

            <div className="mt-[35px]  flex justify-center ">
              <Button
                variant="contained"
                color="success"
                onClick={closeAndRedirect}
              >
                Go to Website
              </Button>
            </div>
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default StudentEnrollmentPage;
