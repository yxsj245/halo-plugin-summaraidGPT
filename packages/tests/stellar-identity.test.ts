import { describe, expect, it } from 'vitest';
import {
  isDefaultAssistantAvatar, resolveStellarList, resolveStellarName, resolveStellarWelcome,
  STELLAR_ASSISTANT_NAME, STELLAR_PET_SPEECH, STELLAR_WELCOME_MESSAGE,
} from '../src/rag-assistant/stellar-identity';
import { renderStellarDrone, renderStellarEmblem } from '../src/rag-assistant/renderers/stellar-identity';

describe('星枢领航员身份', () => {
  it('替换旧默认名称并保留站长自定义名称', () => {
    expect(resolveStellarName()).toBe(STELLAR_ASSISTANT_NAME);
    expect(resolveStellarName(' 智阅助手 ')).toBe(STELLAR_ASSISTANT_NAME);
    expect(resolveStellarName('星港管理员')).toBe('星港管理员');
  });
  it('默认欢迎语与有效名称一致且重复归一化幂等', () => {
    const old = '你好，我是 智阅助手。\n我可以帮你检索站内知识库、总结当前页，也可以带你打开相关页面。';
    const welcome = resolveStellarWelcome(old, STELLAR_ASSISTANT_NAME);
    expect(welcome).toBe(STELLAR_WELCOME_MESSAGE.replace('{assistantName}', STELLAR_ASSISTANT_NAME));
    expect(resolveStellarWelcome(welcome, STELLAR_ASSISTANT_NAME)).toBe(welcome);
  });
  it('自定义欢迎语只替换占位符', () => {
    expect(resolveStellarWelcome('欢迎，{assistantName} 在此值守。', '自定义向导')).toBe('欢迎，自定义向导 在此值守。');
  });
  it('默认头像映射徽记，自定义头像与外部同名图片不变', () => {
    expect(isDefaultAssistantAvatar()).toBe(true);
    expect(isDefaultAssistantAvatar('/plugins/summaraidGPT/assets/static/icon.svg?v=4')).toBe(true);
    expect(isDefaultAssistantAvatar('https://example.com/icon.svg')).toBe(false);
    expect(isDefaultAssistantAvatar('/upload/avatar.svg')).toBe(false);
  });
  it('内置默认列表替换，自定义顺序保留', () => {
    expect(resolveStellarList(['旧一', '旧二'], ['旧一', '旧二'], STELLAR_PET_SPEECH)).toEqual(STELLAR_PET_SPEECH);
    expect(resolveStellarList(['旧二', '旧一'], ['旧一', '旧二'], STELLAR_PET_SPEECH)).toEqual(['旧二', '旧一']);
  });
  it('两种矢量图为本地可信模板，无外部图片或脚本', () => {
    for (const result of [renderStellarDrone(), renderStellarEmblem()]) {
      const template = result.strings.join('');
      expect(template).toContain('<svg');
      expect(template).toContain('viewBox=');
      expect(template).not.toMatch(/<script|<image|https?:|onload=/);
    }
    expect(renderStellarDrone().strings.join('')).toContain('drone-eye');
    expect(renderStellarEmblem().strings.join('')).toContain('stellar-emblem');
  });
});
