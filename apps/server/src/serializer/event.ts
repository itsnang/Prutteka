import JSONAPISerializer from 'jsonapi-serializer';

const serializer = (topLevelLinks: {
  self: string | URL;
  prev?: string | URL | null;
  next?: string | URL | null;
}) => {
  return new JSONAPISerializer.Serializer('events', {
    keyForAttribute: 'underscore_case',
    topLevelLinks: {
      self: topLevelLinks.self,
      prev: topLevelLinks.prev,
      next: topLevelLinks.next,
    } as {},
    attributes: [
      'name',
      'type',
      'category',
      'image_src',
      'detail',
      'date_time',
      'location',
      'locations',
      'schedules',
      'join_methods',
      'created_by',
    ],
    created_by: {
      ref: 'id',
      included: true,
      attributes: ['username'],
    },
  });
};

export default serializer;
