// import React, { useState } from 'react';
// import { useTypeSafeTranslation } from 'shared-utils/hooks';
// import { Button, InputField, SelectField } from 'ui';
// import { Form, Formik } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object({
//   displayName: Yup.string().required('formik.required'),
//   lastName: Yup.string().required('formik.required'),
//   firstName: Yup.string().required('formik.required'),
//   gender: Yup.string()
//     .required('formik.required')
//     .oneOf(['male', 'female', 'non-binary']),

//   dateOfBirth: Yup.date()
//     .required('formik.required')
//     .max('2030-12-31', 'Date must be before 2030-12-31'),
// });

// export const EditUserModal = () => {
//   const { t } = useTypeSafeTranslation();
//   const [isSubmiting, setIsSubmiting] = useState();

//   return (
//     <div>
//       <Formik
//         initialValues={{
//           displayName: '',
//           lastName: '',
//           firstName: '',
//           dateOfBirth: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(e) => {
//           console.log('submit');

//           console.log(e);
//         }}
//       >
//         {() => (
//           <Form className="flex flex-col gap-4 p-4">
//             <div className="space-y-2">
//               <label htmlFor="displayName">Display Name</label>
//               <InputField
//                 name="displayName"
//                 id="displayName"
//                 placeholder={'Display name'}
//                 type="text"
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="lastName">Last Name</label>
//               <InputField
//                 name="lastName"
//                 id="lastName"
//                 placeholder={'Last name'}
//                 type="text"
//               />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="firstName">First Name</label>
//               <InputField
//                 name="firstName"
//                 id="firstName"
//                 placeholder={'First name'}
//                 type="text"
//               />
//             </div>
//             <SelectField
//               name="details.type"
//               label={'Gender'}
//               placeholder={'Gender'}
//               containerClassName="flex-1"
//               options={['Male', 'Female', 'Other']}
//               values={['male', 'female', 'non-binary']}
//             />
//             <div className="space-y-2">
//               <label htmlFor="dateOfBirth">Date of Birth</label>
//               <InputField
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 placeholder=""
//                 type="date"
//               />
//             </div>
//             {/* {!!errorMessage ? (
//               <Message variant="error">{errorMessage}</Message>
//             ) : null} */}
//             <Button hasShadow isLoading={isSubmiting}>
//               {t('common.confirm')}
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };
