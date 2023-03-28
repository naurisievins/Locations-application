import { useState } from "react";
import styles from "./App.module.scss";
import Locations from "./components/Locations/Locations";
import Map from "./components/Map/Map";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Location = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
};

function App() {
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Locations</h1>

      <div className={styles.container}>
        <Locations locations={locations} setLocations={setLocations} />
        <Map locations={locations} />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
