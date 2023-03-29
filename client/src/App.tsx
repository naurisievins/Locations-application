import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Locations from "./components/Locations/Locations";
import Map from "./components/Map/Map";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export type Location = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get<Location[]>("http://localhost:3004/locations")
      .then(({ data }) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        setErrorMsg(err.message);
      });
  }, []);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Locations</h1>

      <div className={styles.container}>
        <Locations
          locations={locations}
          setLocations={setLocations}
          loading={loading}
          error={error}
          errorMsg={errorMsg}
        />
        <Map locations={locations} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
