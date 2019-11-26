
/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ReceiptTemplatePreviewModel {
  css: any;
  html: any;
}

export function receiptTemplatePreviewToDto(src: any) {
  const dest: any = {
    'css': src.templateStyle,
    'html': src.templateBody
  };
  return dest;
}

export function dtoToReceiptTemplatePreview(src: any) {
  const dest: any = {
    'id': src.id
  };
  return dest;
}
