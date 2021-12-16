export type PRIORITY = "Low" | "Medium" | "High";

export interface ITaskItem {
  id?: string;
  title: string;
  description: string;
  gift?: string;
  priority: PRIORITY;
  isDone?: boolean;
}

export interface INotify {
  id: string;
  title: string;
}
