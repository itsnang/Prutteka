import { Mode } from 'fs';
import { Model, Document, FilterQuery } from 'mongoose';

interface IQuery {
  [key: string]: any;
}

class QueryBuilder<
  T extends Document,
  M extends Model<T> | FilterQuery<T> = Model<T>
> {
  public model: M;
  private queryObj: IQuery;

  constructor(model: M, queryObj: IQuery) {
    this.model = model;
    this.queryObj = queryObj;
  }

  public filter(): this {
    const queryObj = { ...this.queryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = {} as any;

    const allowSearchField = ['name.en', 'name.kh'];

    if (this.queryObj.search) {
      const searchRegex = new RegExp(this.queryObj.search, 'i');

      const searchFields = allowSearchField.map((field) => ({
        [field]: searchRegex,
      }));

      query.$or = searchFields;
    }

    if (this.queryObj.filter) {
      let filterQuery = JSON.stringify(queryObj.filter ?? {});
      filterQuery = filterQuery.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      query = Object.assign(query, JSON.parse(filterQuery));

      if (this.queryObj.filter.category) {
        const categoryQuery = this.queryObj.filter.category;

        switch (categoryQuery) {
          case 'all':
            delete query.category;
            break;
          case 'recently-added':
            delete query.category;
            if ('sort' in this.model) {
              this.model = this.model.sort('-created_at');
            }
            break;
          default:
            query.category = this.queryObj.filter.category;
        }
      }
    }

    if ('find' in this.model) {
      const queryResult = this.model.find(query);
      this.model = queryResult as M;
    }

    return this;
  }

  public sort(): this {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ');
      if ('sort' in this.model) {
        this.model = this.model.sort(sortBy);
      }
    } else {
      if ('sort' in this.model) {
        this.model = this.model.sort('-created_at');
      }
    }

    return this;
  }

  public limitFields(): this {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ');
      if ('select' in this.model) {
        this.model = this.model.select(fields);
      }
    } else {
      if ('select' in this.model) {
        this.model = this.model.select('-__v');
      }
    }

    return this;
  }

  public paginate(): this {
    const page = this.queryObj.page as unknown as {
      offset: string;
      limit: string;
    };
    // const page = this.queryObj.page?.offset ? +this.queryObj.page?.offset : 1;
    const offset = page?.offset ? +page?.offset : 0;
    const limit = page?.limit ? +page?.limit : 10;
    const skip = offset * limit;

    if ('skip' in this.model && 'limit' in this.model) {
      this.model = this.model.skip(skip).limit(limit) as M;
    }

    return this;
  }

  public async execute(): Promise<M> {
    return this.model;
  }
}

export default QueryBuilder;
