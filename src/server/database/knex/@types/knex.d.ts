import { IUSer, ICategory, IModel, IStatus, ILocation, ICostCenter, IProduct, IDelivery, ILoan, IWriteOff, ILog, IPinCode, IPermission, IFavorite } from '../../models';

declare module 'knex/types/tables' {
  // Aqui dentro a gente define as tipagens de todas as nossas entidades do banco
  interface Tables {
    cities: ICity;
    statuses: IStatus,
    permission: IPermission,
    users: IUSer,
    favorites: IFavorite
  }
}
