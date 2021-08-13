import '@vaadin/vaadin-grid';
import { GridDataProvider, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import SortDTO from 'Frontend/generated/com/vaadin/fusion/SortDTO';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import Person from './generated/com/example/application/Person';
import { MyEndpoint } from './generated/endpoints';

@customElement('my-view')
export class MasterDetailView extends LitElement {
  private gridDataProvider: GridDataProvider<Person> = async (
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) => {
    const sort: SortDTO = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data: Array<Person> = (await MyEndpoint.list({
      pageNumber: params.page,
      pageSize: params.pageSize,
      sort: sort,
    })) as any;

    const sizeEstimate = params.pageSize * params.page + data.length + (data.length > 0 ? 1 : 0);
    callback(data, sizeEstimate);
  };

  render() {
    return html` <vaadin-grid .dataProvider=${this.gridDataProvider}>
      <vaadin-grid-sort-column auto-width path="name"></vaadin-grid-sort-column>
      <vaadin-grid-sort-column auto-width path="dateOfBirth"></vaadin-grid-sort-column>
      <vaadin-grid-sort-column auto-width path="occupation"></vaadin-grid-sort-column>
    </vaadin-grid>`;
  }
}
