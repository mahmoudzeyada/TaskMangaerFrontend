export default interface ITask {
  image?: string;
  completed: boolean;
  _id?: string;
  description: string;
  content: string;
  dueBy: string;
  owner?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
