import Breadcrumb from './Breadcrumb.jsx';

export default function PageHeader({ title, category, description, breadcrumbs }) {
  return <header className="page-header"><div className="container">
    <Breadcrumb items={breadcrumbs} />
    <p className="eyebrow">{category}</p>
    <h1>{title}</h1>
    {description && <p className="page-description">{description}</p>}
  </div></header>;
}
