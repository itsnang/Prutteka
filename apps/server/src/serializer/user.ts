import JSONAPISerializer from 'jsonapi-serializer';

const serializer = (topLevelLinks: { self: string | URL }) => {
  return new JSONAPISerializer.Serializer('user', {
    keyForAttribute: 'underscore_case',
    topLevelLinks: {
      self: topLevelLinks.self,
    } as {},
    attributes: [
      'username',
      'email',
      'image_src',
      'notifications',
      'following',
      'followers',
      'events',
      'interested_events',
      'events',
    ],
  });
};

export default serializer;
