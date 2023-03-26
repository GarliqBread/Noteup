import { DefaultValue, RecoilState, atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import { Folder } from "@/utils/enums";

import { activeFolderSelector } from "../folder.recoil";
import { ProjectState } from "./types";

const { persistAtom } = recoilPersist();


export const projectState: RecoilState<ProjectState> = atom({
  key: "projects-state",
  default: {
    projects: [],
    selectedProjectId: null,
    projectListOpen: true,
  },
  effects_UNSTABLE: [persistAtom],
});

export const projectsSelector = selector({
  key: "projects-selector",
  get: ({ get }) => get(projectState).projects,
  set: ({ get, set }, projects) =>
    !(projects instanceof DefaultValue) &&
    set(projectState, {
      ...get(projectState),
      projects,
    }),
});

export const selectedProjectIdSelector = selector({
  key: "selected-project-id-selector",
  get: ({ get }) => get(projectState).selectedProjectId,
  set: ({ set, get }, projectId) => {
    if (projectId === null || typeof projectId === "string") {
      set(projectState, {
        ...get(projectState),
        selectedProjectId: projectId,
      });

      if (projectId) {
        set(activeFolderSelector, Folder.Project);
      }
    }
  },
});

export const selectedProjectSelector = selector({
  key: "selected-Project-selector",
  get: ({ get }) => {
    const state = get(projectState);
    return state.projects.find((Project) => Project.id === state.selectedProjectId);
  },
  set: ({ set, get }, Project) => {
    if (Project instanceof DefaultValue || !Project) return;
    const state = get(projectState);
    set(projectState, {
      ...state,
      projects: state.projects.map((cat) => (cat.id === Project.id ? Project : cat)),
    });
  },
});

export const openProjectListSelector = selector({
  key: "open-Project-list-selector",
  get: ({ get }) => get(ProjectState).ProjectListOpen,
  set: ({ get, set }, status) =>
    !(status instanceof DefaultValue) &&
    set(ProjectState, {
      ...get(ProjectState),
      ProjectListOpen: status,
    }),
});
