import JSONAPISerializer from 'jsonapi-serializer';

interface SerializeOption {
  links: { self: string | URL };
  populate?: 'events';
}

const serializer = (option?: SerializeOption) => {
  let options = {
    keyForAttribute: 'underscore_case',
    topLevelLinks: {
      self: option?.links.self,
    } as {},
    attributes: [
      'display_name',
      'last_name',
      'first_name',
      'gender',
      'date_of_birth',
      'email',
      'image_src',
      'notifications',
      'following',
      'followers',
      'interested_events',
    ],
  };

  const eventsRelationship = {
    ref: 'id',
    included: true,
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

  if (option?.populate && option?.populate.split(' ').includes('events')) {
    options = Object.assign(options, { events: eventsRelationship });
  }

  return new JSONAPISerializer.Serializer('user', options);
};

export default serializer;
