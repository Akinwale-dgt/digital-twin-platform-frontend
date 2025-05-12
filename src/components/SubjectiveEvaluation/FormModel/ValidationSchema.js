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
    mentalDemand,
    physicalDemand,
    temporalDemand,
    performance,
    effort,
    frustration,
    exertion,
    balance,
    familiarityWithSituation,
    informationQuantity,
    spareMentalCapacity,
    divisionOfAttention,
    concentrationOfAttention,
    arousal,
    variabilityOfSituation,
    complexityOfSituation,
    instabilityOfSituation,
    donAndDoff,
    adjustFitting,
    worksAsExpected,
    meetsNeed,
    accomplishTask,
    withoutAssistance,
    workWith,
    needToLearn,
    easilyLearnToAssemble,
    easilyLearnToAdjust,
    easilyLearnChecks,
    rememberHowToUse,
    useAgainWithoutAssistance,
    restrictsMovement,
    interfereWithEnvironment,
    satisfaction,
  },
} = FormModel;

export default [
  Yup.object().shape({
    [handWrist.name]: Yup.number()
      .min(1, handWrist.requiredErrorMsg)
      .required(handWrist.requiredErrorMsg),
    [upperArm.name]: Yup.number()
      .min(1, upperArm.requiredErrorMsg)
      .required(upperArm.requiredErrorMsg),
    [lowerBack.name]: Yup.number()
      .min(1, lowerBack.requiredErrorMsg)
      .required(lowerBack.requiredErrorMsg),
    [lowerLegAndFoot.name]: Yup.number()
      .min(1, lowerLegAndFoot.requiredErrorMsg)
      .required(lowerLegAndFoot.requiredErrorMsg),
    [neck.name]: Yup.number()
      .min(1, neck.requiredErrorMsg)
      .required(neck.requiredErrorMsg),
    [thigh.name]: Yup.number()
      .min(1, thigh.requiredErrorMsg)
      .required(thigh.requiredErrorMsg),
    [shoulder.name]: Yup.number()
      .min(1, shoulder.requiredErrorMsg)
      .required(shoulder.requiredErrorMsg),
  }),
  Yup.object().shape({
    [mentalDemand.name]: Yup.number()
      .min(1, mentalDemand.requiredErrorMsg)
      .required(mentalDemand.requiredErrorMsg),
    [physicalDemand.name]: Yup.number()
      .min(1, physicalDemand.requiredErrorMsg)
      .required(physicalDemand.requiredErrorMsg),
    [temporalDemand.name]: Yup.number()
      .min(1, temporalDemand.requiredErrorMsg)
      .required(temporalDemand.requiredErrorMsg),
    [performance.name]: Yup.number()
      .min(1, performance.requiredErrorMsg)
      .required(performance.requiredErrorMsg),
    [effort.name]: Yup.number()
      .min(1, effort.requiredErrorMsg)
      .required(effort.requiredErrorMsg),
    [frustration.name]: Yup.number()
      .min(1, frustration.requiredErrorMsg)
      .required(frustration.requiredErrorMsg),
  }),
  Yup.object().shape({
    [exertion.name]: Yup.number()
      .min(1, exertion.requiredErrorMsg)
      .required(exertion.requiredErrorMsg),
  }),
  Yup.object().shape({
    [balance.name]: Yup.number()
      .min(1, balance.requiredErrorMsg)
      .required(balance.requiredErrorMsg),
  }),
  Yup.object().shape({
    [familiarityWithSituation.name]: Yup.number()
      .min(1, familiarityWithSituation.requiredErrorMsg)
      .required(familiarityWithSituation.requiredErrorMsg),
    [informationQuantity.name]: Yup.number()
      .min(1, informationQuantity.requiredErrorMsg)
      .required(informationQuantity.requiredErrorMsg),
    [spareMentalCapacity.name]: Yup.number()
      .min(1, spareMentalCapacity.requiredErrorMsg)
      .required(spareMentalCapacity.requiredErrorMsg),
    [divisionOfAttention.name]: Yup.number()
      .min(1, divisionOfAttention.requiredErrorMsg)
      .required(divisionOfAttention.requiredErrorMsg),
    [concentrationOfAttention.name]: Yup.number()
      .min(1, concentrationOfAttention.requiredErrorMsg)
      .required(concentrationOfAttention.requiredErrorMsg),
    [arousal.name]: Yup.number()
      .min(1, arousal.requiredErrorMsg)
      .required(arousal.requiredErrorMsg),
    [variabilityOfSituation.name]: Yup.number()
      .min(1, variabilityOfSituation.requiredErrorMsg)
      .required(variabilityOfSituation.requiredErrorMsg),
    [complexityOfSituation.name]: Yup.number()
      .min(1, complexityOfSituation.requiredErrorMsg)
      .required(complexityOfSituation.requiredErrorMsg),
    [instabilityOfSituation.name]: Yup.number()
      .min(1, instabilityOfSituation.requiredErrorMsg)
      .required(instabilityOfSituation.requiredErrorMsg),
  }),
  Yup.object().shape({
    [donAndDoff.name]: Yup.number()
      .min(1, donAndDoff.requiredErrorMsg)
      .required(donAndDoff.requiredErrorMsg),
    [adjustFitting.name]: Yup.number()
      .min(1, adjustFitting.requiredErrorMsg)
      .required(adjustFitting.requiredErrorMsg),
    [worksAsExpected.name]: Yup.number()
      .min(1, worksAsExpected.requiredErrorMsg)
      .required(worksAsExpected.requiredErrorMsg),
    [meetsNeed.name]: Yup.number()
      .min(1, meetsNeed.requiredErrorMsg)
      .required(meetsNeed.requiredErrorMsg),
    [accomplishTask.name]: Yup.number()
      .min(1, accomplishTask.requiredErrorMsg)
      .required(accomplishTask.requiredErrorMsg),
    [withoutAssistance.name]: Yup.number()
      .min(1, withoutAssistance.requiredErrorMsg)
      .required(withoutAssistance.requiredErrorMsg),
    [workWith.name]: Yup.number()
      .min(1, workWith.requiredErrorMsg)
      .required(workWith.requiredErrorMsg),
    [needToLearn.name]: Yup.number()
      .min(1, needToLearn.requiredErrorMsg)
      .required(needToLearn.requiredErrorMsg),
    [easilyLearnToAssemble.name]: Yup.number()
      .min(1, easilyLearnToAssemble.requiredErrorMsg)
      .required(easilyLearnToAssemble.requiredErrorMsg),
    [easilyLearnToAdjust.name]: Yup.number()
      .min(1, easilyLearnToAdjust.requiredErrorMsg)
      .required(easilyLearnToAdjust.requiredErrorMsg),
    [easilyLearnChecks.name]: Yup.number()
      .min(1, easilyLearnChecks.requiredErrorMsg)
      .required(easilyLearnChecks.requiredErrorMsg),
    [rememberHowToUse.name]: Yup.number()
      .min(1, rememberHowToUse.requiredErrorMsg)
      .required(rememberHowToUse.requiredErrorMsg),
    [useAgainWithoutAssistance.name]: Yup.number()
      .min(1, useAgainWithoutAssistance.requiredErrorMsg)
      .required(useAgainWithoutAssistance.requiredErrorMsg),
    [restrictsMovement.name]: Yup.number()
      .min(1, restrictsMovement.requiredErrorMsg)
      .required(restrictsMovement.requiredErrorMsg),
    [interfereWithEnvironment.name]: Yup.number()
      .min(1, interfereWithEnvironment.requiredErrorMsg)
      .required(interfereWithEnvironment.requiredErrorMsg),
    [satisfaction.name]: Yup.number()
      .min(1, satisfaction.requiredErrorMsg)
      .required(satisfaction.requiredErrorMsg),
  }),
];
