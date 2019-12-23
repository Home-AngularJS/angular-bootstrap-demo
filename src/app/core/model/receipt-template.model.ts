/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ReceiptTemplateModel {
  id: any;
  templateName: any;
  templateStyle: any;
  templateBody: any;
}


export function dtoToReceiptTemplate(src: any) {
  const dest: any = {
    'id': src.id,
    'templateName': src.templateName,
    'templateStyle': src.templateStyle,
    'templateBody': src.templateBody
  };
  return dest;
}

export function receiptTemplateToDto(src: any) {
  const dest = receiptTemplateNew()
  dest.id = src.id
  dest.templateName = src.templateName
  dest.templateStyle = src.templateStyle
  dest.templateBody = src.templateBody
  return dest;
}

export function receiptTemplateNew() {
  const dest = {
    'id': null,
    'templateName': null,
    'templateStyle': null,
    'templateBody': null
  };
  return dest;
}

export function isNotEmpty(val) {
  return !isEmpty(val);
}

export function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
