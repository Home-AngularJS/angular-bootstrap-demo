/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface TerminalGroups {
  groupNumber: any;
  groupName: any;
  opPurchase: any;
  opReversal: any;
  opRefund: any;
  manual: any;
  pin: any;
  geoPosition: any;
  limitVisa: any;
  limitMc: any;
  limitProstir: any;
  visaAccepted: any;
  mcAccepted: any;
  prostirAccepted: any;
  receiptTemplate: any;
  allowedLanguages: any;
}


export function dtoToTerminalGroups(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push(src.allowedLanguages[i].languageId);
  }

  const dest: any = {
    "groupNumber": src.groupNumber,
    "groupName": src.groupName,
    "opPurchase": src.opPurchase,
    "opReversal": src.opReversal,
    "opRefund": src.opRefund,
    "manual": src.manual,
    "pin": src.pin,
    "geoPosition": src.geoPosition,
    "limitVisa": src.limitVisa,
    "limitMc": src.limitMc,
    "limitProstir": src.limitProstir,
    "visaAccepted": src.visaAccepted,
    "mcAccepted": src.mcAccepted,
    "prostirAccepted": src.prostirAccepted,
    "receiptTemplate": src.receiptTemplate,
    "allowedLanguages": allowedLanguages
  };
  return dest;
}

export function terminalGroupsToDto(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push({"languageId": src.allowedLanguages[i]});
  }

  const dest = {
    "groupNumber": src.groupNumber,
    "groupName": src.groupName,
    "opPurchase": src.opPurchase,
    "opReversal": src.opReversal,
    "opRefund": src.opRefund,
    "manual": src.manual,
    "pin": src.pin,
    "geoPosition": src.geoPosition,
    "limitVisa": src.limitVisa,
    "limitMc": src.limitMc,
    "limitProstir": src.limitProstir,
    "visaAccepted": src.visaAccepted,
    "mcAccepted": src.mcAccepted,
    "prostirAccepted": src.prostirAccepted,
    "receiptTemplate": src.receiptTemplate,
    "allowedLanguages": allowedLanguages
  };
  return dest;
}

export function terminalGroupsNew() {
  const dest = {
    "groupNumber": null,
    "groupName": null,
    "opPurchase": null,
    "opReversal": null,
    "opRefund": null,
    "manual": null,
    "pin": null,
    "geoPosition": null,
    "limitVisa": null,
    "limitMc": null,
    "limitProstir": null,
    "visaAccepted": null,
    "mcAccepted": null,
    "prostirAccepted": null,
    "receiptTemplate": null,
    "allowedLanguages": []
  };
  return dest;
}
