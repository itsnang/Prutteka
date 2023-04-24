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
} from 'firebase/auth';
import { useState } from 'react';
import { AuthError } from '@firebase/auth';
import { useTokenStore } from '../auth/useTokenStore';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useAuth } from '../auth/useAuth';
import { APIResponseUser } from 'custom-types';

const validationSchema = Yup.object({
  email: Yup.string().email('formik.email.invalid').required('formik.required'),
  password: Yup.string()
    .min(8, 'formik.password.min')
    .max(60, 'formik.password.max')
    .required('formik.required'),
});

interface InitialValuesType {
  display_name: string;
  email: string;
  password: string;
}

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const RegisterPage: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { t } = useTypeSafeTranslation();
  const setUser = useAuth((state) => state.setUser);
  const userId = useAuth((state) => state.id);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async ({
    display_name,
    email,
    password,
  }: InitialValuesType) => {
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
          display_name,
          email,
        },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      const user = data as APIResponseUser;
      setUser(user.data.id, user.data.attributes);
      push('/');
    } catch (error) {
      if ((error as AuthError).code === 'auth/email-already-in-use') {
        return setErrorMessage('Email is already existed');
      }
      setErrorMessage('Something went wrong');
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmiting(true);
      const fbResponse = await signInWithPopup(auth, googleProvider);
      const token = await fbResponse.user.getIdToken();
      console.log(fbResponse.user);

      const serverResponse = await axios.post(
        '/signup',
        {
          username: fbResponse.user.displayName,
          email: fbResponse.user.email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const user = serverResponse.data as APIResponseUser;
      console.log(user.data);

      setUser(user.data.id, user.data.attributes);
      push('/');
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
  //   } catch (error) {
  //   } finally {
  //     setIsSubmiting(false);
  //   }
  // };

  return (
    <>
      <SeoMeta
        title="Register | ព្រឹត្តិការណ៍ - Prutteka"
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
          initialValues={{ display_name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-4 p-4">
              <InputField
                name="display_name"
                placeholder={'Display Name'}
                type="text"
              />
              <InputField
                name="email"
                placeholder={t('register-page.email')}
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

RegisterPage.getLayout = AuthLayout;
