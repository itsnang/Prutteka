import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button, InputField, Message, Typography, Modal } from 'ui';
import { useImageCrop, useTypeSafeTranslation } from 'shared-utils/hooks';
import Image from 'next/image';
import { CameraIcon } from '@heroicons/react/24/outline';

const validationSchema = Yup.object({
  displayName: Yup.string().required('formik.required'),
  lastName: Yup.string().required('formik.required'),
  firstName: Yup.string().required('formik.required'),
  gender: Yup.string()
    .required('formik.required')
    .oneOf(['male', 'female', 'non-binary'], 'must enter valid value'),

  dateOfBirth: Yup.date()
    .required('formik.required')
    .min('1900', 'Date year must not be lower than 1900')
    .max(
      '2010-12-31',
      'You must be 13 years old or older to register an account'
    ),
});

const GENDERS = {
  male: { en: 'Male', kh: 'ប្រុស' },
  female: { en: 'Female', kh: 'ស្រី' },
  other: { en: 'Other', kh: 'ផ្សេង' },
};

interface EditProfileModalProps {
  show: boolean;
  onClose: () => void;
  onEdit: (value: InitialValuesType) => void;
}

interface InitialValuesType {
  image: Blob;
  displayName: string;
  lastName: string;
  firstName: string;
  gender: 'male' | 'female' | 'non-binary';
  dateOfBirth: string | Date;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  show,
  onClose,
  onEdit,
}) => {
  const { t, i18n } = useTypeSafeTranslation();
  const [isSubmiting, setIsSubmiting] = useState();

  // const handleSubmit = (value: any) => {
  //   onEdit({ ...value, image: imageFile });
  // };

  return null;

  // return (
  //   <Modal show={show} onClose={onClose}>
  //     <Formik
  //       initialValues={{
  //         displayName: '',
  //         lastName: '',
  //         firstName: '',
  //         gender: '',
  //         dateOfBirth: '',
  //       }}
  //       validationSchema={validationSchema}
  //       onSubmit={handleSubmit}
  //     >
  //       {() => (
  //         <Form className="flex flex-col gap-4">
  //           <div className="mb-4 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6">
  //             <div className="ring-primary group relative h-36 w-36 overflow-hidden rounded-full ring ring-offset-4">
  //               <Image
  //                 className="ring-secondary rounded-full"
  //                 src={imageUrl}
  //                 fill
  //                 alt="profile"
  //               />
  //               <div
  //                 className="absolute inset-0 bg-black/25 opacity-0 transition-all duration-150 group-hover:opacity-100"
  //                 onClick={openCropModal}
  //               >
  //                 <CameraIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white" />
  //               </div>
  //             </div>
  //             <Button
  //               className="px-6"
  //               variant="primary"
  //               type="button"
  //               onClick={openCropModal}
  //             >
  //               Change
  //             </Button>
  //             {ImageCropModal}
  //           </div>
  //           <div className="space-y-2">
  //             <label htmlFor="displayName">Display Name</label>
  //             <InputField
  //               name="displayName"
  //               id="displayName"
  //               placeholder={'Display name'}
  //               type="text"
  //             />
  //           </div>
  //           <div className="space-y-2">
  //             <label htmlFor="lastName">Last Name</label>
  //             <InputField
  //               name="lastName"
  //               id="lastName"
  //               placeholder={'Last name'}
  //               type="text"
  //             />
  //           </div>
  //           <div className="space-y-2">
  //             <label htmlFor="firstName">First Name</label>
  //             <InputField
  //               name="firstName"
  //               id="firstName"
  //               placeholder={'First name'}
  //               type="text"
  //             />
  //           </div>
  //           <SelectField
  //             name="gender"
  //             label={'Gender'}
  //             placeholder={'Gender'}
  //             containerClassName="flex-1"
  //             options={GENDERS}
  //             lang={i18n.language}
  //           />
  //           <div className="space-y-2">
  //             <label htmlFor="dateOfBirth">Date of Birth</label>
  //             <InputField
  //               name="dateOfBirth"
  //               id="dateOfBirth"
  //               placeholder=""
  //               type="date"
  //             />
  //           </div>
  //           {/* {!!errorMessage ? (
  //             <Message variant="error">{errorMessage}</Message>
  //           ) : null} */}
  //           <Button
  //             hasShadow
  //             type="submit"
  //             onClick={() => console.log('hello')}
  //             isLoading={isSubmiting}
  //           >
  //             {t('common.confirm')}
  //           </Button>
  //         </Form>
  //       )}
  //     </Formik>
  //   </Modal>
  // );
};
