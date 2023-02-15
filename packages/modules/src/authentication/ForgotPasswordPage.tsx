import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, Typography, SeoMeta } from 'ui';
import { AuthLayout, NextPageWithLayout } from './AuthLayout';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

import { auth } from 'firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

const validationSchema = Yup.object({
  email: Yup.string().email('formik.email.invalid').required('formik.required'),
});

interface InitialValuesType {
  email: string;
}

export const ForgotPasswordPage: NextPageWithLayout = () => {
  const { t } = useTypeSafeTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async ({ email }: InitialValuesType) => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage(
        'A reset password email has been sent to the email address.\nPlease check your inbox (or spam folder).'
      );
    } catch (err) {
      console.log(err);
      setMessage(
        'A reset password email has been sent to the email address.\nPlease check your inbox (or spam folder).'
      );
    } finally {
      setIsLoading(false);
    }
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
            priority
          />
        </Link>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4 p-4">
              <Link href="/login" className="self-start">
                <ArrowLongLeftIcon className="h-6 w-6" />
              </Link>

              <Typography>{t('register-page.forgot-password')}</Typography>

              {message.length > 0 ? (
                <div className="bg-primary-light text-primary rounded-2xl p-4">
                  {message}
                </div>
              ) : null}

              <InputField
                name="email"
                placeholder={t('register-page.email') || ''}
                type="email"
              />

              <Button
                hasShadow
                type="submit"
                disabled={isLoading}
                className="transition-colors duration-200 disabled:bg-opacity-80"
                isLoading={isLoading}
              >
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
