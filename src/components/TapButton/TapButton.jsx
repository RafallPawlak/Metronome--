import PropTypes from 'prop-types';
import css from './TapButton.module.css'

export function TapButton({tap}) {

  return (

      <button className={css.button} onClick={tap}>TAP</button>


    )
}

TapButton.propTypes = {
    tap: PropTypes.func
}
 