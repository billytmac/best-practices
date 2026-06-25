// env.d.ts 或 global.d.ts，加类型声明
declare const __BUILD_TARGET__: 'pc' | 'mobile' | 'spre' | 'xpre' | 'ypre'

export type BuildTarget = 'pc' | 'mobile' | 'spre' | 'xpre' | 'ypre'