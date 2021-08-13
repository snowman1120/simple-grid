import { GridDataProvider, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/vaadin-grid';
import PageableDTO from 'Frontend/generated/com/vaadin/fusion/PageableDTO';
import SortDTO from 'Frontend/generated/com/vaadin/fusion/SortDTO';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';

interface ListEndpoint<T> {
  list(pageable: PageableDTO | undefined): Promise<ReadonlyArray<T | undefined> | undefined>;
}
export const infiniteScrollEndpointDataProvider = <T>(endpoint: ListEndpoint<T>): GridDataProvider<T> => {
  const dataProvider: GridDataProvider<T> = async (
    params: GridDataProviderParams<T>,
    callback: GridDataProviderCallback<T>
  ): Promise<void> => {
    const sort: SortDTO = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };

    const data: Array<T> = (await endpoint.list({
      pageNumber: params.page,
      pageSize: params.pageSize,
      sort: sort,
    })) as Array<T>;

    const firstIndex = params.pageSize * params.page;
    const sizeEstimate = firstIndex + data.length + (data.length > 0 ? 1 : 0);
    callback(data, sizeEstimate);
  };

  return dataProvider;
};
