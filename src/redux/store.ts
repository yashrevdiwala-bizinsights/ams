import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { assetSlice } from './slice/assetSlice';
import { utilsSlice } from './slice/utilsSlice';
import { locationSlice } from './slice/locationSlice';
import { osSlice } from './slice/osSlice';
import { processorSlice } from './slice/processorSlice';
import { subcat1Slice } from './slice/subcat1Slice';
import { subcat2Slice } from './slice/subcat2Slice';
import { subcat3Slice } from './slice/subcat3Slice';
import { sublocationSlice } from './slice/sublocationSlice';
import { manufacturerSlice } from './slice/manufacturerSlice';
import { modelsSlice } from './slice/modelsSlice';

export const store = configureStore({
  reducer: {
    utils: utilsSlice.reducer,
    asset: assetSlice.reducer,
    location: locationSlice.reducer,
    sublocation: sublocationSlice.reducer,
    os: osSlice.reducer,
    processor: processorSlice.reducer,
    subcat1: subcat1Slice.reducer,
    subcat2: subcat2Slice.reducer,
    subcat3: subcat3Slice.reducer,
    manufacturer: manufacturerSlice.reducer,
    models: modelsSlice.reducer,
  },
});

// injectDispatch(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;