import HomeSchema from './schemas/HomeSchema';
import Home from './pages/Home';

export default [
  {
    path: HomeSchema.routes.home.path,
    name: HomeSchema.routes.home.name,
    component: Home,
    meta: HomeSchema.routes.home.meta,
  },
]