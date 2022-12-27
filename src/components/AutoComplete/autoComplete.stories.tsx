import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  AutoComplete,
  AutoCompleteProps,
  DataSourceType,
} from './autoComplete';
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
export default {
  title: 'AutoComplete',
  component: AutoComplete,
  id: 'AutoComplete',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} as ComponentMeta<typeof AutoComplete>;

// const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />
// export const Simple = Template.bind({})
// const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
// 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
// const handleFetch = (query: string) => {
//   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
// }
// Simple.args = {
//   fetchSuggestions: handleFetch,
//   placeholder: "input players in Los Angeles lakers"
// }
export const ASimpleComplete: ComponentStory<typeof AutoComplete> = (args) => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ];
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="input players in los Angers lakers"
    />
  );
};
ASimpleComplete.storyName = '1 basic search';

export const BCustomComplete = (
  args: JSX.IntrinsicAttributes & AutoCompleteProps
) => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <b>name: {itemWithNumber.value}</b>
        <span>number: {itemWithNumber.number}</span>
      </>
    );
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="input players in Los Angeles"
      renderOption={renderOption}
    />
  );
};
BCustomComplete.storyName = '2 search';

export const CAjaxComplete = (
  args: JSX.IntrinsicAttributes & AutoCompleteProps
) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    );
  };
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="input github user names"
      renderOption={renderOption}
    />
  );
};
CAjaxComplete.storyName = '3 support async search';

// storiesOf('Nine：AutoComplete', module)
//   .add('AutoComplete', simpleComplete, {info: {source: false, text: textComplete}})
//   .add('auto select', customComplete,  {info: {source: false, text: textCustom}})
//   .add('async search github users', ajaxComplete, {info: {source: false, text: textAjax}})
