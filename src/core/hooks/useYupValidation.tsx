import React, { useState } from "react";
import * as yup from "yup";
import { AnyObject, AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";

interface IErrorValidationItem {
  key: string;
  message: string;
}
const useYupValidation = () => {
  const [errors, setErrors] = useState<IErrorValidationItem[]>([]);

  const clearErrors = () => {
    setErrors([]);
  };

  const generateErrorArray = (error: any) => {
    let t: IErrorValidationItem[] = [];
    //@ts-ignore
    error.inner.map((e) => {
      t.push({
        key: e.path,
        message: e.message,
      });
    });
    setErrors(t);
  };
  const validationSync = (
    schema: yup.ObjectSchema<ObjectShape, AnyObject, TypeOfShape<ObjectShape>, AssertsShape<ObjectShape>>,
    objectState: any,
  ): boolean => {
    try {
      schema.validateSync(objectState, { abortEarly: false });
      return true;
    } catch (error) {
      generateErrorArray(error);
      return false;
    }
  };

  const validationAsync = (
    schema: yup.ObjectSchema<ObjectShape, AnyObject, TypeOfShape<ObjectShape>, AssertsShape<ObjectShape>>,
    objectState: any,
  ): void => {
    schema
      .validate(objectState, { abortEarly: false })
      .then(() => {
        setErrors([]);
      })
      .catch((error) => {
        generateErrorArray(error);
      });
  };

  const hasError = (keyField: string) => {
    let item = errors.find((e) => e.key === keyField);
    if (item) return true;
    else return false;
  };

  const showErrorMessage = (keyField: string) => {
    let item = errors.find((e) => e.key === keyField);
    if (item) return item.message;
    else return "";
  };

  return { showErrorMessage, hasError, validationAsync, validationSync, errors, clearErrors };
};

export { useYupValidation };
