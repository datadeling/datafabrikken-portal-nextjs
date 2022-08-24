import React, { FC, memo, useState } from 'react';
import { compose } from 'redux';

import { Field, Form, Formik } from 'formik';
import axios from 'axios';

import Breadcrumbs from '../../components/breadcrumbs';
import SC from '../../styles/pages/finn-data/datajegeren';

import { Variant as ContainerVariant } from '../../components/container';
import {
  FancyArticle,
  GetFancyArticleDocument
} from '../../services/api/generated/cms/graphql';
import { initializeApollo } from '../../utils/apollo/apolloClient';

import Head from '../../components/head';
import ArticleStrapi from '../../components/article-strapi';

import translations from '../../services/translations';
import BullseyeIcon from '../../../public/images/illustration-bullseye.inline.svg';
import BullseyeMissedIcon from '../../../public/images/illustration-bullseye-missed.inline.svg';

import env from '../../../env';

const { DATAJEGER_EMAIL_ADDRESS } = env.clientEnv;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GetFancyArticleDocument,
    variables: {
      id: 16
    }
  });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

interface Props {
  fancyArticle?: FancyArticle;
}

interface FormData {
  dataset: string;
  location: string;
  efforts: string;
  useCase: string;
  name: string;
  email: string;
  phoneNumber: string;
  organizationNumber: string;
}

const DatajegerenPage: FC<Props> = ({ fancyArticle }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const submit = (formData: FormData) => {
    return axios.post('/api/datajegeren', formData);
  };

  return (
    <>
      <Head
        title={fancyArticle?.title ?? ''}
        description={fancyArticle?.subtitle ?? ''}
      />
      <Breadcrumbs dynamicPageTitles={[fancyArticle?.title ?? '']} />
      <SC.Root>
        {fancyArticle && (
          <ArticleStrapi article={fancyArticle} showScrollToTop={false} />
        )}
        {!formSubmitted && (
          <SC.FormIngress $variant={ContainerVariant.WIDTH_720}>
            {translations.translate('datajegeren.fillOutForm')}
          </SC.FormIngress>
        )}
        <SC.FormWrapper>
          <SC.Container $variant={ContainerVariant.WIDTH_720}>
            {formSubmitted ? (
              <SC.Confirmation>
                <div>
                  <BullseyeIcon />
                </div>
                <div>{translations.translate('datajegeren.confirmation')}</div>
              </SC.Confirmation>
            ) : (
              <>
                <Formik
                  initialValues={{
                    dataset: '',
                    location: '',
                    efforts: '',
                    useCase: '',
                    email: '',
                    phoneNumber: '',
                    name: '',
                    organizationNumber: ''
                  }}
                  validate={values => {
                    const errors: {
                      dataset?: string;
                      email?: string;
                      name?: string;
                      organizationNumber?: string;
                    } = {};
                    if (!values.dataset) {
                      errors.dataset = `${translations.translate(
                        'datajegeren.errorRequired'
                      )}`;
                    }
                    if (!values.name) {
                      errors.name = `${translations.translate(
                        'datajegeren.errorRequired'
                      )}`;
                    }
                    if (!values.organizationNumber) {
                      errors.organizationNumber = `${translations.translate(
                        'datajegeren.errorRequired'
                      )}`;
                    }
                    if (!values.email) {
                      errors.email = `${translations.translate(
                        'datajegeren.errorRequired'
                      )}`;
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = `${translations.translate(
                        'datajegeren.errorInvalidEmail'
                      )}`;
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                      submit(values)
                        .then(() => {
                          setFormSubmitted(true);
                          resetForm();
                          setSubmitting(false);
                        })
                        .catch(() => {
                          setSubmitFailed(true);
                          setSubmitting(false);
                        });
                    }, 400);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <SC.FormFieldWrapper>
                        <label htmlFor='dataset'>
                          <SC.FormFieldLabel>
                            {`${translations.translate(
                              'datajegeren.dataset'
                            )} (${translations.translate(
                              'datajegeren.required'
                            )})`}
                          </SC.FormFieldLabel>
                          <SC.FormFieldLabelDescription>
                            {translations.translate(
                              'datajegeren.datasetDescription'
                            )}
                          </SC.FormFieldLabelDescription>
                        </label>
                        <Field name='dataset'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <textarea rows='5' {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='location'>
                          <SC.FormFieldLabel>
                            {translations.translate('datajegeren.location')}
                          </SC.FormFieldLabel>
                          <SC.FormFieldLabelDescription>
                            {translations.translate(
                              'datajegeren.locationDescription'
                            )}
                          </SC.FormFieldLabelDescription>
                        </label>
                        <Field name='location'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <textarea rows='5' {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='efforts'>
                          <SC.FormFieldLabel>
                            {translations.translate('datajegeren.efforts')}
                          </SC.FormFieldLabel>
                          <SC.FormFieldLabelDescription>
                            {translations.translate(
                              'datajegeren.effortsDescription'
                            )}
                          </SC.FormFieldLabelDescription>
                        </label>
                        <Field name='efforts'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <textarea rows='5' {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='useCase'>
                          <SC.FormFieldLabel>
                            {translations.translate('datajegeren.useCase')}
                          </SC.FormFieldLabel>
                          <SC.FormFieldLabelDescription>
                            {translations.translate(
                              'datajegeren.useCaseDescription'
                            )}
                          </SC.FormFieldLabelDescription>
                        </label>
                        <Field name='useCase'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <textarea rows='5' {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='organizationNumber'>
                          <SC.FormFieldLabel>{`${translations.translate(
                            'datajegeren.organizationNumber'
                          )} (${translations.translate(
                            'datajegeren.required'
                          )})`}</SC.FormFieldLabel>
                        </label>
                        <Field type='number' name='organizationNumber'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField
                              $error={meta.touched && meta.error}
                              $small
                            >
                              <input {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='name'>
                          <SC.FormFieldLabel>{`${translations.translate(
                            'datajegeren.name'
                          )} (${translations.translate(
                            'datajegeren.required'
                          )})`}</SC.FormFieldLabel>
                        </label>
                        <Field type='text' name='name'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <input {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='email'>
                          <SC.FormFieldLabel>{`${translations.translate(
                            'datajegeren.email'
                          )} (${translations.translate(
                            'datajegeren.required'
                          )})`}</SC.FormFieldLabel>
                        </label>
                        <Field type='email' name='email'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField $error={meta.touched && meta.error}>
                              <input {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.FormFieldWrapper>
                        <label htmlFor='phoneNumber'>
                          <SC.FormFieldLabel>{`${translations.translate(
                            'datajegeren.phoneNumber'
                          )}`}</SC.FormFieldLabel>
                        </label>
                        <Field type='tel' name='phoneNumber'>
                          {({ field, meta }: { field: any; meta: any }) => (
                            <SC.FormField
                              $error={meta.touched && meta.error}
                              $small
                            >
                              <input {...field} />
                              {meta.touched && meta.error && (
                                <SC.TextError>{meta.error}</SC.TextError>
                              )}
                            </SC.FormField>
                          )}
                        </Field>
                      </SC.FormFieldWrapper>
                      <SC.SubmitButton type='submit' disabled={isSubmitting}>
                        {translations.translate(
                          isSubmitting
                            ? 'datajegeren.submitting'
                            : 'datajegeren.submit'
                        )}
                      </SC.SubmitButton>
                    </Form>
                  )}
                </Formik>
                {submitFailed && (
                  <SC.SubmitFailed>
                    <div>
                      <BullseyeMissedIcon />
                    </div>
                    <div>
                      {translations.translate('datajegeren.submitFailed')}{' '}
                      <a href={`mailto:${DATAJEGER_EMAIL_ADDRESS}`}>
                        {DATAJEGER_EMAIL_ADDRESS}
                      </a>
                      .
                    </div>
                  </SC.SubmitFailed>
                )}
              </>
            )}
          </SC.Container>
        </SC.FormWrapper>
      </SC.Root>
    </>
  );
};

export default compose<FC>(memo)(DatajegerenPage);
