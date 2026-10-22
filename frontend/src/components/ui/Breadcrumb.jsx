import { Link } from 'react-router';

export default function Breadcrumb({ items }) {
  return <nav className="breadcrumb" aria-label="Jejak navigasi">
    <ol>{items.map((item, index) => <li key={`${index}-${item.label}`}>
      {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
      {index === items.length - 1 ? <span aria-current="page">{item.label}</span>
        : item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
    </li>)}</ol>
  </nav>;
}
