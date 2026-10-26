import { createBrowserRouter } from 'react-router';
import SiteLayout from '../components/layout/SiteLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import PlannedPage from '../pages/PlannedPage.jsx';
import HelpPage from '../pages/bantuan/HelpPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import OrganizationPage from '../pages/profil/OrganizationPage.jsx';
import { routes } from '../config/routes.js';

const pageViews = { home: HomePage, help: HelpPage, organization: OrganizationPage };

export const router = createBrowserRouter([{
  element: <SiteLayout />,
  children: [
    ...routes.map((page) => {
      const Page = pageViews[page.view] ?? PlannedPage;
      return {
        id: page.id,
        path: page.path,
        handle: { title: page.title },
        element: <Page page={page} />,
      };
    }),
    { path: '*', element: <NotFoundPage />, handle: { title: 'Halaman tidak ditemukan' } },
  ],
}]);
