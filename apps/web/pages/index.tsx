import { Button, ButtonCategory, ButtonInterested, ButtonLink } from 'ui';

export default function Web() {
  return (
    <div className="my-20 mx-auto flex max-w-sm flex-col items-center justify-center space-y-8 px-4">
      <h1 className="text-2xl text-gray-900">Web</h1>
      <Button varaint="secondary">Login</Button>
      <ButtonCategory isActive>Recently</ButtonCategory>
      <ButtonLink href="https://www.facebook.com/" varaint="secondary">
        Link
      </ButtonLink>
      <ButtonInterested hasText />
    </div>
  );
}
