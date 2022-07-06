import CertificateSchema from './schemas/CertificateSchema';
import ListCertificates from './pages/ListCertificates';
import CreateCertificate from './pages/CreateCertificate';

export default [
  {
    path: CertificateSchema.routes.list.path,
    name: CertificateSchema.routes.list.name,
    component: ListCertificates,
    meta: CertificateSchema.routes.list.meta,
  },
  {
    path: CertificateSchema.routes.create.path,
    name: CertificateSchema.routes.create.name,
    component: CreateCertificate,
    meta: CertificateSchema.routes.create.meta
  },
  {
    path: CertificateSchema.routes.show.path,
    name: CertificateSchema.routes.show.name,
    component: CreateCertificate,
    meta: CertificateSchema.routes.show.meta
  },
];