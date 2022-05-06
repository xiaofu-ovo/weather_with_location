import React from 'react';
import { createRoot } from 'react-dom/client';
import { Spin } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loadable from 'react-loadable';

const loadComponent = component =>
  Loadable({
    loader: component,
    loading: () => <Spin />,
  });

const Home = loadComponent(() =>
  import(/* webpackChunkName: "Home" */ './containers/Home'),
);
const ErrorPage = loadComponent(() =>
  import(/* webpackChunkName: "ErrorPage" */ './containers/ErrorPage'),
);

const routers = [
  {
    title: 'homepage',
    path: '/home',
    component: Home,
    children: [
      {
        title: '1',
        path: '/:id',
        component: ErrorPage,
      },
    ],
  },
];

const getAllRouter = (routers, prePath = '') => {
  let allRouter = [];
  if (!routers?.length) {
    return [];
  }
  routers.forEach(routerConf => {
    const { path, component: Component, children } = routerConf;
    const realPath = `${prePath}${path}`;
    const curRoute = (
      <Route key={realPath} path={realPath} element={<Component />} />
    );
    // 404页面
    const notFoundRoute = (
      <Route
        key={`${prePath}/*`}
        path={`${prePath}/*`}
        element={<ErrorPage />}
      />
    );
    allRouter = [
      ...allRouter,
      ...getAllRouter(children, realPath), // 如果存在子路由，需要在当前路由之前，否则无法匹配
      curRoute,
      notFoundRoute, // 如果是找不到的页面，就显示404
    ];
  });
  return allRouter;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>{getAllRouter(routers)}</Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(<App />);
