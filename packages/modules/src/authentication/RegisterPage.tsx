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
import { auth } from 'firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AuthError } from '@firebase/auth';
import { useTokenStore } from '../auth/useTokenStore';
import { useRouter } from 'next/router';
import { useVerifyLoggedIn } from '../auth/useVerifyLoggedIn';

import axios from 'axios';
import { useAuth } from '../auth/useAuth';
import { APIResponseUser } from 'custom-types';

const validationSchema = Yup.object({
  name: Yup.string().required('formik.required'),
  email: Yup.string().email('formik.email.invalid').required('formik.required'),
  password: Yup.string()
    .min(8, 'formik.password.min')
    .max(60, 'formik.password.max')
    .required('formik.required'),
});

interface InitialValuesType {
  name: string;
  email: string;
  password: string;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const RegisterPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const setToken = useTokenStore((state) => state.setToken);
  const setUser = useAuth((state) => state.setUser);
  const hasToken = useVerifyLoggedIn();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async ({ email, password, name }: InitialValuesType) => {
    try {
      setIsSubmiting(true);
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await createdUser.user.getIdToken();

      const { data } = await axios.post(
        '/signup',
        {
          username: name,
          email: email,
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );

      const user = data as APIResponseUser;
      setUser(user.data.id, user.data.attributes);

      setToken(token);
    } catch (error) {
      if ((error as AuthError).code === 'auth/email-already-in-use') {
        return setErrorMessage('Email is already existed');
      }
      setErrorMessage('Something went wrong');
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmiting(true);
      const response = await signInWithPopup(auth, googleProvider);
      const token = await response.user.getIdToken();
      setToken(token);
    } catch (error) {
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setIsSubmiting(true);
      const response = await signInWithPopup(auth, facebookProvider);
      const token = await response.user.getIdToken();
      setToken(token);
    } catch (error) {
    } finally {
      setIsSubmiting(false);
    }
  };

  useEffect(() => {
    if (hasToken) {
      push('/');
    }
  }, [push, hasToken]);

  return (
    <>
      <SeoMeta title="Register - Prutteka" description="" />
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
          initialValues={{ email: '', password: '', name: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4 p-4">
              <InputField
                name="name"
                placeholder={t('register-page.name') || ''}
                type="text"
              />
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
              {!!errorMessage ? (
                <Message variant="error">{errorMessage}</Message>
              ) : null}
              <Button hasShadow type="submit" isLoading={isSubmiting}>
                {t('register-page.create-new-account')}
              </Button>
              <div className="my-3 mx-2 border-b-2 border-gray-200" />
              <Button variant="secondary" as="link" href="/login" type="button">
                {t('register-page.login')}
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
              <Button
                variant="secondary"
                icon={<FacebookIcon />}
                type="button"
                onClick={handleFacebookSignIn}
                isLoading={isSubmiting}
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

RegisterPage.getLayout = AuthLayout;
