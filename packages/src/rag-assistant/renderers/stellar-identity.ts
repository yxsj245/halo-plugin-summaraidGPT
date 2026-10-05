import { svg, type TemplateResult } from 'lit';

// 角色与徽记共用星核、切角舱体和轨道语汇，颜色由宿主样式变量提供。
export function renderStellarDrone(): TemplateResult {
  return svg`
    <svg class="stellar-drone" viewBox="0 0 96 108" fill="none" aria-hidden="true" focusable="false">
      <g class="drone-orbit" stroke="currentColor" stroke-width="1.2">
        <ellipse cx="48" cy="57" rx="42" ry="15" transform="rotate(-18 48 57)" stroke-dasharray="48 12 7 12" />
        <path d="M11 69h5m-2.5-2.5v5M80 35h6m-3-3v6" />
      </g>
      <g class="drone-body">
        <path class="drone-wing" d="m20 45-10 6v19l13-4M76 45l10 6v19l-13-4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        <path class="drone-hull" d="m26 29 9-8h26l9 8 7 18v21l-10 12H29L19 68V47z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
        <path class="drone-status" d="M36 20v-6h24v6M42 14V9h12v5M26 72l6 5h32l6-5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
        <path class="drone-visor" d="m30 33 6-5h24l6 5 4 11-6 9H32l-6-9z" stroke="currentColor" stroke-width="1.2" />
        <path class="drone-eye" d="M35 39v7m26-7v7" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" />
        <path class="drone-status" d="M44 48h8M29 59h6m26 0h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
        <path class="drone-core" d="m48 57 3 6 6 3-6 3-3 6-3-6-6-3 6-3z" stroke="currentColor" stroke-width="1.2" />
        <path class="drone-thruster" d="m33 83 3 9m12-9v13m15-13-3 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        <path class="drone-status" d="M37 99h22" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" />
      </g>
    </svg>
  `;
}

export function renderStellarEmblem(): TemplateResult {
  return svg`
    <svg class="stellar-emblem" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false">
      <path d="m10 3 12 0 7 7v12l-7 7H10l-7-7V10z" stroke="currentColor" stroke-width="1.2" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-35 16 16)" stroke="currentColor" stroke-width="1" stroke-dasharray="18 4 8 4" />
      <path class="drone-core" d="m16 8 2.6 5.4L24 16l-5.4 2.6L16 24l-2.6-5.4L8 16l5.4-2.6z" stroke="currentColor" stroke-width="1.2" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  `;
}
