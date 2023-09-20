import { Box, Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
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
        

      </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
