import PropTypes from 'prop-types';
import css from './StartStop.module.css';

export function StartStop({onClick, isPlaying}) {

  return (
    <button className={css.button} onClick={onClick}>{isPlaying ? "STOP" : "START"}</button>
    )
}

StartStop.propTypes = {
    onClick: PropTypes.func,
}