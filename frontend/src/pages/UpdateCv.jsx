import { useContext } from 'react';
import { ErrorMessage, Field, Form, Formik, FieldArray } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

function UpdateCv() {
    const { getUserInfos } = useContext(UserContext);
    const userId = getUserInfos().id;
    const token = getUserInfos().token;
    const navigate = useNavigate();
  
    const experienceInitialValues = {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
  
    const educationInitialValues = {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
    };
  
    const validationSchema = Yup.object({
      title: Yup.string().min(2, 'Must be at least 2 characters').required('Required'),
      description: Yup.string().min(3, 'Must be at least 3 characters').max(300, 'Must not be longer than 300 characters'),
      experience: Yup.array()
        .of(
          Yup.object().shape({
            title: Yup.string().required('Required'),
            company: Yup.string().required('Required'),
            startDate: Yup.date().required('Required'),
            endDate: Yup.date().required('Required'),
            description: Yup.string().required('Required'),
          })
        )
        .max(3, 'You can only add up to 3 experiences'),
      education: Yup.array()
        .of(
          Yup.object().shape({
            degree: Yup.string().required('Required'),
            institution: Yup.string().required('Required'),
            startDate: Yup.date().required('Required'),
            endDate: Yup.date().required('Required'),
            description: Yup.string().required('Required'),
          })
        )
        .max(3, 'You can only add up to 3 educations'),
      skills: Yup.array().of(Yup.string()),
      softSkills: Yup.array().of(Yup.string()),
      languages: Yup.array().of(Yup.string()),
      visible: Yup.boolean().default(true),
    });
  
    return (
      <div className="min-h-screen p-6 bg-[#F0F0F0] flex flex-col justify-center items-center">
        <div className="flex w-full justify-self-start mb-8">
          <Link to={"/mycv"} className="font-imbue flex items-center text-[#394A2E] text-lg border border-[#394A2E] rounded-full px-4 py-1 hover:bg-[#394A2E] hover:text-white transition">
            <span className="mr-2">←</span> Back
          </Link>
        </div>
        <div className="w-full max-w-lg">
          <Formik
            initialValues={{
              user: userId,
              title: '',
              description: '',
              experience: [],
              education: [],
              skills: [],
              softSkills: [],
              languages: [],
              visible: true,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Format the dates to 'DD/MM/YYYY' before submission
                const formattedValues = {
                  ...values,
                  experience: values.experience.map(exp => ({
                    ...exp,
                    startDate: moment(exp.startDate).format('DD/MM/YYYY'),
                    endDate: moment(exp.endDate).format('DD/MM/YYYY')
                  })),
                  education: values.education.map(edu => ({
                    ...edu,
                    startDate: moment(edu.startDate).format('DD/MM/YYYY'),
                    endDate: moment(edu.endDate).format('DD/MM/YYYY')
                  }))
                };
  
                console.log('Valeurs soumises :', formattedValues);
                
                const response = await fetch(`http://localhost:5001/api/cv/update/${userId}`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formattedValues),
                });
  
                const data = await response.json();
                console.log("Response data:", data);
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
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="pb-10 font-imbue">
                <h1 className="text-4xl text-center font-medium text-[#394A2E] mb-6">Edit my CV</h1>
                <div className="space-y-4">
                  <div className="text-2xl font-normal text-[#394A2E]">
                    <p>What kind of job are you looking for?</p>
                  </div>
                  <div className="pb-3">
                    <Field type="text" name="title" placeholder="Full Stack Developer" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-2xl font-normal text-[#394A2E]">Tell me your strengths or goals in two sentences</label>
                  </div>
                  <div className="pb-3">
                    <Field as="textarea" name="description" placeholder="Front-end developer with 5 years of experience..." className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" rows="4" />
                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                  </div>
  
                  {/* Dynamic Experiences */}
                  <div className="text-2xl font-normal text-[#394A2E]">
                    <p>Talk about your latest experiences</p>
                  </div>
                  <FieldArray name="experience">
                    {({ remove, push }) => (
                      <div>
                        {values.experience && values.experience.map((exp, index) => (
                          <div className="flex flex-col pb-3" key={index}>
                            <Field type="text" name={`experience.${index}.title`} placeholder="Job Title" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                            <ErrorMessage name={`experience.${index}.title`} component="div" className="text-red-500 text-sm" />
  
                            <Field type="text" name={`experience.${index}.company`} placeholder="Company" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2" />
                            <ErrorMessage name={`experience.${index}.company`} component="div" className="text-red-500 text-sm" />
  
                            <label>Start Date</label>
                            <DatePicker
                              selected={values.experience[index].startDate ? new Date(values.experience[index].startDate) : null}
                              onChange={date => setFieldValue(`experience.${index}.startDate`, date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2"
                            />
                            <ErrorMessage name={`experience.${index}.startDate`} component="div" className="text-red-500 text-sm" />
  
                            <label>End Date</label>
                            <DatePicker
                              selected={values.experience[index].endDate ? new Date(values.experience[index].endDate) : null}
                              onChange={date => setFieldValue(`experience.${index}.endDate`, date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2"
                            />
                            <ErrorMessage name={`experience.${index}.endDate`} component="div" className="text-red-500 text-sm" />
  
                            <Field as="textarea" name={`experience.${index}.description`} placeholder="Description" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2" rows="4" />
                            <ErrorMessage name={`experience.${index}.description`} component="div" className="text-red-500 text-sm" />
  
                            {values.experience.length > 1 && (
                              <button type="button" className="text-red-500 mt-2" onClick={() => remove(index)}>
                                Remove Experience
                              </button>
                            )}
                          </div>
                        ))}
                        {values.experience.length < 3 && (
                          <button type="button" className="text-green-500 mt-4" onClick={() => push(experienceInitialValues)}>
                            Add Experience
                          </button>
                        )}
                      </div>
                    )}
                  </FieldArray>
  
                  {/* Dynamic Educations */}
                  <div className="text-2xl font-normal text-[#394A2E]">
                    <p>Tell me about your education</p>
                  </div>
                  <FieldArray name="education">
                    {({ remove, push }) => (
                      <div>
                        {Array.isArray(values.education) && values.education.map((edu, index) => (
                          <div className="flex flex-col pb-3" key={index}>
                            <Field type="text" name={`education.${index}.degree`} placeholder="Degree" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                            <ErrorMessage name={`education.${index}.degree`} component="div" className="text-red-500 text-sm" />
  
                            <Field type="text" name={`education.${index}.institution`} placeholder="Institution" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2" />
                            <ErrorMessage name={`education.${index}.institution`} component="div" className="text-red-500 text-sm" />
  
                            <label>Start Date</label>
                            <DatePicker
                              selected={values.education[index].startDate ? new Date(values.education[index].startDate) : null}
                              onChange={date => setFieldValue(`education.${index}.startDate`, date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2"
                            />
                            <ErrorMessage name={`education.${index}.startDate`} component="div" className="text-red-500 text-sm" />
  
                            <label>End Date</label>
                            <DatePicker
                              selected={values.education[index].endDate ? new Date(values.education[index].endDate) : null}
                              onChange={date => setFieldValue(`education.${index}.endDate`, date)}
                              dateFormat="dd/MM/yyyy"
                              className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2"
                            />
                            <ErrorMessage name={`education.${index}.endDate`} component="div" className="text-red-500 text-sm" />
  
                            <Field as="textarea" name={`education.${index}.description`} placeholder="Description" className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200 mt-2" rows="4" />
                            <ErrorMessage name={`education.${index}.description`} component="div" className="text-red-500 text-sm" />
  
                            {values.education.length > 1 && (
                              <button type="button" className="text-red-500 mt-2" onClick={() => remove(index)}>
                                Remove Education
                              </button>
                            )}
                          </div>
                        ))}
                        {values.education.length < 3 && (
                          <button type="button" className="text-green-500 mt-4" onClick={() => push(educationInitialValues)}>
                            Add Education
                          </button>
                        )}
                      </div>
                    )}
                  </FieldArray>
  
                  {/* Skills, Soft Skills and Languages */}
                  <div>
                    <h2 className="text-2xl font-normal text-[#394A2E]">Skills</h2>
                    <FieldArray name="skills">
                      {({ remove, push }) => (
                        <div>
                          {values.skills && values.skills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <Field type="text" name={`skills.${index}`} className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                              <button type="button" className="text-red-500 ml-2" onClick={() => remove(index)}>Remove</button>
                            </div>
                          ))}
                          <button type="button" className="text-green-500 mt-2" onClick={() => push('')}>
                            Add Skill
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
  
                  <div>
                    <h2 className="text-2xl font-normal text-[#394A2E]">Soft Skills</h2>
                    <FieldArray name="softSkills">
                      {({ remove, push }) => (
                        <div>
                          {values.softSkills && values.softSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <Field type="text" name={`softSkills.${index}`} className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                              <button type="button" className="text-red-500 ml-2" onClick={() => remove(index)}>Remove</button>
                            </div>
                          ))}
                          <button type="button" className="text-green-500 mt-2" onClick={() => push('')}>
                            Add Soft Skill
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
  
                  <div>
                    <h2 className="text-2xl font-normal text-[#394A2E]">Languages</h2>
                    <FieldArray name="languages">
                      {({ remove, push }) => (
                        <div>
                          {values.languages && values.languages.map((language, index) => (
                            <div key={index} className="flex items-center">
                              <Field type="text" name={`languages.${index}`} className="w-full p-3 border border-[#394A2E] rounded-md bg-gray-200" />
                              <button type="button" className="text-red-500 ml-2" onClick={() => remove(index)}>Remove</button>
                            </div>
                          ))}
                          <button type="button" className="text-green-500 mt-2" onClick={() => push('')}>
                            Add Language
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Field type="checkbox" name="visible" className="mr-2" />
                      <label htmlFor="visible" className="text-[#394A2E]">Make my CV public</label>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-[#394A2E] text-white p-2 rounded-md">
                      {isSubmitting ? 'Generating...' : 'Generate CV'}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
}

export default UpdateCv