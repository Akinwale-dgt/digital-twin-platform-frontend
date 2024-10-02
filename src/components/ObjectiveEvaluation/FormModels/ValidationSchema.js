import * as Yup from 'yup';
import FormModel from './FormModel';

const {
  formField: {
    cognitiveWorkloads,
    fallRisk,
    exertion
  },
} = FormModel;


export default [
Yup.object().shape({
  [cognitiveWorkloads.name]: Yup.array().min(1, cognitiveWorkloads.requiredErrorMsg)
    .required(cognitiveWorkloads.requiredErrorMsg),
}),
  Yup.object().shape({
  [fallRisk.name]: Yup.array().min(1, fallRisk.requiredErrorMsg)
    .required(fallRisk.requiredErrorMsg),
  }),
  Yup.object().shape({
  [exertion.name]: Yup.array().min(1, exertion.requiredErrorMsg)
    .required(exertion.requiredErrorMsg),
  }),
];