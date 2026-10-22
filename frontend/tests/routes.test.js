import test from 'node:test';
import assert from 'node:assert/strict';
import { navigation } from '../src/config/navigation.js';
import { routes, getRoute, isNavigationActive } from '../src/config/routes.js';

test('every navigable menu has exactly one registered route and unique URL', () => {
  const ids = new Set();
  const routeIds = new Set();
  function walk(items) {
    for (const item of items) {
      assert.ok(!ids.has(item.id), `Duplicate navigation ID ${item.id}`);
      ids.add(item.id);
      if (item.kind === 'internal' || item.routeId) {
        assert.ok(item.routeId);
        const route = getRoute(item.routeId);
        assert.equal(route.title, item.label);
        assert.ok(route.path.startsWith('/') && !route.path.includes('#'));
        routeIds.add(item.routeId);
      }
      if (item.kind === 'group' && item.children) walk(item.children);
    }
  }
  walk(navigation);
  assert.equal(routeIds.size, routes.length);
  assert.equal(new Set(routes.map((route) => route.path)).size, routes.length);
});

test('Katalog and Direktori have pages but no invented submenu destinations', () => {
  const layanan = navigation.find((item) => item.id === 'layanan');
  for (const id of ['katalog', 'direktori']) {
    const item = layanan.children.find((child) => child.id === id);
    assert.equal(item.kind, 'group');
    assert.equal(item.children, null);
    assert.equal(getRoute(item.routeId).path, `/layanan/${id}`);
    assert.equal(getRoute(item.routeId).topics, null);
    assert.ok(!routes.some((route) => route.path.startsWith(`/layanan/${id}/`)));
  }
});

test('Bantuan is a direct page; FAQ is not a separate route', () => {
  const help = navigation.find((item) => item.id === 'bantuan');
  assert.equal(help.kind, 'internal');
  assert.equal(help.children, undefined);
  assert.equal(getRoute(help.routeId).path, '/bantuan');
  assert.ok(!routes.some((route) => route.path === '/bantuan/faq'));
});

test('group breadcrumbs are not fabricated links and active state is exact', () => {
  const route = getRoute('struktur-organisasi');
  assert.deepEqual(route.breadcrumbs, [
    { label: 'Beranda', to: '/' }, { label: 'Profil', to: undefined }, { label: 'Struktur Organisasi' },
  ]);
  const profil = navigation.find((item) => item.id === 'profil');
  assert.ok(isNavigationActive(profil, route.path));
  assert.ok(isNavigationActive(profil, `${route.path}/`));
  assert.equal(isNavigationActive(profil, `${route.path}/unknown`), false);
  assert.equal(isNavigationActive(navigation[0], route.path), false);
  for (const page of routes.filter((item) => item.id !== 'home')) {
    assert.equal(page.breadcrumbs.at(-1).label, page.title);
    assert.equal(page.breadcrumbs.at(-1).to, undefined);
    for (const crumb of page.breadcrumbs) {
      if (crumb.to) assert.ok(routes.some((item) => item.path === crumb.to));
    }
  }
});
