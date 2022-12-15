import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, Typography } from 'ui';
import { AuthLayout, NextPageWithLayout } from './AuthLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

interface InitialValuesType {
  email: string;
}

export const ForgotPasswordPage: NextPageWithLayout = () => {
  const router = useRouter();

  const handleSubmit = ({ email }: InitialValuesType) => {
    console.log(email);
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
            <Link href="/login">
              <ArrowLongLeftIcon className="h-6 w-6" />
            </Link>

            <Typography>Forgot password?</Typography>

            <InputField name="email" placeholder="Email" type="email" />

            <Button hasShadow type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ForgotPasswordPage.getLayout = AuthLayout;
