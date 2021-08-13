import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import PersonModel from './generated/com/example/application/PersonModel';
import { MyEndpoint } from './generated/endpoints';
import { infiniteScrollEndpointDataProvider } from './util/endpoint-data-provider';
import { gridColumnsFromModel } from './util/grid-column-util';

@customElement('my-view')
export class MasterDetailView extends LitElement {
  render() {
    return html` <vaadin-grid .dataProvider=${infiniteScrollEndpointDataProvider(MyEndpoint)}>
      ${gridColumnsFromModel(PersonModel, { exclude: ['id'] })}
    </vaadin-grid>`;
  }
}
