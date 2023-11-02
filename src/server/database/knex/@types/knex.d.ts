import { IUSer, ICategory, IModel, IStatus, ILocation, ICostCenter, IProduct, IDelivery, ILoan, IWriteOff, ILog, IPinCode } from '../../models';

declare module 'knex/types/tables' {
  // Aqui dentro a gente define as tipagens de todas as nossas entidades do banco
  interface Tables {
    cities: ICity;
  }
}
