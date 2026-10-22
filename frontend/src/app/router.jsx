import { createBrowserRouter } from 'react-router';
import SiteLayout from '../components/layout/SiteLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import PlannedPage from '../pages/PlannedPage.jsx';
import HelpPage from '../pages/bantuan/HelpPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import { routes } from '../config/routes.js';

export const router = createBrowserRouter([{
  element: <SiteLayout />,
  children: [
    ...routes.map((page) => ({
      id: page.id,
      path: page.path,
      handle: { title: page.title },
      element: page.view === 'home' ? <HomePage />
        : page.view === 'help' ? <HelpPage page={page} /> : <PlannedPage page={page} />,
    })),
    { path: '*', element: <NotFoundPage />, handle: { title: 'Halaman tidak ditemukan' } },
  ],
}]);
