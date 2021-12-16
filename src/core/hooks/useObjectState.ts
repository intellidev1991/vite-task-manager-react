import { Dispatch, SetStateAction, useMemo, useState } from "react";

export interface SetObjectState<T> extends Dispatch<SetStateAction<T>> {
  /**
   * Sets the property of key to value in the object
   * @param key The object key to set the value of
   * @param value The value to set
   */
  set<K extends keyof T>(key: K, value: T[K]): void;

  /**
   * Sets several properties in the object
   * @param v An object with several properties to set
   */
  with(v: Partial<T>): void;

  /**
   * Edit a property in the object
   * @param key The key of the object to edit
   * @param edit A method that receives the old property value and will return the new value
   */
  edit<K extends keyof T>(key: K, edit: (v: T[K]) => T[K]): void;
}

/**
 * Create a state for an object with useful manipulation methods
 *
 * @param initial The initial object or factory function
 * @returns A pair of state and setState
   @example 
    const [state, setState] = useObjectState({
    landItems: [],
    loadSize: 20,
  });
  //for update the specific state
  setState({ landItems: Array.from({ length: state.loadSize }) });
 */
export function useObjectState<T extends Record<string, unknown>>(initial: T | (() => T)) {
  const [state, setState] = useState<T>(initial);

  const setObjectState = useMemo(() => {
    const setValue: SetObjectState<T> = (v: SetStateAction<T>) => setState(v);

    /**
     * Sets the property of key to value in the object
     * @param key The object key to set the value of
     * @param value The value to set
     */
    setValue.set = <K extends keyof T>(key: K, value: T[K]) => setState((x) => ({ ...x, [key]: value }));

    /**
     * Sets several properties in the object
     * @param v An object with several properties to set
     */
    setValue.with = (v: Partial<T>) => setState((x) => ({ ...x, ...v }));

    /**
     * Edit a property in the object
     * @param key The key of the object to edit
     * @param edit A method that receives the old property value and will return the new value
     */
    setValue.edit = <K extends keyof T>(key: K, edit: (v: T[K]) => T[K]) =>
      setState((x) => ({ ...x, [key]: edit(x[key]) }));

    return setValue;
  }, []);

  return [state, setObjectState.with] as const;
}
