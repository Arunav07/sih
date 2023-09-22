'use client';
import { Box, Container, Grid, Typography, Divider, Link } from "@mui/material";
import Head from "next/head";
import {React, useState} from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

import { Document, Page as PageComponent, pdfjs } from 'react-pdf';
const url = "pdfjs-dist/build/pdf.worker.min.js"
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    url,
    import.meta.url,
  ).toString();
const ipcSections = [
    "General Explanations",
    "Punishments",
    "General Exceptions",
    "Abetment",
    "Criminal Conspiracy",
    "Offences against the state",
    "Offences against the Public Tranquility",
    "Contempts of Lawful; Authority of Public Servants",
    "False Evidence and Offence against Public Justice",
    "Offences affecting the Public Health, Safety, Convenience, Decency and Morals",
    "Offences relating to religion",
    "Offences affecting the Human Body",
    "Offences Against Property",
    "Offences Relating to Marriage",
    "Cruelty by Husband or Relatives of Husband",
    "Defamation",
    "Criminal intimidation, Insult and Annoyance",
    "Attempts to Commit Offences",
  ];


const Page = () => {

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    
  return (
    <>
      <Head>
        <title>IPC | Chanakya</title>
      </Head>
      <Box component="main"
        sx={{
        flexGrow: 1,
        py: 8
      }}>
      <Container maxWidth="xl">
        <Typography variant="h3" 
        component="h1" 
        gutterBottom>
            IPC
        </Typography>

      <Grid
        container 
        spacing={2}>
        {ipcSections.map((section, key) => (
            <Grid item 
            xs={4} 
            key={key}
            sx={{}}>
            <Link variant="body"
            underline="hover"
            href={`/ipc/${section}`}
            sx={{cursor: 'pointer', color: 'aliceblue', backgroundColor: "rgb(99, 102, 241)", borderRadius: "10px", padding: "10px 20px", fontWeight: "600"}}
            component="body"
            gutterBottom>
                {section}
            </Link>
            </Grid>
        ))}
      </Grid>
      <Box sx={{ width: '90%, margin: 20px auto' }}>
      <Document file="https://lddashboard.legislative.gov.in/sites/default/files/A1860-45.pdf" 
      onLoadSuccess={onDocumentLoadSuccess}>
        <PageComponent pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      </Box>
      </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
