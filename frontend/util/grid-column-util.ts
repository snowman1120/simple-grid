import { ModelConstructor } from '@vaadin/flow-frontend/form';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import { html } from 'lit';
import { ChildPartInfo, Directive, directive, PartInfo, PartType } from 'lit/directive';

interface GridColumnOptions {
  exclude?: string[];
}
export const gridColumnsFromModel = directive(
  class extends Directive {
    partInfo: ChildPartInfo;
    constructor(partInfo: PartInfo) {
      super(partInfo);
      if (partInfo.type !== PartType.CHILD) {
        throw new Error('Use as <vaadin-grid>${gridColumns(...)}</vaadin-grid>');
      }
      this.partInfo = partInfo;
    }
    render(Model: ModelConstructor<any, any>, options?: GridColumnOptions) {
      const properties = Object.keys(Object.getOwnPropertyDescriptors(Model.prototype)).filter(
        (p) => p !== 'constructor'
      );

      return properties
        .filter((p) => !options?.exclude?.includes(p))
        .map((p) => {
          return html`<vaadin-grid-sort-column auto-width path="${p}"></vaadin-grid-sort-column>`;
        });
    }
  }
);
