import React from "react";
import useFetchCities from "./useFetchCities";
import { Input, AutoComplete } from "antd";
import { ConnectedLink } from "react-router5";
import { stringToPartUrl } from "../../helpers/utils";
const { Option } = AutoComplete;

const SearchBar = (): JSX.Element => {
  const [{ cities }, setSearchQuery, setCitiesList] = useFetchCities(20);
  const onSelect = () => {
    setSearchQuery("");
    setCitiesList([]);
  };

  return (
    <AutoComplete
      className="global-search search-bar"
      size="large"
      dataSource={cities.map(renderOption)}
      onSearch={setSearchQuery}
      onSelect={onSelect}
      placeholder="Enter a city (minimal length 3 symbols)"
      optionLabelProp="text"
    >
      <Input allowClear />
    </AutoComplete>
  );
};

function renderOption(item: any): JSX.Element {
  const cityUrl = stringToPartUrl(item.name)

  return (
    <Option key={item.id}>
      <ConnectedLink
        routeName='weather'
        routeParams={{
          city: cityUrl
        }}
      >
        <div className="global-search-item">
          <span className="global-search-item-desc autocomplete-option">
            {item.name}, {item.country}
          </span>
        </div>
      </ConnectedLink>
    </Option>
  );
}

export default SearchBar;
