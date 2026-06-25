import md5 from "js-md5";

/**
 * 判断手机系统
 * @returns 'android' | 'ios' | undefined
 */
export function mobileSystem() {
  if (typeof navigator === "undefined") {
    return undefined;
  }
  var u = navigator.userAgent;
  var isXiaomi = u.indexOf("XiaoMi") > -1; // 小米手机
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // 其它安卓
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios
  if (isAndroid || isXiaomi) {
    return "android";
  } else if (isIOS) {
    return "ios";
  }
}

/**
 * 判断是否为移动端
 * @returns boolean
 */
export function isMobile() {
  if (typeof navigator === "undefined") {
    return false;
  }
  // 使用正则表达式检测用户代理中的常见移动设备关键字
  const mobileKeywords =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  // 获取用户代理字符串
  const userAgent = navigator.userAgent;

  // 检查用户代理中是否包含移动设备关键字
  if (mobileKeywords.test(userAgent)) {
    // 用户代理中包含移动设备关键字，认为是移动设备
    return true;
  } else {
    // 用户代理中不包含移动设备关键字，认为是PC
    return false;
  }
}
/**
 * 动态加载脚本
 * @param src 脚本URL
 * @returns Promise<HTMLScriptElement>
 */
export function loadScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("document is not available (SSR)"));
      return;
    }
    try {
      // 创建一个新的script标签
      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      // 成功加载后解决Promise
      script.onload = () => resolve(script);

      // 加载失败时拒绝Promise
      script.onerror = () => reject(new Error(`Script load error for ${src}`));

      // 将script标签加入到document的head中
      document.head.appendChild(script);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 计算md5签名
 * @param {Object} params 用于计算的参数
 * @param {String} [hashKey = commonParams.MD5_HASH_KEY] 加密的key
 */
export function getMd5Sign(
  params: Record<string, any>,
  hashKey = "d170818e876ba48711d5e1347553a824",
): string {
  let paramsStr = Object.keys(params).reduce(
    (str, key) => (str += `${key}=${params[key]}&`),
    "",
  );
  paramsStr += hashKey;
  return (md5 as any)(paramsStr);
}

interface TreeItem {
  server_id: string | number;
  roles?: any[];
  [key: string]: any;
}

/**
 * 将列表转换为树形结构
 * @param data 列表数据
 * @returns TreeItem[]
 */
export function listToTree(data: any[]): TreeItem[] {
  const newData = data || [];
  const tree: Record<string | number, TreeItem> = {};
  // 将数据按 server_id 分组
  newData.forEach((item: any) => {
    const sId = item.server_id;
    // 如果该 server_id 不在树中，初始化它
    if (!tree[sId]) {
      tree[sId] = {
        ...item,
        roles: [],
      };
    }
    // 将角色添加到对应的服务器下
    if (tree[sId]?.roles) {
      tree[sId]!.roles!.push(item);
    }
  });
  // 将对象转换为数组
  return Object.values(tree);
}
