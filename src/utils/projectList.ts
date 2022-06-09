import { projectListType } from "./projectListType";
// 保存数据到本地
export function saveProjectList(projectList: projectListType[]) {
  localStorage.setItem("projectList", JSON.stringify(projectList));
}
// 读取数据
export function readProjectList(): projectListType[] {
  return JSON.parse(localStorage.getItem("projectList") || "[]");
}
