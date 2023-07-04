import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { useStore } from './stores/store';
import { useScrollPosition } from './common/util/hooks';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import InitialLoader from './components/InitialLoader';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import FeaturedShows from './components/FeatureShows/FeatureShows';
import CurrentShows from './components/CurrentShows/CurrentShows';
import Beggin from './components/Beggin/Beggin';

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();
  const scroll = useScrollPosition();
  const scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return (
    <InitialLoader adding={"App"}/>
  );
  
  return (
    <div className="App">
      <ScrollRestoration />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <Navbar />
      {
        location.pathname === '/' ? (
          <HomePage />
          
        ) : (
          <Outlet />
        )
      }
      <IconButton
          sx={{
              display: scroll > 50 ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              bottom: "2rem",
              right: { xs: "1rem", sm: "1rem", md: "1.1rem", lg: "1.3rem", xl: "1.5rem" },
              bgcolor: "white",
              color: "black",
              "&:hover": {
                  bgcolor: "black",
                  color: "white",
              },
              width: { xs: "2rem", sm: "2.5rem", md: "2.5rem", lg: "2.5rem", xl: "2.5rem" },
              height: { xs: "2rem", sm: "2.5rem", md: "2.5rem", lg: "2.5rem", xl: "2.5rem" },
              zIndex: 100,
              border: "1px solid black",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
          <ArrowUpwardIcon 
            sx={{
              width: { xs: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
              height: { xs: "1.5rem", sm: "2rem", md: "2rem", lg: "2rem", xl: "2rem" },
            }}
          />
      </IconButton>
      <Footer/>

    </div>
  );
}

export default observer(App);
