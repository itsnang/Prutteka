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
import { useTokenStore } from '../auth/useTokenStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { auth } from 'firebase-config';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';

const validationSchema = Yup.object({
  email: Yup.string().email('formik.email.invalid').required('formik.required'),
  password: Yup.string()
    .min(8, 'formik.password.min')
    .max(60, 'formik.password.max')
    .required('formik.required'),
});

interface InitialValuesType {
  email: string;
  password: string;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const LoginPage: NextPageWithLayout = () => {
  const { t } = useTypeSafeTranslation();
  const { push } = useRouter();
  const hasToken = useTokenStore((s) => !!(s.accessToken && s.refreshToken));
  const setTokens = useTokenStore((state) => state.setTokens);

  const handleSubmit = async ({ email, password }: InitialValuesType) => {
    try {
      console.log(email, password);

      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);

      const token = {
        accessToken: 'ACCESS',
        refreshToken: auth.currentUser?.refreshToken || '',
      };
      setTokens(token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (hasToken) {
      push('/');
    }
  }, [push, hasToken]);

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
            priority
          />
        </Link>

        <Formik
          initialValues={{ email: '', password: '', confirmCode: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="relative flex flex-col gap-4 overflow-x-hidden p-4">
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
                className="self-end text-end text-gray-700 hover:underline"
              >
                {t('register-page.forgot-password')}
              </Link>
              <Button id="sign-in-button" hasShadow type="submit">
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
                onClick={async () => {
                  try {
                    await signInWithPopup(auth, googleProvider);
                  } catch (error) {}
                }}
              >
                {t('register-page.continue-with-google')}
              </Button>
              <Button
                variant="secondary"
                icon={FacebookIcon}
                className="gap-6"
                type="button"
                onClick={async () => {
                  try {
                    await signInWithPopup(auth, facebookProvider);
                  } catch (error) {}
                }}
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
