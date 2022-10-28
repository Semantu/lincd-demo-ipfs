import './Spinner.scss';
import * as style from './Spinner.scss.json';
export default function Spinner({active = true}) {
  return (
    <div
      className={[style.spinner, active && style.active].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}
