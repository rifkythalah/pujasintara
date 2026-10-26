import { Link, NavLink } from 'react-router';
import PageHeader from '../../components/ui/PageHeader.jsx';
import Icon from '../../components/ui/Icon.jsx';
import { getRoute, routes } from '../../config/routes.js';
import { organizationPreview } from '../../features/profil/data/organization.mock.js';
import '../../features/profil/organization.css';

export default function OrganizationPage({ page }) {
  const profilePages = routes.filter((route) => route.groupId === page.groupId);
  const nextPage = getRoute('tugas-dan-fungsi');

  return <>
    <PageHeader title={page.title} category={page.category} description={page.summary} breadcrumbs={page.breadcrumbs} />
    <div className="container inner-page-grid organization-page">
      <div className="organization-content">
        <div className="organization-notice">
          <span className="page-status">{organizationPreview.statusLabel}</span>
          <p>{organizationPreview.notice}</p>
        </div>
        {organizationPreview.sections.map((section) => <section className="page-card organization-section" key={section.id} aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <div className="organization-empty" data-content-status={section.status}>
            <Icon name="book" />
            <h3>{section.emptyTitle}</h3>
            <p>{section.description}</p>
          </div>
        </section>)}
        <div className="organization-next">
          <span>Profil berikutnya</span>
          <Link className="page-text-link" to={nextPage.path}>{nextPage.title}<Icon name="arrow" /></Link>
        </div>
      </div>
      <aside className="page-sidebar">
        <nav className="page-card organization-nav" aria-labelledby="profile-nav-title">
          <h2 id="profile-nav-title">Jelajahi Profil</h2>
          <ul className="related-links">{profilePages.map((route) => <li key={route.id}>
            <NavLink to={route.path} end>{route.title}<Icon name="arrow" /></NavLink>
          </li>)}</ul>
        </nav>
      </aside>
    </div>
  </>;
}
