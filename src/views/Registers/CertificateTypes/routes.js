import CertificateTypeSchema from './schemas/CertificateTypeSchema';
import ListCertificateTypes from './pages/ListCertificateTypes';
import CreateCertificateType from './pages/CreateCertificateType';

export default [
  {
    path: CertificateTypeSchema.routes.list.path,
    name: CertificateTypeSchema.routes.list.name,
    component: ListCertificateTypes,
    meta: CertificateTypeSchema.routes.list.meta,
  },
  {
    path: CertificateTypeSchema.routes.create.path,
    name: CertificateTypeSchema.routes.create.name,
    component: CreateCertificateType,
    meta: CertificateTypeSchema.routes.create.meta
  },
  {
    path: CertificateTypeSchema.routes.show.path,
    name: CertificateTypeSchema.routes.show.name,
    component: CreateCertificateType,
    meta: CertificateTypeSchema.routes.show.meta
  },
];