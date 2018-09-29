
import Loading from 'components/loading';
import MainLayout  from 'layout/mainLayout';
// import SideLayout  from 'layout/SideLayout';
// import TopLayout  from 'layout/topLayout';
// const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
// const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
// const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
// const Login=Loadable({loader:() => import('../pages/auth/login'),loading: Loading});
// const Register=Loadable({loader:() => import('../pages/auth/register'),loading: Loading});
import UserList from 'pages/user/list';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login';
import Register from 'pages/auth/register';
const routerConf = [
  {
    path: '/',
    layout: MainLayout,
    component: UserList
  },
  {
   path:'/login',
   layout: null,
   component: Login,
  },
  {
    path:'/register',
    layout: null,
    component: Register,
   },
  {
    path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
