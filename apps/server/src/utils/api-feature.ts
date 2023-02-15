import { Mode } from 'fs';
import { Model, Document, FilterQuery } from 'mongoose';

interface IQuery {
  [key: string]: string;
}

class QueryBuilder<
  T extends Document,
  M extends Model<T> | FilterQuery<T> = Model<T>
> {
  public model: M;
  private queryObj: IQuery;
  options: any;

  constructor(model: M, queryObj: IQuery) {
    this.model = model;
    this.queryObj = queryObj;
  }

  public filter(): this {
    const queryObj = { ...this.queryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj.filter ?? {});
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex)\b/g,
      (match) => `$${match}`
    );

    if ('find' in this.model) {
      const queryResult = this.model.find(
        JSON.parse(queryStr, (key, value) => {
          if (key === 'regex') {
            return new RegExp(value, 'i');
          }
          return value;
        }) as FilterQuery<T>
      );
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
        this.model = this.model.sort('-createdAt');
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

  public include(): this {
    if (this.queryObj.include) {
      const includes = this.queryObj.include.split(',').join(' ');
      if ('populate' in this.model) {
        this.model = this.model.populate(includes);
      }
    }

    return this;
  }

  public async execute(): Promise<M> {
    return this.model;
  }
}

export default QueryBuilder;
