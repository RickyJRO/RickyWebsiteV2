import { DocumentData } from "@firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { IProject } from "../models";
import type { RootState } from "../store";

// Define a type for the slice state
interface AppState {
  testimonials:
    | {
        userImage: string;
        uid: string;
        name: string;
        role: string;
        description: string;
      }[]
    | null;
  projects: IProject[] | null;
}

// Define the initial state using that type
const initialState: AppState = {
  testimonials: null,
  projects: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTestimonials: (state, payload) => {
      state.testimonials = payload.payload;
    },
    setProjects: (state, payload) => {
      state.projects = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTestimonials, setProjects } = appSlice.actions;

export const selectTestimonials = (state: RootState) => state.app.testimonials;

export const selectProjects = (state: RootState) => state.app.projects;

export default appSlice.reducer;
