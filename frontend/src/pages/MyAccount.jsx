import React, { useState, useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';


function MyAccount() {
  const navigate = useNavigate();
  const { getUserInfos,updateUser } = useContext(UserContext);
  
  // Récupérer les infos utilisateur
  const userId = getUserInfos().id;
  const token = getUserInfos().token;
  const userFirstName = getUserInfos().firstname;
  const userLastName = getUserInfos().lastname;
  const userPhone = getUserInfos().phone;
  const userAdress = getUserInfos().address;
  const userEmail = getUserInfos().email;

  // Gérer l'état d'édition pour chaque champ
  const [editingFields, setEditingFields] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    address: false,
    email: false,
    passwords: false,  // Un état unique pour les trois champs de mot de passe
  });

  // Fonction pour activer/désactiver l'édition d'un champ particulier
  const handleEditClick = (fieldName) => {
    setEditingFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleCancelClick = (fieldName) => {
    setEditingFields((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  // Fonction pour vérifier si au moins un champ est en mode édition
  const isAnyFieldBeingEdited = Object.values(editingFields).some(isEditing => isEditing);

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
            oldPassword: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object({
            firstname: Yup.string().min(2, 'Must be at least 2 characters'),
            lastname: Yup.string().min(2, 'Must be at least 2 characters'),
            phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid'),
            address: Yup.string(),
            email: Yup.string().email('Invalid email address'),
            oldPassword: Yup.string().min(6, 'Password must be at least 6 characters'),
            password: Yup.string().min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await fetch(`http://localhost:5001/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });

              const data = await response.json();
              console.log(data);

              // Si la requête est réussie, rediriger vers la page d'accueil
              if (response.ok) {
                updateUser(data);
                navigate('/home');
              } else {
                // Gérer les erreurs
                console.error("Erreur lors de la mise à jour", data);
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
                My account
              </h1>

              <div className="space-y-4">
                {/* Champ Firstname */}
                <div className="flex items-center space-x-2">
                  <Field
                    type="text"
                    name="firstname"
                    placeholder={userFirstName}
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.firstname}  // Désactive le champ si non en mode édition
                  />
                  {!editingFields.firstname ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('firstname')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('firstname')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Répéter la même logique pour les autres champs */}
                <div className="flex items-center space-x-2">
                  <Field
                    type="text"
                    name="lastname"
                    placeholder={userLastName}
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.lastname}
                  />
                  {!editingFields.lastname ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('lastname')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('lastname')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex items-center space-x-2">
                  <Field
                    type="text"
                    name="phone"
                    placeholder={userPhone}
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.phone}
                  />
                  {!editingFields.phone ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('phone')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('phone')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex items-center space-x-2">
                  <Field
                    type="text"
                    name="address"
                    placeholder={userAdress}
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.address}
                  />
                  {!editingFields.address ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('address')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('address')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex items-center space-x-2">
                  <Field
                    type="email"
                    name="email"
                    placeholder={userEmail}
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.email}
                  />
                  {!editingFields.email ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('email')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('email')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Champs de mot de passe */}
                <div className="flex flex-col space-y-2">
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Old Password"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.passwords}
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.passwords}
                  />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                    disabled={!editingFields.passwords}
                  />
                  {!editingFields.passwords ? (
                    <button
                      type="button"
                      onClick={() => handleEditClick('passwords')}
                      className="p-2 bg-blue-500 text-white rounded-md"
                    >
                      edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCancelClick('passwords')}
                      className="p-2 bg-red-500 text-white rounded-md"
                    >
                      cancel
                    </button>
                  )}
                  <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
              </div>

              {/* Bouton Register */}
              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="w-full p-3 bg-[#394A2E] text-white rounded-md hover:bg-[#2e3e23] transition"
                  disabled={!isAnyFieldBeingEdited || isSubmitting}  // Désactiver si aucun champ n'est en édition ou si le formulaire est en soumission
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default MyAccount;
