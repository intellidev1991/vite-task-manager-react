import React, { useState, useMemo, createContext, useCallback } from "react";
import { INotify, ITaskItem } from "..";

interface IAppContext {
  selectedTask: ITaskItem | undefined;
  setSelectedTask: (item: ITaskItem | undefined) => void;
  notify: INotify[];
  clearNotify: () => void;
  addNotify: (item: INotify) => void;
  tasks: ITaskItem[];
  addTask: (item: ITaskItem) => void;
  deleteTask: (item: ITaskItem) => void;
  editTask: (item: ITaskItem) => void;
  findTaskById: (id: string) => void;
  deleteTaskById: (id: string) => void;
  //modals
  showAddModal: boolean;
  openAddTaskModal: () => void;
  closeAddTaskModal: () => void;
}

const defaultState: IAppContext = {
  selectedTask: undefined,
  setSelectedTask: () => {},
  notify: [],
  addNotify: () => {},
  clearNotify: () => {},
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  findTaskById: () => {},
  deleteTaskById: () => {},
  //modals
  showAddModal: false,
  openAddTaskModal: () => {},
  closeAddTaskModal: () => {},
};

const AppContext = createContext<IAppContext>(defaultState);

interface IContextProviderProps {}

const ContextProvider: React.FC<IContextProviderProps> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<ITaskItem | undefined>(undefined);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [notify, setNotify] = useState<INotify[]>([]);
  const [tasks, setTasks] = useState<ITaskItem[]>([]);

  //--- modals
  const openAddTaskModal = useCallback(() => setShowAddModal(true), [showAddModal]);
  const closeAddTaskModal = useCallback(() => setShowAddModal(false), [showAddModal]);

  //--- Tasks
  const addTask = useCallback(
    (item: ITaskItem) => {
      setTasks([...tasks, item]);
    },
    [tasks],
  );

  const deleteTask = useCallback(
    (item: ITaskItem) => {
      let t = tasks.filter((i) => i.id !== item.id);
      setTasks(t);
    },
    [tasks],
  );

  const editTask = useCallback(
    (item: ITaskItem) => {
      let temp = tasks.map((i) => {
        if (i.id === item.id) {
          return {
            ...i,
            title: item.title,
            description: item.description,
            gift: item.gift,
            priority: item.priority,
            isDone: item.isDone,
          };
        } else {
          return i;
        }
      });
      setTasks(temp);
    },
    [tasks],
  );

  const deleteTaskById = useCallback(
    (id: string) => {
      let t = tasks.filter((i) => i.id !== id);
      setTasks(t);
    },
    [tasks],
  );

  const findTaskById = useCallback(
    (id: string) => {
      let t = tasks.filter((i) => i.id === id);
      setTasks(t);
    },
    [tasks],
  );

  //--- Notify
  const addNotify = useCallback(
    (item: INotify) => {
      setNotify([...notify, item]);
    },
    [notify],
  );

  const clearNotify = useCallback(() => {
    setNotify([]);
  }, [notify]);

  //--- Value
  const value = useMemo(
    () => ({
      selectedTask,
      setSelectedTask,
      notify,
      addNotify,
      clearNotify,
      tasks,
      addTask,
      editTask,
      deleteTask,
      findTaskById,
      deleteTaskById,
      //modals
      showAddModal,
      openAddTaskModal,
      closeAddTaskModal,
    }),
    [selectedTask, notify, tasks, showAddModal],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { ContextProvider, AppContext };
