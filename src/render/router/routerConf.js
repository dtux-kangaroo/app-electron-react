
import Loading from 'components/loading';
import MainLayout  from 'layout/mainLayout';
import Project from 'pages/project';
import ProjectDetail from 'pages/project/Detail'
import Conf from 'pages/conf';
import Box from 'pages/box';
import Scaffold from 'pages/scaffold';
import Page404 from 'pages/error/404';
const routerConf = [
    {
      path:"/",
      redirect:'/project'
    },
    {
      path:'/project',
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
      path:'/box',
      layout: MainLayout,
      component: Box,
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
   {
    path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
