import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//import route types
import PrivateRoute from "./types/PrivateRoute";
import RestrictedRoute from "./types/RestritedRoute";

//import component
import HomeComponent from "../components/home/index";
import RegisterComponent from "../components/register/index";
import LoginComponent from "../components/login/index";
import ContactComponent from "../components/contact/index";

//classes components
import ClassesComponent from "../components/classes/index";
import AddClass from "../components/classes/AddClass";
import ClassRoomComponent from "../components/classes/class/index";
import AddStudent from "../components/classes/class/AddStudent";
import Attendance from "../components/classes/class/Attendance";

//weekly attendance
import WeeklyAttendance from "../components/attendance/WeeklyAttendance";
import BarChart from "../components/attendance/AttendanceCharts/BarChart";

export default class MyRoutes extends Component {
  render() {
    return (
      <>
        <Routes location={this.props.location}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/contact" element={<ContactComponent />} />

          {/* Private route starts here */}

          <Route exact path="/classes" element={<PrivateRoute />}>
            <Route exact path="/classes" element={<ClassesComponent />} />
          </Route>

          <Route exact path="/class/:class_id" element={<PrivateRoute />}>
            <Route
              exact
              path="/class/:class_id"
              element={<ClassRoomComponent />}
            />
          </Route>

          <Route
            exact
            path="/attendance/class/:class_id"
            element={<PrivateRoute />}
          >
            <Route
              exact
              path="/attendance/class/:class_id"
              element={<Attendance />}
            />
          </Route>

          <Route
            exact
            path="/attendance/class/:class_id/weekly"
            element={<PrivateRoute />}
          >
            <Route
              exact
              path="/attendance/class/:class_id/weekly"
              element={<WeeklyAttendance />}
            />
          </Route>

          <Route
            exact
            path="/add_student/class/:class_id"
            element={<PrivateRoute />}
          >
            <Route
              exact
              path="/add_student/class/:class_id"
              element={<AddStudent />}
            />
          </Route>

          <Route exact path="/add_class" element={<PrivateRoute />}>
            <Route exact path="/add_class" element={<AddClass />} />
          </Route>

          <Route
            exact
            path="/attendance/class/:class_id/bar_chart"
            element={<PrivateRoute />}
          >
            <Route
              exact
              path="/attendance/class/:class_id/bar_chart"
              element={<BarChart />}
            />
          </Route>
          {/* Private route ends here */}

          {/*  resticted route*/}
          <Route path="/login" element={<RestrictedRoute />}>
            <Route path="/login" element={<LoginComponent />} />
          </Route>

          <Route path="/register" element={<RestrictedRoute />}>
            <Route path="/register" element={<RegisterComponent />} />
          </Route>
          {/*  resticted route end */}
        </Routes>
      </>
    );
  }
}
