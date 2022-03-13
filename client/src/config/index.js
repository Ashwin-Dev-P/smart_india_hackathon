const use_production_backend = false;
export function config() {
  var config_json = {
    THEME_COLORS: {
      PRIMARY: "#007bff",

      SECONDARY: "#fc3",
    },
  };

  if (process.env.NODE_ENV === "development" && use_production_backend) {
    config_json.backend_url = "https://attendance-sih.herokuapp.com";
    return config_json;
  } else if (process.env.NODE_ENV === "production") {
    config_json.backend_url = "";
    return config_json;
  } else if (process.env.NODE_ENV === "development") {
    config_json.backend_url = "http://localhost:5000";
    return config_json;
  }
}
