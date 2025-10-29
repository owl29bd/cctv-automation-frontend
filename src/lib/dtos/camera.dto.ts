export type CameraResponse = BaseResponse & {
  name: string;
  description: string;
  location: string;
  status: CameraStatus;
};

export enum CameraStatus {
  Online = "online",
  Offline = "offline",
  Maintenance = "maintenance",
}
