import { DataService } from '../service/data.service';
import { multiselectToEntity } from './receipt-send-channel.model';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface AttestationModel {
  id: any;
  attestationPhase: any;
  date: any;
  integrity: any;
  root: any;
  debug: any;
  emulator: any;
  geoPosition: any;
  velocity: any;
  channelIntegrity: any;
  declined: any;
  deviceName: any;
}

export interface ResultAttestationModel {
  content: AttestationModel[];
  totalElements: string;
}

export function dtoToAttestation(src: any) {
  const dest: any = {
    'id': src.id,
    'attestationPhase': src.attestationPhase,
    'date': src.date,
    'integrity': src.integrity,
    'root': src.root,
    'debug': src.debug,
    'emulator': src.emulator,
    'geoPosition': src.geoPosition,
    'velocity': src.velocity,
    'channelIntegrity': src.channelIntegrity,
    'declined': src.declined,
    'deviceName': src.device.deviceName
  };
  return dest;
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

export function keysToAttestationActionValues(allAttestationActions: any, src: any) {
  var dest: any = [];
  for (let i = 0; i < src.length; i++) {
    let found = allAttestationActions.find(element => element.key === src[i].action); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
    dest.push(found.value);
  }
  return dest;
}

export function valuesToAttestationActionKeys(allAttestationActions: any, src: any) {
  var dest: any = [];
  for (let i = 0; i < src.length; i++) {
    let found = allAttestationActions.find(element => element.value === src[i]); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
    dest.push(found.key);
  }
  return dest;
}

export function nameToAttestationActionKeys(allAttestationActions: any, src: any) {
  let found = allAttestationActions.find(element => element.name === src); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
  return found.key;
}

export function nameToAttestationThreadKeys(allAttestationThreads: any, src: any) {
  let found = allAttestationThreads.find(element => element.name === src); //TODO:  https://appdividend.com/2018/12/17/javascript-array-find-example-array-prototype-find-tutorial/
  return found.key;
}

export function dtoToAttestationThreatSequence(src: any) {
  const dataService: DataService = new DataService();
  const allAttestationActions = dataService.getAllAttestationActions();

  const attestationActions: any = keysToAttestationActionValues(allAttestationActions, src.attestationActions);
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
    'attestationActionNames': attestationActionNames.length<28 ? attestationActionNames : attestationActionNames.substring(0, 25) + '...',
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

export function updateAttestationThreatSequence(src: any) {
  const dataService: DataService = new DataService();
  const allAttestationActions = dataService.getAllAttestationActions();
  multiselectToEntity(src.attestationActions);
  const attestationActionsIdList: any = valuesToAttestationActionKeys(allAttestationActions, src.attestationActions);

  const dest: any = {
    'channelIntegrity': src.channelIntegrity,
    'debug': src.debug,
    'emulator': src.emulator,
    'enabled': src.enabled,
    'geoPosition': src.geoPosition,
    'integrity': src.integrity,
    'root': src.root,
    'velocity': src.velocity,
    'attestationActionsIdList': attestationActionsIdList
  };
  return dest;
}

export function attestationThreadsToUpdate(src: any) {
  const dest: any = {
    'defaultActionId': src
  };
  return dest;
}


export interface FilterAttestationHistory {
  deviceSn: string;
  deviceName: string;
  attestationPhase: string;
  date: string;
}

export function filterAttestationHistoryFormEmpty() {
  const dest = {
    'deviceSn': '',
    'deviceName': '',
    'attestationPhase': '',
    'date': '',
  };
  return dest;
}

export function dtoToFilterAttestationHistory(src: any) {
  let _deviceSn = src.deviceSn===undefined ? [] : src.deviceSn;
  let _deviceName = src.deviceName===undefined ? [] : src.deviceName;
  let _attestationPhase = src.attestationPhase===undefined ? [] : src.attestationPhase;
  let _date = src.date===undefined ? [] : src.date;

  let deviceSn: string = (Array.isArray(_deviceSn) && _deviceSn.length) ? _deviceSn[0].value : '';
  let deviceName: string = (Array.isArray(_deviceName) && _deviceName.length) ? _deviceName[0].value : '';
  let attestationPhase: string = (Array.isArray(_attestationPhase) && _attestationPhase.length) ? _attestationPhase[0].value : '';
  let date: string = (Array.isArray(_date) && _date.length) ? _date[0].value : '';

  const dest = {
    'deviceSn': deviceSn,
    'deviceName': deviceName,
    'attestationPhase': attestationPhase,
    'date': date,
  };
  return dest;
}

export function getBtnFilters(filter: any): any[] {
  const btnFilters: any = [];
  const filters = btnFilter(filter).split('&');
  if (Array.isArray(filters) && filters.length && 1<filters.length) {
    for (let f = 0; f < filters.length; f++) btnFilters.push(getBtnFilter(filters[f]));
  } else {
    const _filter = btnFilter(filter);
    btnFilters.push(getBtnFilter(_filter));
  }
  return btnFilters;
}

function btnFilter(filter: any) {
  let strFilter: string = JSON.stringify(filter).toString();
  strFilter = strFilter.replace('"}],"":', '"}],"btnFilter":');
  strFilter = strFilter.replace('{"":', '{"btnFilter":');
  let _filter = JSON.parse(strFilter);
  let _btnFilter = _filter.btnFilter===undefined ? [] : _filter.btnFilter;
  return (Array.isArray(_btnFilter) && _btnFilter.length) ? _btnFilter[0].value : '';
}

export function getBtnFilter(filter: any): FilterFieldValue {
  const _filter = filter.split('=');
  const field = (Array.isArray(_filter) && _filter.length) ? _filter[0] : '';
  const value = (Array.isArray(_filter) && _filter.length && _filter.length==2) ? _filter[1] : '';
  const dest = {
    'field': field,
    'value': value
  };
  return dest;
}

export interface FilterFieldValue {
  field: string;
  value: string;
}
