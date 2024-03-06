import type { MenuObj } from "@/stores/user";

interface KeyValueMap {
  [key: number]: MenuObj;
}
/**
 * 将数据处理成树状结构
 */
export const getTreeList = (
  arr: MenuObj[],
  map = {} as KeyValueMap,
  result = [] as any
) => {
  // 避免修改原数据
  arr?.forEach(item => {
    const id = item.id;
    map[id] = { ...item };
  });

  // 进行递归处理
  arr?.forEach(item => {
    // 一级数据
    if (!item.parentId) {
      result.push(map[item.id]);
    } else {
      // children里
      const parentId = item.parentId as number;
      const parent = map[parentId]; // 全部数据
      if (parent.children) {
        parent.children.push(map[item.id]);
      } else {
        parent.children = [map[item.id]];
      }
    }
  });
  return result;
};

// 获取id的所有父级
export const getMenusById = (
  arr: MenuObj[],
  id: number,
  result = [] as any
) => {
  // 查找传入id的数据
  const data = arr.find(item => item.id === id);
  if (data) {
    // 找到了
    result.unshift(data);

    // 是否有父级ID。有parentId就有父级
    if (data.parentId) {
      // 递归
      return getMenusById(arr, +data.parentId, result);
    } else {
      return result;
    }
  } else {
    // 没有找到
    return result;
  }
};
