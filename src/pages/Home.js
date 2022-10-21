import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { creation } from "../utils/CreationHandler";
import { SpotifyHandler } from "../api/SpotifyHandler";
// import "../styles/Home.css";
import HomeNavBar from "../components/HomeNavBar";


import MatchingPart from "../components/MatchingPart";
import LoadingSpinner from "../components/LoadingSpinner";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function Home() {
  const [open, setOpen] = React.useState(false);
  const [userid, setUserId] = useState([]);
  const [propic, setProPic] = useState([]);
  const [name, setName] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const token = Cookies.get("spotifyAuthToken");
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState([]);


  useEffect(() => {
    if (token) {
      
     
      const coso = new SpotifyHandler(token);
      
      const setpropic = async () => {
        try{
          const data = await coso.getId();
          setUserId(data);
          const responseData = await coso.proPic();
          setProPic(responseData);
        }
        catch(error){
          console.error(error);
        }
        
      }
      const setUsername = async () => {
        try{
          const data = await coso.getUser();
          setName(data.username);
          console.log(data.username);
        }
        catch(error){
          console.error(error);
        }
        
      }
      setpropic();
      setUsername();
      
      


      coso.getRecommendations().then((res) => {
        setDb(res);
        setLoading(false);
      });
    }

    creation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
    <div className="Home">
      <HomeNavBar 
      img = {propic}
      name = {name}
      />
      {!loading ? <MatchingPart db={db} /> : <LoadingSpinner />}
      {/* <LoadingSpinner /> */}
      <Button onClick={handleToggle}>Show backdrop</Button>
      <Backdrop
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="paolo">
          <h1><a href="" onClick={handleToggle}>ndietro</a></h1>
        </div>
      </Backdrop>
    </div>
  );
}
export default Home;
