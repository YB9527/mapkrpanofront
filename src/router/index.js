import Vue from 'vue'
import Router from 'vue-router'
import UploadPano from '@/components/vr/UploadPano'
import PanoPage from '@/components/vr/PanoPage'
import Nav from '@/components/vr/Nav'
import Main from '@/components/vr/Main'

Vue.use(Router);

const routes =[
/*  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
  },*/
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
];
const router = new Router({
  routes
});
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router
