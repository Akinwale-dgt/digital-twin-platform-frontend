import * as Yup from 'yup';
import FormModel from './FormModel';

const {
  formField: {
    handWrist,
    upperArm,
    lowerBack,
    lowerLegAndFoot,
    neck,
    thigh,
    shoulder,
    discomfortLevel
  },
} = FormModel;


export default [
Yup.object().shape({
  [handWrist.name]: Yup.number().min(1, handWrist.requiredErrorMsg)
    .required(handWrist.requiredErrorMsg),
  [upperArm.name]: Yup.number().min(1, upperArm.requiredErrorMsg)
    .required(upperArm.requiredErrorMsg),
  [lowerBack.name]: Yup.number().min(1, lowerBack.requiredErrorMsg)
    .required(lowerBack.requiredErrorMsg),
  [lowerLegAndFoot.name]: Yup.number().min(1, lowerLegAndFoot.requiredErrorMsg)
    .required(lowerLegAndFoot.requiredErrorMsg),
  [neck.name]: Yup.number().min(1, neck.requiredErrorMsg)
    .required(neck.requiredErrorMsg),
  [thigh.name]: Yup.number().min(1, thigh.requiredErrorMsg)
    .required(thigh.requiredErrorMsg),
  [shoulder.name]: Yup.number().min(1, shoulder.requiredErrorMsg)
    .required(shoulder.requiredErrorMsg),
    
[discomfortLevel.name]: Yup.string().when(
  ['handWrist', 'upperArm', 'lowerBack', 'lowerLegAndFoot', 'neck', 'thigh', 'shoulder'], 
  ([handWrist, upperArm, lowerBack, lowerLegAndFoot, neck, thigh, shoulder]) => {
    const isAnyFieldGreaterThanOrEqualToThree = 
      [handWrist, upperArm, lowerBack, lowerLegAndFoot, neck, thigh, shoulder].some(value => value > 3);

    return isAnyFieldGreaterThanOrEqualToThree 
      ? Yup.string().required(discomfortLevel.requiredErrorMsg) 
      : Yup.string().nullable();
  }
),
}),

  // Yup.object().shape({
  //   [filesToUpload.name]: Yup.array().min(1, `${filesToUpload.requiredErrorMsg}`),
  //   [documentType.name]: Yup.string().nullable().notRequired(),
  //   [privateDocuments.name]: Yup.array(),
  // }),
];

