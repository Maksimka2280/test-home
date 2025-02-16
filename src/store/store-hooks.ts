import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { ActionCreators } from './slices';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = (): typeof ActionCreators => {
  const useAppDispatch: AppDispatch = useDispatch();
  return bindActionCreators(ActionCreators, useAppDispatch);
};
