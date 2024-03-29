import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import store from './store/store'
import { fetchProfile } from './reducers/profileSlice';
import { fetchSkills } from './reducers/skillsSlice';
import { fetchProjects } from './reducers/projectsSlice';
import App from './App';

import MainProfile from './components/MainProfile'
import SkillsPage from './components/SkillsPage'
import EndorsementsPage from './components/EndorsementsPage'
import ProjectsPage from './components/ProjectsPage'
import LoginPage from './components/Login'
import Signup from './components/Signup'
import VideoFilesList from './components/VideoFilesList';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

store.dispatch(fetchProfile())
store.dispatch(fetchSkills())
store.dispatch(fetchProjects())

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: '',
      element: <MainProfile />
    },
    {
      path: 'skills',
      element: <SkillsPage />
    },
    {
      path: 'endorsements',
      element: <EndorsementsPage />
    },
    {
      path: 'projects',
      element: <ProjectsPage />
    },
    {
      path: 'authenticateuser/login',
      element: <LoginPage />
    },
    {
      path: 'authenticateuser/signup',
      element: <Signup />
    },
    {
      path: 'videos',
      element: <VideoFilesList />,
    },
  ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// web worker for progressive web app
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}


