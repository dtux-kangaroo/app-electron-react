
import Loading from 'components/loading';
import MainLayout  from 'layout/mainLayout';
// import SideLayout  from 'layout/SideLayout';
// import TopLayout  from 'layout/topLayout';
// const Home = Loadable({loader: () => import('../pages/home'),loading: Loading});
// const UserList = Loadable({loader: () => import('../pages/user/list'),loading: Loading});
// const Page404 = Loadable({loader: () => import('../pages/error/404'),loading: Loading});
// const Login=Loadable({loader:() => import('../pages/auth/login'),loading: Loading});
// const Register=Loadable({loader:() => import('../pages/auth/register'),loading: Loading});
import Project from 'pages/project';
import ProjectDetail from 'pages/project/Detail'
import Conf from 'pages/conf';
import Block from 'pages/block';
import Scaffold from 'pages/scaffold';
import Page404 from 'pages/error/404';
const routerConf = [
    {
      path:'/',
      layout: MainLayout,
      component: Project,
      children:[
        {
          path:'/detail',
          layout: MainLayout,
          component: ProjectDetail,
        }
      ]
    },
    {
      path:'/Block',
      layout: MainLayout,
      component: Block,
      children:[]
     },
    {
      path:'/scaffold',
      layout: MainLayout,
      component: Scaffold,
      children:[]
     },
     {
      path:'/conf',
      layout: MainLayout,
      component: Conf,
      children:[]
     },
    // {
    //   path:'/',
    //   redirect:'/project'
    // },
   {
    path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
