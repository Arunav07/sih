import Head from "next/head";
import { useState, useCallback } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  Chip,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Grid
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { Theme, useTheme } from "@mui/material/styles";

const services = [
  "Civil Law",
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Property Law",
  "Labour and Employment Law",
  "Tax Law",
  "Intellectual Property Law",
  "Environmental Law",
  "Banking and Finance Law",
  "Immigration Law",
  "Consumer Law",
  "Real Estate Law",
  "Cybersecurity and Data Privacy Law",
  "Human Rights Law",
  "Administrative Law",
  "Constitutional Law",
  "Maritime and Admiralty Law",
  "Insurance Law",
  "Entertainment and Media Law",
  "Estate Planning and Probate Law",
  "Healthcare and Medical Law",
  "Sports Law",
  "International Trade Law",
  "Telecommunications Law",
  "Antitrust and Competition Law",
  "Energy Law",
  "Customs and Excise Law",
  "Agricultural Law",
  "Construction Law",
  "Data Privacy and Cybersecurity Law",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const theme = useTheme();
  const [serviceName, setServiceName] = useState([]);

  function getStyles(service, serviceName, theme) {
    return {
      fontWeight:
        serviceName.indexOf(service) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChangeChips = (event) => {
    const {
      target: { value },
    } = event;
    setServiceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };


  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      userType: "",
      lawyerType: [serviceName],
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if(values.userType === "lawyer") {
        await auth.signUp(values.email, values.name, values.password, values.userType, values.lawyerType);
        } else {
          await auth.signUp(values.email, values.name, values.password, values.userType);
        }
        router.push("/");
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Register | Chanakya</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} 
            sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" 
              variant="body2">
                Already have an account? &nbsp;
                <Link component={NextLink} 
                href="/auth/login" 
                underline="hover" 
                variant="subtitle2">
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate 
            onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <RadioGroup
                  row={true}
                  defaultValue="user"
                  name="userType"
                  label="User Type"
                  value={formik.values.userType}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!(formik.touched.userType && formik.errors.userType)}
                >
                  <FormControlLabel value="user" 
                  control={<Radio />} 
                  label="User" />
                  <FormControlLabel value="lawyer" 
                  control={<Radio />} 
                  label="Service Provider" />
                  <FormControlLabel value="other" 
                  control={<Radio />} 
                  label="Other" />
                </RadioGroup>
                
                {formik.values.userType === "lawyer" && (
                  <Grid container 
                  spacing={3}>
                    <Grid xs={12} 
                    md={6}>
                    <InputLabel id="servicesLabel">Services I Offer</InputLabel>
                <Select
                  labelId="servicesLabel"
                  id="lawyerType"
                  name="lawyerType"
                  multiple
                  style={{minWidth:"300px"}}
                  value={serviceName}
                  onChange={handleChangeChips}
                  input={<OutlinedInput id="select-multiple-chip" 
                  label="Selected Services" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} 
                        label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {services.map((service) => (
                    <MenuItem
                      key={service}
                      value={service}
                      style={getStyles(service, serviceName, theme)}
                    >
                      {service}
                    </MenuItem>
                  ))}
                </Select>
                    </Grid>
                  </Grid>
                  )}
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" 
                sx={{ mt: 3 }} 
                variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button fullWidth 
              size="large"
               sx={{ mt: 3 }} 
               type="submit" 
               variant="contained">
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
