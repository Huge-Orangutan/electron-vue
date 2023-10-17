/**
 * 列表迅速树状
 */
export function buildTree(arr: any[], id = "") {
  const res = _buildTree(JSON.parse(JSON.stringify(arr)), id);
  if (res === null || res === undefined) {
    return [];
  } else {
    return res;
  }

  // 查询一级分类
  function _findChild(arr: any[], id: string) {
    const childs: any[] = [];
    arr.forEach((v) => {
      if (v.pid == id) {
        childs.push(v);
      }
    });
    return childs;
  }

  function _buildTree(arr: any[], id = "") {
    // 先找到根的
    const childs = _findChild(arr, id);
    if (childs.length == 0) {
      return null;
    }
    // 对于父节点为0的进行循环，然后查出父节点为上面结果id的节点内容
    childs.forEach((v) => {
      const tree = _buildTree(arr, v.id);
      if (null != tree) {
        if (Array.isArray(v["children"])) {
          v["children"] = [...tree, ...v["children"]];
        } else {
          v["children"] = tree;
        }
      }
    });
    return childs;
  }
}
