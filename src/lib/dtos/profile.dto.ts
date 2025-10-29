export type ProfileRes = BaseResponse & {
  name: string;
  email: string;
  phone: string;
  address: string;
  details: string;
  remarks: Remark[];
  orderId: Order;
};

export type Remark = {
  id: string;
  type: string;
  data: {
    text?: string;
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
    file?: {
      url: string;
      key: string;
    };
  };
  tunes?: {
    alignmentTune?: {
      alignment: string;
    };
  };
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
  files: File[];
  remarks: string;
  dueDate: string;
};

export type File = {
  id: string;
  key: string;
  url: string;
  mimetype: string;
  size: number;
  isPublic: boolean;
};

export type SI_Profile_Table = ProfileRes & {
  numberOfTasks: number;
  numberOfReports: number;
  status: string;
};
