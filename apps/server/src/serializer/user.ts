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
      'notifications',
      'image_src',
      'interested_events',
    ],
  });
};

export default serializer;
