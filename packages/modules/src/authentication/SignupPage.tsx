import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, Typography } from 'ui';
import {
  AuthLayout,
  FacebookIcon,
  GoogleIcon,
  NextPageWithLayout,
} from './AuthLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
});

interface InitialValuesType {
  name: string;
  email: string;
  password: string;
}

export const SignupPage: NextPageWithLayout = () => {
  const handleSubmit = ({ email, password, name }: InitialValuesType) => {
    console.log(name, email, password);
  };

  return (
    <div className="w-auto">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          height="72"
          width="184"
          className="mx-auto"
        />
      </Link>

      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4 p-4">
            <InputField name="name" placeholder="Name" type="text" />
            <InputField name="email" placeholder="Email" type="email" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />

            <Button hasShadow type="submit">
              Create new account
            </Button>
            <div className="my-3 mx-2 border-b-2 border-gray-200" />
            <Button variant="secondary" as="link" href="/login" type="button">
              Login
            </Button>
            <Typography className="text-center">or</Typography>
            <Button
              variant="secondary"
              icon={GoogleIcon}
              className="gap-6"
              type="button"
            >
              Continue with Google
            </Button>
            <Button
              variant="secondary"
              icon={FacebookIcon}
              className="gap-6"
              type="button"
            >
              Continue with Facebook
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

SignupPage.getLayout = AuthLayout;
