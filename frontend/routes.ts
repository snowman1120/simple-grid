import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/masterdetail/master-detail-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'master-detail-view',
    icon: '',
    title: '',
  },
  {
    path: 'master-detail',
    component: 'master-detail-view',
    icon: 'la la-columns',
    title: 'Master-Detail',
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
