import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, Typography, SeoMeta } from 'ui';
import { AuthLayout, NextPageWithLayout } from './AuthLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

const validationSchema = Yup.object({
  email: Yup.string().email('formik.email.invalid').required('formik.required'),
});

interface InitialValuesType {
  email: string;
}

export const ForgotPasswordPage: NextPageWithLayout = () => {
  const { t } = useTypeSafeTranslation();
  const router = useRouter();

  const handleSubmit = ({ email }: InitialValuesType) => {
    console.log(email);
  };

  return (
    <>
      <SeoMeta title="Forget Password - Prutteka" description="" />
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

              <Typography>{t('register-page.forgot-password')}</Typography>

              <InputField
                name="email"
                placeholder={t('register-page.email') || ''}
                type="email"
              />

              <Button hasShadow type="submit">
                {t('register-page.submit')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

ForgotPasswordPage.getLayout = AuthLayout;
