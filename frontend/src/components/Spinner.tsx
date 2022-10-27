import './Spinner.scss';
export default function Spinner({active = true}) {
  return (
    <div
      className={['spinner', active && 'active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}
