import { isEqual } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OcRootState } from "../redux/appStore";
import {
  OcCatalogProductsState,
  setListOptions,
} from "../redux/slices/ocCatalog";
import useOcAuth from "./useOcAuth";

export default function useOcProductList(options: any) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useOcAuth();
  const { items, meta, listOptions }: OcCatalogProductsState = useSelector(
    (state: OcRootState) => state.ocCatalog.products
  );

  useEffect(() => {
    if (isAuthenticated && !isEqual(options, listOptions)) {
      dispatch(setListOptions(options));
    }
  }, [dispatch, isAuthenticated, options, listOptions]);

  const result = useMemo(
    () => ({
      items,
      meta,
    }),
    [items, meta]
  );

  return result;
}
