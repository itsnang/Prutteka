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
      prev: topLevelLinks.prev ?? null,
      next: topLevelLinks.next ?? null,
    } as {},
    attributes: [
      'name',
      'type',
      'category',
      'image_src',
      'date_time',
      'locations',
      'created_by',
    ],
    typeForAttribute: () => {
      return 'user';
    },
    created_by: {
      ref: 'id',
      included: true,
      attributes: ['username', 'email', 'events', 'notifications'],
    },
  });
};

export default serializer;
