import PropTypes from 'prop-types';
import css from './Display.module.css';

export function Display({ bpm, beats, beatAcctual, noteName }) {

  return (
    <>
      <div className={css.display}>
        <div className={css.beat}>
          <div className={css.beat_acctual}>{beatAcctual}</div>
          <div className={css.beat_value}>{beats}</div>
        </div>
        <div className={css.bpm_notes}>
          <div className={css.bpm}>{bpm} BPM</div>
          <div className={css.notes}>{noteName}</div>
         </div> 
      </div>
    </>
    )
}

Display.propTypes = {
  bpm: PropTypes.string.isRequired,
  beats: PropTypes.number,
  beatAcctual: PropTypes.number,
  noteName: PropTypes.string,
    // sound: PropTypes.string,
}