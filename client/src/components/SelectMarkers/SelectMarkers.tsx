import styles from './SelectMarkers.module.scss';
import { Location } from '../../App';

type SelectMarkerProps = {
  setMarkerCount: Function
  locations: Location[]
}

export default function SelectMarkers({ setMarkerCount, locations }: SelectMarkerProps) {
  return (
    <div className={styles.marker_select_container}>
      <span>Marker count on map:</span>
      <select
        className={styles.select}
        defaultValue={20}
        onChange={(e) => setMarkerCount(Number(e.target.value))}
      >
        <option value='20'>20 markers</option>
        <option value='50'>50 markers</option>
        <option value='100'>100 markers</option>
        <option value='500'>500 markers</option>
        <option value='1000'>All {locations.length} markers</option>
      </select>
    </div>
  )
}
