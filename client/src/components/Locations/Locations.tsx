import { useEffect, useState } from "react";
import styles from "./Locations.module.scss";
import axios from "axios";
import { Location } from "../../App";
import AddForm from "../AddForm/AddForm";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";

type LocationsProps = {
  locations: Location[];
  setLocations: Function;
};

export default function Locations({ locations, setLocations }: LocationsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(locations.length / itemsPerPage - 1);

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

  const onDelete = (id: number) => {
    const confirmation = confirm(
      `Are you sure you want to delete item width id: ${id} from the list?`
    );

    if (confirmation) {
      axios.delete(`http://localhost:3004/delete-location/${id}`).then(() => {
        const filteredLocations = locations.filter(
          (location) => location.id !== id
        );
        setLocations(filteredLocations);
        toast.success(`Location with id ${id} deleted successfully.`);
      });
    }
  };

  return (
    <div className={styles.locations_container}>
      <div className={styles.container_header}>
        {showAddForm && (
          <AddForm
            setShowAddForm={setShowAddForm}
            locations={locations}
            setLocations={setLocations}
          />
        )}
        <span>
          List of {locations.length} locations.{" "}
          <button
            className={styles.add_location_btn}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Add
          </button>{" "}
          new location.
        </span>
      </div>
      <div className={styles.list_header}>
        <span className={styles.item_id}>ID</span>
        <span className={styles.item_name}>Name</span>
        <span className={styles.item_latitude}>Latitude</span>
        <span className={styles.item_longitude}>Longitude</span>
        <span className={styles.item_delete} />
      </div>
      {loading && <span className={styles.loading_msg}>Loading...</span>}
      {error && (
        <span className={styles.error_msg}>Error occured: {errorMsg}</span>
      )}
      {locations
        .slice(
          currentPage * itemsPerPage,
          currentPage * itemsPerPage + itemsPerPage
        )
        .map((location) => (
          <div className={styles.container_item} key={location.id}>
            <span className={styles.item_id}>{location.id}</span>
            <span className={styles.item_name}>{location.name}</span>
            <span className={styles.item_latitude}>{location.latitude}</span>
            <span className={styles.item_longitude}>{location.longitude}</span>

            <span className={styles.item_delete}>
              <div
                className={styles.delete_btn}
                onClick={() => onDelete(location.id)}
              >
                x
              </div>
            </span>
          </div>
        ))}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
