export default {
  formId: 'subjectiveEvaluation',
  formField: {
    handWrist: {
      name: 'handWrist',
      label: 'Hand/Wrist*',
      requiredErrorMsg: 'Hand/Wrist rating is required',
    },
    upperArm: {
      name: 'upperArm',
      label: 'Upper Arm',
      requiredErrorMsg: 'Upper Arm rating is required',
    },
    shoulder: {
      name: 'shoulder',
      label: 'Shoulder*',
      requiredErrorMsg: 'Shoulder rating is required',
    },
    lowerBack: {
      name: 'lowerBack',
      label: 'Lower Back',
      requiredErrorMsg: 'Lower Back rating is required',
    },
    thigh: {
      name: 'thigh',
      label: 'Thigh',
      requiredErrorMsg: 'Thigh rating is required',
    },
    neck: {
      name: 'neck',
      label: 'Neck',
      requiredErrorMsg: 'Neck rating is required',
    },
    lowerLegAndFoot: {
      name: 'lowerLegAndFoot',
      label: 'Lower Leg And Foot',
      requiredErrorMsg: 'Lower Leg And Foot rating is required',
    },
    discomfortLevel: {
      name: 'discomfortLevel',
      label: 'Discomfort Level',
      requiredErrorMsg: 'This field is required because you have more than "3" rating in one of the fields above',
    }
  },
};
