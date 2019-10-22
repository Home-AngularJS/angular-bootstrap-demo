import {DataService} from '../service/data.service';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface AttestationModel {
  action: any;
  actionWeight: any;
}

export function dtoToAttestationActions(src: any) {
  const dest: any = {
    'deviceBlock': null,
    'transactionBlock': null,
    'pinBlock': null,
    'manualBlock': null,
    'qrBlock': null,
    'nfcBlock': null,
    'noBlock': null
  };

  for (let i = 0; i < src.length; i++) {
    const attestationAction: any = src[i];
    if (attestationAction.action==='NO_BLOCK') dest.noBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_NFC') dest.nfcBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_TRANSACTION') dest.transactionBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_PIN') dest.pinBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_MANUAL') dest.manualBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_QR') dest.qrBlock = attestationAction.actionWeight;
    if (attestationAction.action==='BLOCK_DEVICE') dest.deviceBlock = attestationAction.actionWeight;
  }
  return dest;
}

export function dtoToAttestationThreads(src: any) {
  const dest: any = {
    'debug': null,
    'emulator': null,
    'root': null,
    'channelIntegrity': null,
    'geoPosition': null,
    'velocity': null,
    'integrity': null
  }

  for (let i = 0; i < src.length; i++) {
    const attestationThread: any = src[i];
    if (attestationThread.threatName==='DEBUG') dest.debug = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='EMULATOR') dest.emulator = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='ROOT') dest.root = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='CHANNEL_INTEGRITY') dest.channelIntegrity = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='GEO_POSITION') dest.geoPosition = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='VELOCITY_CHECK') dest.velocity = attestationThread.defaultAction.action;
    if (attestationThread.threatName==='INTEGRITY') dest.integrity = attestationThread.defaultAction.action;
  }
  return dest;
}

export function dtoToAttestationActionValues(allAttestationActions: any, src: any) {
  var dest: any = [];
  for (let i = 0; i < src.length; i++) {
    let found = allAttestationActions.find(element => element.key === src[i].action); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
    dest.push(found.value);
  }
  return dest;
}

export function dtoToAttestationActionKeys(allAttestationActions: any, src: any) {
  let found = allAttestationActions.find(element => element.name === src); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
  return found.key;
}

export function dtoToAttestationThreadKeys(allAttestationThreads: any, src: any) {
  let found = allAttestationThreads.find(element => element.name === src); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
  return found.key;
}

export function dtoToAttestationThreatSequence(src: any) {
  const dataService: DataService = new DataService();
  const allAttestationActions = dataService.getAllAttestationActions();

  const attestationActions: any = dtoToAttestationActionValues(allAttestationActions, src.attestationActions);
  let attestationActionNames: string = attestationActions.toString();
  let color = src.enabled==='Y' ? '#006600' : '#AAAAAA';

  const dest: any = {
    'id': src.id,
    'integrity': src.integrity,
    'root': src.root,
    'debug': src.debug,
    'emulator': src.emulator,
    'channelIntegrity': src.channelIntegrity,
    'geoPosition': src.geoPosition,
    'velocity': src.velocity,
    'enabled': src.enabled,
    'attestationActions': attestationActions,
    'attestationActionNames': attestationActionNames.length<30 ? attestationActionNames : attestationActionNames.substring(0, 25) + '...',
    'color': color
  };
  return dest;
}

export function attestationThreatSequenceNew() {
  const dest: any =  {
    'id': null,
    'debug': null,
    'emulator': null,
    'root': null,
    'integrity': null,
    'channelIntegrity': null,
    'geoPosition': null,
    'velocity': null,
    'attestationActions': null,
    'attestationActionNames': null,
    'enabled': null,
    'color': null
  };
  return dest;
}

export function attestationActionsToUpdate(src: any) {
  const dest: any = {
    'actionWeight': src
  };
  return dest;
}

export function attestationThreadsToUpdate(src: any) {
  const dest: any = {
    'defaultActionId': src
  };
  return dest;
}
