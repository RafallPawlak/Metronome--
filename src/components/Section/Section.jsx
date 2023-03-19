import PropTypes from 'prop-types';
import css from './Section.module.css';


export function Section({ title, current16thNote }) {
    let led = current16thNote ;
     
    return (
    <>
    <div className={css.section}>
        <h2 className={css.title}>{title}</h2>
            <div className={css.contaier_led}>
                <div className={css.led_red}>{led === 1 ? "●" : ""}</div>
                <div className={css.led_green}>{(led === 5 ||
                    led === 9 ||
                    led === 13 ||
                    led === 17 ||
                    led === 21 ||
                    led === 25 ||
                    led === 29 ||
                    led === 33) ? "●" : ""}
                </div>
            </div>
        </div>
    </>
    )
}   

Section.propTypes = {
    title: PropTypes.string.isRequired,
    current16thNote: PropTypes.number,
};