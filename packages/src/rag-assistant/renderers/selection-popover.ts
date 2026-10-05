import { html, nothing, type TemplateResult } from 'lit';
import { questionAnswerIcon } from '../icons';
import type { SelectionPopupState } from '../types';
import { renderStellarEmblem } from './stellar-identity';

export function renderSelectionPopover(
  selectionPopup: SelectionPopupState,
  onAskWithSelection: () => void,
  label = '问助手',
  stellar = false,
): TemplateResult | typeof nothing {
  if (!selectionPopup.visible) {
    return nothing;
  }

  return html`
    <div
      class="selection-popover"
      style=${`left:${selectionPopup.x}px;top:${selectionPopup.y}px`}
    >
      <button type="button" @click=${onAskWithSelection}>
        ${stellar ? renderStellarEmblem() : questionAnswerIcon()} ${label}
      </button>
    </div>
  `;
}
