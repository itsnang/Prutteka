import JSONAPISerializer from 'jsonapi-serializer';

interface SerializeOption {
  links: {
    self: string | URL;
    prev?: string | URL | null;
    next?: string | URL | null;
  };
  populate?: 'organizer';
}

const serializer = (option: SerializeOption) => {
  let options = {
    keyForAttribute: 'underscore_case',
    topLevelLinks: {
      self: option.links.self,
      prev: option.links.prev,
      next: option.links.next,
    } as {},
    attributes: [
      'name',
      'type',
      'categories',
      'image_src',
      'detail',
      'date',
      'times',
      'locations',
      'schedules',
      'join_methods',
      'dynamic_contents',
      'organizer',
      'created_at',
    ],
  };

  const organizerRelationship = {
    ref: 'id',
    included: true,
    attributes: ['display_name'],
  };

  if (option?.populate && option?.populate.split(' ').includes('organizer')) {
    options = Object.assign(options, { organizer: organizerRelationship });
  }

  return new JSONAPISerializer.Serializer('events', options);
};

export default serializer;
