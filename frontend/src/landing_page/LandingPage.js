import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Courses from './Courses';
import Contact from './Contact';
import LandingNavbar from './LandingNavbar';
import Footer from './Footer';
import { ROUTE_CONSTANTS } from '../constants/RouteConstants';

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        <Routes>
          <Route path={ROUTE_CONSTANTS.HOME} element={<HomePage />} />
          <Route path={ROUTE_CONSTANTS.ABOUT} element={<About />} />
          <Route path={ROUTE_CONSTANTS.COURSES} element={<Courses />} />
          <Route path={ROUTE_CONSTANTS.CONTACT} element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;