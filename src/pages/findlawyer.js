import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { states_cities } from "src/information/states_cities";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LawyerCard from "src/components/lawyersearch";
import { lawyers } from "src/information/lawyers";
const Page = () => {
  var api_key = "e7108a54f1074c53b95285e985d6a325";
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState("");
  const [values, setValues] = useState({
    category: "",
    service: "",
    city: "",
    state: "",
  });
  // Accessing User's Location
  useEffect(() => {
    if (window.navigator.geolocation) {
      // Geolocation available
      window.navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  //accessing user's address
  useEffect(() => {
    const url = `https://geocode.maps.co/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
    var query = coordinates.latitude + "," + coordinates.longitude;
    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      api_key +
      "&q=" +
      encodeURIComponent(query) +
      "&pretty=1" +
      "&no_annotations=1";
    var request = new XMLHttpRequest();
    fetch(request_url)
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.results[0].formatted);
      });
  }, [coordinates, api_key, address]);

  // Filters
  const sections = [
    "Personal / Family",
    "Criminal / Property",
    "Corporate / Business",
    "Civil / Debt",
    "Others",
  ];
  const legalOptions = {
    "Personal / Family": [
      "Divorce",
      "Family Dispute",
      "Child Custody",
      "Muslim Law",
      "Medical Negligence",
      "Motor Accident",
    ],
    "Criminal / Property": [
      "Criminal",
      "Property",
      "Landlord / Tenant",
      "Cyber Crime",
      "Wills / Trusts",
      "Labour & Service",
    ],
    "Corporate / Business": [
      "Corporate Law",
      "Arbitration",
      "Trademark & Copyright",
      "Customs & Central Excise",
      "Startup",
      "Banking / Finance",
      "GST",
      "Corporate",
      "Tax",
    ],
    "Civil / Debt": ["Documentation", "Consumer Court", "Civil", "Cheque Bounce", "Recovery"],
    Others: [
      "Armed Forces Tribunal",
      "Supreme Court",
      "Insurance",
      "Immigration",
      "International Law",
    ],
  };
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const lawyersList = lawyers;
  const state_cities = states_cities;
  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const [searched, setSearched] = useState(false);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setSearched(true);
    alert("You have searched for a lawyer in " + values.city + ", " + values.state+ " for the category " + values.category + " and service " + values.service);
    // values.category = "";
    // values.service = "";
    // values.city = "";
    // values.state = "";
  }, [searched, values]);

  return (
    <>
      <Head>
        <title>Account | Chanakya</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography sx={{alignItems: "center", display: "flex", gap: "0.5rem"}} 
              variant="h4">Find a Lawyer <PersonSearchIcon fontSize="large"/></Typography>
            </div>
            <Container maxWidth="lg">
              <Grid container
               spacing={3}>
                <Grid item 
                xs={7}>
                  <InputLabel id="categoryLabel">Select a Category</InputLabel>
                  <Select
                    fullWidth
                    id="category"
                    label="Select Category"
                    name="category"
                    onChange={handleChange}
                    required
                    value={values.category ? values.category : ""}
                  >
                    {sections.map((section, key) => (
                      <MenuItem key={key} value={section} style={{ cursor: "pointer" }}>
                        {section}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {values.category != "" && (
                  <Grid item xs={4}>
                    <InputLabel id="servicesLabel">Category {values.category}</InputLabel>
                    <Select
                      fullWidth
                      labelId="servicesLabel"
                      id="service"
                      value={values.service ? values.service : ""}
                      onChange={handleChange}
                      name="service"
                    >
                      {legalOptions[values.category]?.map((service) => (
                        <MenuItem key={service} value={service} style={{ cursor: "pointer" }}>
                          {service}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                )}
                <Grid item 
                xs={7}>
                <InputLabel id="stateLabel">Select State</InputLabel>
                <Select
                  fullWidth
                  id="state"
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  value={values.state ? values.state : ""}
                >
                  {states.map((state, key) => (
                    <MenuItem key={key} value={state} style={{ cursor: "pointer" }}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {values.state != "" && (
                <Grid item xs={4}>
                  <InputLabel id="cityLabel">Select City</InputLabel>
                  <Select
                    fullWidth
                    labelId="cityLabel"
                    id="city"
                    value={values.city ? values.city : ""}
                    onChange={handleChange}
                    name="city"
                  >
                    {state_cities[values.state]?.map((city) => (
                      <MenuItem key={city} value={city} style={{ cursor: "pointer" }}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              <Grid item 
              xs={12}>
                <Button variant="contained" 
                color="primary" 
                onClick={handleSubmit}>
                  Search Lawyer
                </Button>
              </Grid>
              </Grid>  
            </Container>
          </Stack>
        </Container>
        {/* After a user submits the search */}
        {searched && (
          <Container maxWidth="lg" 
          sx={{marginTop: "30px", padding: "10px"}}>
          <Grid container 
          spacing={3}>
            <Grid item 
            xs={12}>
              <Typography variant="h4">Lawyers</Typography>
            </Grid>
            {lawyersList.map((lawyer, key) => 
             {
              if(lawyer.city == values.city || lawyer.state == values.state || lawyer.specialization.includes(values.service) || lawyer.specialization.includes(values.category))
              return (
                <Grid item 
                xs={12} 
                key={key}>
                  <LawyerCard lawyer={lawyer}/>
                </Grid>
            )})}

          </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
