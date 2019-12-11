/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface BackgroundJobModel {
  cron: any;
  enabled: any;
  name: any;
  nextScheduledDate: any;
}

export function dtoToBackgroundJobs(src: any) {
  const dest: any = {
    'cron': src.cron,
    'enabled': src.enabled,
    'name': src.name,
    'nextScheduledDate': src.nextScheduledDate
  };
  return dest;
}

export function backgroundJobsToDto(src: any) {
  const dest: any = {
    'cron': src.cron,
    'enabled': src.enabled,
    'name': src.name,
    'nextScheduledDate': src.nextScheduledDate
  };
  return dest;
}
