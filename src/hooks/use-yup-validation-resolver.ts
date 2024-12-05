import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, Resolver } from "react-hook-form";

function useYupValidationResolver<T extends FieldValues>(
  validationSchema
): Resolver<T, any> {
  return yupResolver(validationSchema) as Resolver<T, any>;
}

export default useYupValidationResolver;
