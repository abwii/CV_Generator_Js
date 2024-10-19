import React, { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

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
            email: '', // Changer 'login' en 'email'
            password: ''
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address') // Validation pour l'email
              .required('Required'),
            password: Yup.string().required('Required')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // 'values' contient maintenant 'email' au lieu de 'login'
              });

              if (response.ok) {
                const data = await response.json();
                login(data.user); // Assure-toi que l'API retourne un objet avec les infos de l'utilisateur et le token
                navigate('/home', { replace: true });
              } else {
                // Gérer les erreurs
                console.error("Erreur lors de la connexion", await response.json());
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
                Login
              </h1>

              <div className="space-y-4">
                <div>
                  <Field
                    type="email" // Changer le type en 'email'
                    name="email" // Changer le nom en 'email'
                    placeholder="Email" // Mettre à jour le placeholder
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
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-[#394A2E] text-white rounded-md hover:bg-[#2e3e23] transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
