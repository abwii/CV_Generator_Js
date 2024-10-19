import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-[#F0F0F0] flex justify-center items-center">
      <div className="w-full max-w-md">
        {/* Bouton Retour */}
        <div className="flex justify-start mb-8">
          <Link
            to={"/home"}
            className="font-imbue flex items-center text-[#394A2E] text-lg border border-[#394A2E] rounded-full px-4 py-1 hover:bg-[#394A2E] hover:text-white transition"
          >
            <span className="mr-2 ">←</span> Back
          </Link>
        </div>

        {/* Formulaire avec Formik */}
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            phone: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            firstname: Yup.string()
              .min(2, 'Must be at least 2 characters')
              .required('Required'),
            lastname: Yup.string()
              .min(2, 'Must be at least 2 characters')
              .required('Required'),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, 'Phone number is not valid')
              .required('Required'),
            address: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Required')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });

              const data = await response.json();
              console.log(data);

              // Si la requête est réussie, rediriger vers la page d'accueil
              if (response.ok) {
                navigate('/login');
              } else {
                // Gérer les erreurs
                console.error("Erreur lors de l'enregistrement", data);
              }
            } catch (error) {
              console.error("Erreur lors de la requête", error);
            }

            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-10 font-imbue">
              <h1 className="text-4xl text-center font-bold text-[#394A2E] mb-6">
                Register
              </h1>

              <div className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-[#394A2E] text-white rounded-md hover:bg-[#2e3e23] transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
