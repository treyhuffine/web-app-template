import { CommunicationPreferencesUserMap } from '../helpers/getCommunicationPreferencesUserIdMap';

export interface PipelineInputParams {
  id: string;
}

export interface CommunicationParams {
  communicationPreferences: CommunicationPreferencesUserMap;
  data: PipelineInputParams;
}
