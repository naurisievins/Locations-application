import { useState } from "react";
import styles from "./AddForm.module.scss";
import axios from "axios";
import { Location } from "../../App";
import { validateLocation } from "../../utility/validateLocation";
import { toast } from "react-toastify";

type AddFormProps = {
  setShowAddForm: Function;
  locations: Location[];
  setLocations: Function;
};

const newLocationInitial = {
  name: "",
  latitude: "",
  longitude: "",
};

const IsValidInput = {
  valid: true,
  name: true,
  latitude: true,
  longitude: true,
};

export type NewLocation = {
  name: string;
  latitude: number | string;
  longitude: number | string;
};

export default function AddForm({
  setShowAddForm,
  locations,
  setLocations,
}: AddFormProps) {
  const [newLocation, setNewLocation] =
    useState<NewLocation>(newLocationInitial);
  const [isValidInput, setIsValidInput] = useState(IsValidInput); // To show error message for specific field

  const onFormSubmit = () => {
    const isValid = Object.values(validateLocation(newLocation)).every(
      (value) => value
    );

    if (!isValid) {
      const { name, latitude, longitude } = validateLocation(newLocation);
      setIsValidInput({
        name,
        latitude,
        longitude,
        valid: false,
      });

      return;
    }

    axios
      .post("http://localhost:3004/post-location", newLocation)
      .then(({ data }) => {
        setLocations([...locations, data]);
        toast.success(`New location with id ${data.id} added successfully.`);
      })
      .catch(() => toast.error("Couldn't add location."));

    setNewLocation(newLocationInitial);
    setShowAddForm(false);
  };

  return (
    <form
      className={styles.form_container}
      onSubmit={(e) => {
        e.preventDefault();
        onFormSubmit();
      }}
    >
      <label className={styles.form_label}>
        Name:
        <input
          type="text"
          placeholder="Name..."
          className={styles.input}
          required
          autoFocus
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
      </label>

      <label className={styles.form_label}>
        Latitude:
        <input
          type="number"
          placeholder="Longitude..."
          className={styles.input}
          required
          value={newLocation.latitude}
          onChange={(e) =>
            setNewLocation({ ...newLocation, latitude: Number(e.target.value) })
          }
        />
      </label>

      <label className={styles.form_label}>
        Longitude:
        <input
          type="number"
          placeholder="Longitude..."
          className={styles.input}
          required
          value={newLocation.longitude}
          onChange={(e) =>
            setNewLocation({
              ...newLocation,
              longitude: Number(e.target.value),
            })
          }
        />
      </label>

      <div className={styles.button_container}>
        <button className={styles.add_button}>Add</button>
        <button
          className={styles.cancel_btn}
          onClick={() => setShowAddForm(false)}
        >
          Cancel
        </button>
      </div>
      {!isValidInput.valid && (
        <div className={styles.invalid_input_msg}>
          {!isValidInput.name && (
            <span>
              <u>Invalid name</u>:<br /> Max length of 15.
            </span>
          )}
          {!isValidInput.latitude && (
            <span>
              <u>Invalid latitude</u>:<br /> Range [-90; 90], max length of 10
              (exc. '-' mark)
              <br />
              E.g. -12.3456789
            </span>
          )}
          {!isValidInput.longitude && (
            <span>
              <u>Invalid longitude</u>:<br /> Range [-180; 180], max length of
              10 (exc. '-' mark)
              <br />
              E.g. 123.456789
            </span>
          )}
        </div>
      )}
    </form>
  );
}
