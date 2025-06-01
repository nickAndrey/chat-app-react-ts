import { Autocomplete, Box, TextField } from '@mui/material';

import { type ReactNode } from 'react';

type Item<T> = { id: string } & T;

type DropdownWithSearchProps<T> = {
  dropdownProps: {
    items: Item<T>[];
    selectedItem: Item<T> | null;
    onSelectItem: (item: Item<T> | null) => void;
    renderOption: (item: Item<T>) => ReactNode;
  };
  searchInputProps: {
    searchValue: string;
    setSearchValue: (value: string) => void;
  };
};

function DropdownWithSearch<T>({ dropdownProps, searchInputProps }: DropdownWithSearchProps<T>) {
  return (
    <Autocomplete
      sx={{
        width: '200px',
        backgroundColor: '#142831',
        borderRadius: '16px',
        overflow: 'hidden',
        svg: { color: 'white' },
      }}
      size="small"
      getOptionLabel={(x) => x['username' as keyof Item<T>] as string}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={(x) => x}
      options={dropdownProps.items}
      value={dropdownProps.selectedItem}
      onChange={(_, newValue) => dropdownProps.onSelectItem(newValue)}
      inputValue={searchInputProps.searchValue}
      onInputChange={(_, newInputValue) => searchInputProps.setSearchValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          variant="outlined"
          sx={{
            input: { color: 'white' },
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box key={key} component="li" {...optionProps}>
            {dropdownProps.renderOption(option)}
          </Box>
        );
      }}
    />
  );
}

export default DropdownWithSearch;
