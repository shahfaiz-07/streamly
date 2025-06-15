import { Connection } from "mongoose"; // This is important to know whether the database is already connected, not connected or promise on the way(request to connect is sent)

declare global {
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    }
}

export type IVideoClient = Omit<IVideo, 'uploadedBy'> & {
  uploadedBy: {
    _id: string;
    username: string;
  };
};


export {};