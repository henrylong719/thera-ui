import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps
  extends Omit<InputProps, 'onSelect' | 'onChange'> {
  fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType>;
  onSelect?: (Item: DataSourceType) => void;
  onChange?: (value: string) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {};

export default AutoComplete;
