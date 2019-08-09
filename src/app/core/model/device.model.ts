/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface DeviceModel {
  appId: any;
  appStatus: any;
  appVersion: any;
  deviceFingerprint: any;
  deviceName: any;
  deviceSn: any;
  deviceStatus: any;
  imei: any;
  initDate: any;
  osVersion: any;
  serialNumber: any;
}


export function dtoToDevice(src: any) {
  const dest: any = {
    "appId": src.appId,
    "appStatus": src.appStatus,
    "appVersion": src.appVersion,
    "deviceFingerprint": src.deviceFingerprint,
    "deviceName": src.deviceName,
    "deviceSn": src.deviceSn,
    "deviceStatus": src.deviceStatus,
    "imei": src.imei,
    "initDate": src.initDate,
    "osVersion": src.osVersion,
    "serialNumber": src.serialNumber
  };
  return dest;
}

export function deviceToDto(src: any) {
  const dest = {
    "appId": src.appId,
    "appStatus": src.appStatus,
    "appVersion": src.appVersion,
    "deviceFingerprint": src.deviceFingerprint,
    "deviceName": src.deviceName,
    "deviceSn": src.deviceSn,
    "deviceStatus": src.deviceStatus,
    "imei": src.imei,
    "initDate": src.initDate,
    "osVersion": src.osVersion,
    "serialNumber": src.serialNumber
  };
  return dest;
}
