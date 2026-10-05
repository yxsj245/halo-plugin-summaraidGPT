export const STELLAR_ASSISTANT_NAME = '星枢领航员';
export const LEGACY_ASSISTANT_NAME = '智阅助手';
export const LEGACY_ASSISTANT_AVATAR = '/plugins/summaraidGPT/assets/static/icon.svg';
export const STELLAR_WELCOME_MESSAGE =
  '星港通讯已接通，我是 {assistantName}。\n可为你检索站内信号、梳理本舱记录，或指引下一段航线。';
const LEGACY_WELCOME_MESSAGE =
  '你好，我是 {assistantName}。\n我可以帮你检索站内知识库、总结当前页，也可以带你打开相关页面。';

export const STELLAR_QUICK_QUESTIONS = [
  '这座星港由谁维护？',
  '最近接收了哪些新信号？',
  '梳理当前舱段的记录',
  '为我推荐值得探索的航线',
];
export const STELLAR_PET_SPEECH = [
  '星港通讯在线，需要我指引航线吗？',
  '选中一段记录，我来协助解码。',
  '正在守望本站星图，随时可以发来问题。',
  '想追溯信号来源？我陪你一起找。',
];
export const STELLAR_PET_ONLY_SPEECH = [
  '航标已点亮，我在这里守望星港。',
  '稍作停泊，再启程也不迟。',
  '今日的星图，又多了一段记录。',
  '路过星港，记得向我打个招呼。',
];

export function resolveStellarName(name?: string): string {
  const value = name?.trim();
  return !value || value === LEGACY_ASSISTANT_NAME ? STELLAR_ASSISTANT_NAME : value;
}

export function resolveStellarWelcome(message: string | undefined, name: string): string {
  const value = message?.trim();
  const legacyNames = [LEGACY_ASSISTANT_NAME, name];
  const legacy = !value || value === LEGACY_WELCOME_MESSAGE
    || legacyNames.some((legacyName) => value === LEGACY_WELCOME_MESSAGE.replace('{assistantName}', legacyName));
  return (legacy ? STELLAR_WELCOME_MESSAGE : value).replaceAll('{assistantName}', name);
}

// 仅替换内置默认文案，自定义内容和排列保持原样。
export function resolveStellarList(
  values: string[] | undefined,
  defaults: readonly string[],
  replacement: readonly string[],
): string[] {
  const legacy = !values?.length || (values.length === defaults.length
    && values.every((value, index) => value.trim() === defaults[index]));
  return legacy ? [...replacement] : [...values];
}

export function isDefaultAssistantAvatar(value?: string): boolean {
  if (!value?.trim()) return true;
  const path = value.trim().split(/[?#]/)[0];
  return path === LEGACY_ASSISTANT_AVATAR || path === 'icon.svg';
}
