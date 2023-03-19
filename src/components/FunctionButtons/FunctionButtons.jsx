import PropTypes from 'prop-types';
import css from './FunctionButtons.module.css'

export function FunctionButtons({beatsPerMeasure, notes,  onClick}) {

  return (
    <div className={css.container}>
      <button className={css.button} onClick={beatsPerMeasure}>BEAT</button>
      <button className={css.button} onClick={notes}>NOTES</button>
      <button className={css.button} onClick={onClick}></button>
    </div>
    )
}

FunctionButtons.propTypes = {
  beatsPerMeasure: PropTypes.func,
  notes: PropTypes.func,
  onClick: PropTypes.func,
}