import Image from 'next/image';
import Link from 'next/link';
import { Button, InputField, Message, SeoMeta, Typography } from 'ui';
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { auth } from 'firebase-config';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { AuthError } from '@firebase/auth';

import axios from 'axios';
import { useAuth } from '../auth/useAuth';
import { APIResponseUser } from 'custom-types';
import { useProvideAuth } from '../auth/useProvideAuth';

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
  const setToken = useTokenStore((state) => state.setToken);
  const { isLoggedIn } = useProvideAuth();
  const setUser = useAuth((state) => state.setUser);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailPasswordLogin = async ({
    email,
    password,
  }: InitialValuesType) => {
    try {
      setIsSubmiting(true);
      const firebaseReponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await firebaseReponse.user.getIdToken();
      setToken(token);

      const response = await axios.post(
        '/login',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const user = response.data as APIResponseUser;
      setUser(user.data.id, user.data.attributes);
    } catch (error) {
      console.log(error);
      const errorCode = (error as AuthError).code;

      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/wrong-password'
      ) {
        return setErrorMessage('Email or password is incorrect');
      }
      setErrorMessage('Something went wrong');
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmiting(true);
      const fbResponse = await signInWithPopup(auth, googleProvider);
      const token = await fbResponse.user.getIdToken();
      const serverResponse = await axios.post(
        '/login',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const user = serverResponse.data as APIResponseUser;
      console.log(user.data);

      setUser(user.data.id, user.data.attributes);
    } catch (error) {
    } finally {
      setIsSubmiting(false);
    }
  };

  // const handleFacebookSignIn = async () => {
  //   try {
  //     setIsSubmiting(true);
  //     const response = await signInWithPopup(auth, facebookProvider);
  //     const token = await response.user.getIdToken();
  //     setToken(token);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmiting(false);
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn) {
      push('/');
    }
  }, [push, isLoggedIn]);

  return (
    <>
      <SeoMeta
        title="Login | ព្រឹត្តិការណ៍ - Prutteka"
        description="Experience the ultimate solution for events, venues, and attractions in Cambodia with ព្រឹត្តិការណ៍ - Prutteka. Revel in the our system, offering dynamic content to provide more information for your events, whether it is sports, concerts or conventions."
      />
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
          onSubmit={handleEmailPasswordLogin}
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
              {!!errorMessage ? (
                <Message variant="error">{errorMessage}</Message>
              ) : null}
              <Button
                id="sign-in-button"
                hasShadow
                type="submit"
                isLoading={isSubmiting}
              >
                {t('register-page.login')}
              </Button>
              <div className="my-3 mx-2 border-b-2 border-gray-200" />
              <Button
                variant="secondary"
                as="link"
                href="/register"
                type="button"
                isLoading={isSubmiting}
              >
                {t('register-page.create-new-account')}
              </Button>
              <Typography className="text-center">or</Typography>
              <Button
                variant="secondary"
                icon={<GoogleIcon />}
                type="button"
                onClick={handleGoogleSignIn}
                isLoading={isSubmiting}
              >
                {t('register-page.continue-with-google')}
              </Button>
              {/* <Button
                variant="secondary"
                icon={<FacebookIcon />}
                type="button"
                onClick={handleFacebookSignIn}
                isLoading={isSubmiting}
              >
                {t('register-page.continue-with-facebook')}
              </Button> */}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

LoginPage.getLayout = AuthLayout;
