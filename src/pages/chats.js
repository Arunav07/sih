import React, {useState, useEffect, useContext} from "react";
// import { Context } from "../context";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import {useRouter} from 'next/router';

import dynamic from 'next/dynamic';

const ChatEngine = dynamic(()=>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFromSocial = dynamic(()=>{
  import("react-chat-engine").then((module)=> module.MessageFromSocial)
})
export default function Chats() {
  const username = "Arunav" 
  const secret = "Password123!"
  const [showChat, setShowChat] = useState(false)

  useEffect(()=>{
    if(typeof document != null){
      setShowChat(true)
    }
  });

//   useEffect(()=>{
//     if (username.length ===0 || secret.length ===0){
//       router.push("/");
//     }
//   });

//   if(!showChat) return <div />;

  return <div className="background">
    <div className="shadow">
      <ChatEngine 
      height = '80vh'
      projectID = '36c1a7f4-750e-466f-ba8a-0bb4f26b0057'
      userName = {username}
      userSecret = {secret}
      
/> 
      
    </div>
  </div>;
}
Chats.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

