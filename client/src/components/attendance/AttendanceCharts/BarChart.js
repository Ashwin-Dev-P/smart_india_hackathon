import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Bar } from "react-chartjs-2";

//WARNING
//The below import is necessary, even when it is unused
import Chart from "chart.js/auto";

//import redux
import { connect } from "react-redux";

//action
import getStudentsAction from "../../../redux/actions/classes/class/getStudents.action";
import Loading from "../../shared/Loading";

const mapDispatchToProps = (dispatch) => ({
  getStudentsAction: (form_data) => {
    dispatch(getStudentsAction(form_data));
  },
});

//To get labels for barchart
function getStudentsNameLabel(students_list) {
  var students_name_label_array = [];
  for (var index = 0; index < students_list.length; index++) {
    const student = students_list[index];

    const name = student.name;
    const first_name = name.first_name;
    const last_name = name.last_name;

    var full_name;
    if (last_name) {
      full_name = first_name + " " + last_name;
    } else {
      full_name = first_name;
    }

    students_name_label_array.push(full_name);
  }

  return students_name_label_array;
}

//To get data for bar chart
function getNumberOfDaysPresentDataArray(students_list) {
  var no_of_days_present_array = [];
  for (var index = 0; index < students_list.length; index++) {
    const student = students_list[index];
    const days_present = student.days_present.length;

    no_of_days_present_array.push(days_present);
  }
  return no_of_days_present_array;
}

function BarChart(props) {
  //get url params
  const { class_id } = useParams();

  const getStudentsAction = props.getStudentsAction;

  useEffect(() => {
    const form_data = {
      class_id: class_id,
    };
    getStudentsAction(form_data);
  }, [getStudentsAction, class_id]);

  //props
  const { loading, error, error_message } = props.getStudents.status;

  var students_list = [];
  if (!loading && !error) {
    students_list = props.getStudents.students_list;
  }

  const students_name_label_array = getStudentsNameLabel(students_list);
  const no_of_days_present_array =
    getNumberOfDaysPresentDataArray(students_list);

  const labels = students_name_label_array;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "No. of days present",
        data: no_of_days_present_array,
        backgroundColor: "#0d6efd",
        borderWidth: 1,
      },
    ],
  };

  /*
  const options = {
    offsetGridLines: false,
    drawTicks: false,

    legend: {
      display: true,

      labels: {
        usePointStyle: true,
      },
    },
    responsive: true,

    //error target: Makes the bar chart grow
    maintainAspectRatio: false,
    scales: {
      yAxes: {
        gridLines: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          min: 0, // it is for ignoring negative step.
          beginAtZero: true,
          callback: function (value) {
            if (Math.floor(value) === value) {
              return value;
            }
          },
        },
      },
    },
  };
  */

  return (
    <div>
      <div className="row">
        <div className="col-lg-1"></div>
        <div className="col-xs-12 col-lg-10">
          {loading === true ? (
            <div className="text-center">
              <Loading />
            </div>
          ) : (
            <>
              {error && error_message ? (
                <div className="error-message text-center">
                  {error_message}{" "}
                </div>
              ) : (
                <>
                  <div className="my-margin">
                    <Bar data={data} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    getStudents: state.getStudents,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
