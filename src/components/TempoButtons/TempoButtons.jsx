import PropTypes from 'prop-types';
import css from './TempoButtons.module.css'

export function TempoButtons({tempoUp, tempoDown}) {

  return (
    <div className={css.container}>
      <button className={css.button} onClick={tempoUp}>+</button>
      <button className={css.button} onClick={tempoDown}>-</button>
    </div>
    )
}

TempoButtons.propTypes = {
  tempoUp: PropTypes.func,
  tempoDown: PropTypes.func,
}