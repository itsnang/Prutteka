import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, SeoMeta, Typography } from 'ui';
import {
  AuthLayout,
  FacebookIcon,
  GoogleIcon,
  NextPageWithLayout,
} from './AuthLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

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
  const { t } = useTypeSafeTranslation();
  const handleSubmit = ({ email, password }: InitialValuesType) => {
    console.log(email, password);
  };

  return (
    <>
      <SeoMeta title="Login - Prutteka" description="" />
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
              <InputField
                name="email"
                placeholder={t('register-page.email') || ''}
                type="email"
              />
              <InputField
                name="password"
                placeholder={t('register-page.password') || ''}
                type="password"
              />
              <Link
                href="/forgot-password"
                className="text-end text-gray-700 hover:underline"
              >
                {t('register-page.forgot-password')}
              </Link>
              <Button hasShadow type="submit">
                {t('register-page.login')}
              </Button>
              <div className="my-3 mx-2 border-b-2 border-gray-200" />
              <Button
                variant="secondary"
                as="link"
                href="/register"
                type="button"
              >
                {t('register-page.create-new-account')}
              </Button>
              <Typography className="text-center">or</Typography>
              <Button
                variant="secondary"
                icon={GoogleIcon}
                className="gap-6"
                type="button"
              >
                {t('register-page.continue-with-google')}
              </Button>
              <Button
                variant="secondary"
                icon={FacebookIcon}
                className="gap-6"
                type="button"
              >
                {t('register-page.continue-with-facebook')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

LoginPage.getLayout = AuthLayout;
