import type { CSSResultGroup } from 'lit';
import { baseStyles } from './styles/base';
import { composerStyles } from './styles/composer';
import { contentStyles } from './styles/content';
import { petStyles } from './styles/pet';
import { stageStyles } from './styles/stage';
import { stellarStyles } from './styles/stellar';

// 星港风格放在最后：同权重时以它的覆盖为准，且只在宿主带 data-assistant-style='stellar' 时生效
export const ragAssistantStyles: CSSResultGroup = [
  baseStyles,
  petStyles,
  contentStyles,
  composerStyles,
  stageStyles,
  stellarStyles,
];
