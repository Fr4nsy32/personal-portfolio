/**
 * DOM ids that link a tab to its panel. Use the same prefix for the <Tabs />
 * and for the panel, so aria-controls and aria-labelledby always match:
 *
 *   <Tabs idPrefix="bg" ... />
 *   <div role="tabpanel" id={panelDomId("bg", id)} aria-labelledby={tabDomId("bg", id)} />
 */
export const tabDomId = (prefix: string, id: string) => `${prefix}-tab-${id}`;

export const panelDomId = (prefix: string, id: string) =>
  `${prefix}-panel-${id}`;