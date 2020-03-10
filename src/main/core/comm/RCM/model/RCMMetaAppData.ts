export class RCMMetaAppData {
  javaid: number;
  uuid: string;
  user: string;
  config: string;
  status: string;
  userSCGA: string;
  userRol: string;
  nameUser: string;
  ready: boolean;
  ip: string;
  workstationName: string;
  position: number;
}

export class RCMSubsystemData {
  javaid: number;
  uuid: string;
  status: string;
  ready: boolean;
  ip: string;
  simStatus: string;
  workstationName: string;
  exerciseId: string;
  exerciseUuid: string;
  exerciseInterfaceTypeId: string;
  exerciseName: string;
  exerciseDenomination: string;
  pauseBlocked: string;
  exerciseType: string;
  executionId: string;
  startedExecution: string;
  cancelled: string;
  automaticGuided: string;
  position: number;
}
