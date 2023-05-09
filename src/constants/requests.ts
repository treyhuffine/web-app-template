export enum RequestStatus {
  Idle = 'IDLE',
  InProgress = 'IN_PROGRESS',
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export interface ErrorResponse {
  statusCode?: number;
  message?: string;
}
