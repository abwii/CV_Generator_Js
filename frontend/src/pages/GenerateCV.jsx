import React, { useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

function GenerateCV() {

    const navigate = useNavigate();
    const inputRef = useRef(null);

  useEffect(() => {
    const tagify = new Tagify(inputRef.current, {
      whitelist: [
        "A# .NET", "A# (Axiom)", "A-0 System", "A+", "A++", "ABAP",
        // Füge hier alle anderen Whitelist-Einträge hinzu
        "Javascript", "CSS", "HTML"
      ],
      maxTags: 10,
      dropdown: {
        maxItems: 20,
        classname: 'tags-look', // Custom Classname
        enabled: 0, // Suggestions on focus
        closeOnSelect: false // Do not hide suggestions after selection
      }
    });

    tagify.on('add', (e) => {
        setFieldValue('skills', tagify.value);
    });
  
    tagify.on('remove', (e) => {
        setFieldValue('skills', tagify.value);
    });

    return () => {
      tagify.destroy();
    };
  }, []);

  return (
        <div className="min-h-screen p-6 bg-[#F0F0F0] flex flex-col justify-center items-center">
            <div className="flex w-full justify-self-start mb-8">
                <Link
                    to={"/login"}
                    className="font-imbue flex items-center text-[#394A2E] text-lg border border-[#394A2E] rounded-full px-4 py-1 hover:bg-[#394A2E] hover:text-white transition"
                >
                    <span className="mr-2 ">←</span> Back
                </Link>
                </div>
            <div className="w-full max-w-lg">
    
            <Formik
              initialValues={{
                title: '',
                description: '',
                //experience: '',
                //education: '',
                skills: [],
                softSkills: [],
                languages: [],
                visible: true
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                  .min(2, 'Must be at least 2 characters')
                  .required('Required'),
                description: Yup.string()
                  .min(3, 'Must be at least 2 characters')
                  .max(300, 'Must not be longer than 300 characters'),
                /*experience: Yup.string()
                  .min(2, 'Must be at least 2 characters')
                  .required('Required'),
                education: Yup.string()
                  .matches(/^[0-9]{10}$/, 'Phone number is not valid')
                  .required('Required'),*/
                skills: Yup.array()
                    .of(
                        Yup.string().required('Each skill must be a string')
                    )
                    .required('Skills must be an array of strings'),
                softSkills: Yup.array()
                    .of(
                        Yup.string().required('Each skill must be a string')
                    )
                    .required('Soft skills must be an array of strings'),
                languages: Yup.array()
                    .of(
                        Yup.string().required('Each language must be a string')
                    )
                    .required('Languages must be an array of strings'),
                visible: Yup.boolean().default(true)
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await fetch('http://localhost:5001/api/cv/create)', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  });
    
                  const data = await response.json();
                  console.log(data);
    
                  if (response.ok) {
                    navigate('/mycv');
                  } else {
                    console.error("Error during generation", data);
                  }
                } catch (error) {
                  console.error("Request error", error);
                }
    
                setSubmitting(false);
              }} 
              
              
              // Update-button
              
              
            >
              {({ isSubmitting }) => (
                <Form className="pb-10 font-imbue">
                  <h1 className="text-4xl text-center font-medium text-[#394A2E] mb-6">
                    Generate my CV
                  </h1>
    
                  <div className="space-y-4">
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>What kind of job are you looking for?</p>
                    </div>
                    <div className='pb-3'>
                      <Field
                        type="text"
                        name="title"
                        placeholder="Full Stack Developer"
                        className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                    <label htmlFor="lastname" className="text-2xl font-normal text-[#394A2E]">
                        Tell me your strengths or goals in two sentences
                    </label>
                    </div>
                    <div className='pb-3'>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Front-end developer with 5 years of experience..."
                        className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                        rows="4"
                      />
                      <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>Talk about your lastest experiences</p>
                    </div>
                    <div className='flex flex-col pb-3'>
                        <div className='mb-4'>
                            <Field
                                type="text"
                                name="experienceTitle"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="experienceTitle" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className='mb-4'>
                            <Field
                                type="text"
                                name="experienceCompany"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="experienceCompany" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className='flex flex-row mb-4 gap-4'>
                            <div className='basis-1/2'>
                                <Field
                                    type="text"
                                    name="experienceStartDate"
                                    placeholder="Phone"
                                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                                />
                                <ErrorMessage name="experienceStartDate" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='basis-1/2'>
                            <Field
                                type="text"
                                name="experienceEndDate"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="experienceEndDate" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="experienceDescription"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="experienceDescription" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>Talk about your lastest diplomas</p>
                    </div>
                    <div className='flex flex-col pb-3'>
                        <div className='mb-4'>
                            <Field
                                type="text"
                                name="educationDegree"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="educationDegree" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className='mb-4'>
                            <Field
                                type="text"
                                name="educationInstitution"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="educationInstitution" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className='flex flex-row mb-4 gap-4'>
                            <div className='basis-1/2'>
                                <Field
                                    type="text"
                                    name="educationStartDate"
                                    placeholder="Phone"
                                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                                />
                                <ErrorMessage name="educationStartDate" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className='basis-1/2'>
                                <Field
                                    type="text"
                                    name="educationEndDate"
                                    placeholder="Phone"
                                    className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                                />
                            <ErrorMessage name="phoeducationEndDatene" component="div" className="text-red-500 text-sm" />
                            </div>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="educationDescription"
                                placeholder="Phone"
                                className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200"
                            />
                            <ErrorMessage name="educationDescription" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>What amazing skills do you have ?</p>
                    </div>
                    <div className='pb-3'>
                        <Field
                            name="skills"
                            className="tagify--custom-dropdown"
                            placeholder="Type an English letter"
                            ref={inputRef}
                            defaultValue="css, html, javascript"
                        />
                        <ErrorMessage name="skills" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>... let's not overlook your soft skills</p>
                    </div>
                    <div className='pb-3'>
                        <Field
                            name="softSkills"
                            className="tagify--custom-dropdown"
                            placeholder="Type an English letter"
                            ref={inputRef} // faut faire un autre pour les soft skills
                            defaultValue="css, html, javascript" // idem
                        />
                      <ErrorMessage name="softSkills" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className='text-2xl font-normal text-[#394A2E]'>
                        <p>Of course, your linguistic talents are important too</p>
                    </div>
                    <div>
                        <Field
                            name="languages"
                            className="tagify--custom-dropdown"
                            placeholder="Type an English letter"
                            ref={inputRef} // idem pour langues
                            defaultValue="css, html, javascript" //idem
                        />
                      <ErrorMessage name="languages" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>
    
                  <div className="mt-6 text-center">
                    <button
                      type="submit"
                      className="w-full p-3 bg-[#394A2E] text-white rounded-md hover:bg-[#2e3e23] transition"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>    
  )
}

export default GenerateCV