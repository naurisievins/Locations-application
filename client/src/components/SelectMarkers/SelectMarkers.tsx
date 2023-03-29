import styles from "./SelectMarkers.module.scss";
import { Location } from "../../App";

type SelectMarkerProps = {
  setMarkerCount: Function;
  locations: Location[];
  initialMarkerCount: number;
};

export default function SelectMarkers({
  setMarkerCount,
  locations,
  initialMarkerCount
}: SelectMarkerProps) {
  return (
    <div className={styles.marker_select_container}>
      <span>Marker count on map:</span>
      <select
        className={styles.select}
        defaultValue={initialMarkerCount}
        onChange={(e) => setMarkerCount(Number(e.target.value))}
      >
        <option value={initialMarkerCount}>20 markers</option>
        <option value="50">50 markers</option>
        <option value="100">100 markers</option>
        <option value="500">500 markers</option>
        <option value="1000">All {locations.length} markers</option>
      </select>
    </div>
  );
}
