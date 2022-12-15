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
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .min(8, 'Must be at least 8 characters')
    .max(60, 'Must be 60 characters or less')
    .required('Required'),
});

interface InitialValuesType {
  email: string;
  password: string;
}

export const LoginPage: NextPageWithLayout = () => {
  const handleSubmit = ({ email, password }: InitialValuesType) => {
    console.log(email, password);
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
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4 p-4">
            <InputField name="email" placeholder="Email" type="email" />
            <InputField
              name="password"
              placeholder="Password"
              type="password"
            />
            <Link
              href="/forgot-password"
              className="text-end text-gray-700 hover:underline"
            >
              Forgot password?
            </Link>
            <Button hasShadow type="submit">
              Login
            </Button>
            <div className="my-3 mx-2 border-b-2 border-gray-200" />
            <Button variant="secondary" as="link" href="/signup" type="button">
              Create new account
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

LoginPage.getLayout = AuthLayout;
