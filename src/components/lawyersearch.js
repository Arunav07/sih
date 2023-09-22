import * as React from 'react';
import {Card, CardContent, CardMedia, Typography,  Button, CardActionArea, CardActions } from '@mui/material';

export default function LawyerCard({lawyer}) {
    /* 
    lawyer info
    lawyer.name
    lawyer.specialization
    lawyer.rating
    lawyer.city
    */
  return (
    <Card sx={{ maxWidth: 1200, padding: "0px 30px" }}>
      <CardActionArea sx={{display: "flex", gap: "0.5rem", alignItems: "center", }}>
        <CardMedia
          component="img"
          sx={{width: "8%", borderRadius: "50%"}}
          image={lawyer.image || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
          alt="lawyer"
        />
        <CardContent sx={{width: "90%"}}>
          <Typography gutterBottom variant="h5" component="div">
            {lawyer.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display: "flex", gap: "1rem"}}>
            {lawyer.specialization.map((specialization, key) => (
                <span style={{padding: "10px", backgroundColor: "GrayText", borderRadius: "10px", color: "aliceblue"}} key={key}>{specialization} </span>
            ))}
          </Typography>
            <Typography variant="body2" color="text.secondary">
                {lawyer.rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {lawyer.city}
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Profile
        </Button>
        <Button size="small" color="success">
          Contact Lawyer
        </Button>
      </CardActions>
    </Card>
  );
}
