import { useClickAway } from '@uidotdev/usehooks';
import { useState, type ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const styles = tv({
  slots: {
    container: 'relative w-full',
    dropdown: 'absolute top-full mt-1 left-0 bg-white w-full rounded-sm z-10',
    dropdownItem: 'cursor-pointer',
    searchInput: 'border border-gray-300 rounded-md px-4 py-2 w-full',
  },
  variants: {
    open: {
      true: { dropdown: 'block' },
      false: { dropdown: 'hidden' },
    },
  },
});

type Item<T> = { id: string } & T;

type DropdownWithSearchProps<T> = {
  items: Item<T>[];
  searchValue: string;
  closeOnSelect?: boolean;
  setSearchValue: (value: string) => void;
  onSelectItem?: (item: Item<T>) => void;
  renderOption?: (item: Item<T>) => ReactNode;
};

function DropdownWithSearch<T>({
  items,
  searchValue,
  closeOnSelect,
  setSearchValue,
  onSelectItem,
  renderOption,
}: DropdownWithSearchProps<T>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const containerRef = useClickAway<HTMLDivElement>(() => setDropdownOpen(false));

  const { container, dropdown, dropdownItem, searchInput } = styles({ open: dropdownOpen });

  return (
    <div ref={containerRef} className={container()}>
      <input
        type="text"
        className={searchInput()}
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setDropdownOpen(true)}
      />

      <ul className={dropdown()} role="listbox" aria-expanded="true">
        {items &&
          items.map((item) => (
            <li
              key={item.id}
              className={dropdownItem()}
              role="option"
              tabIndex={0}
              onClick={() => {
                if (closeOnSelect) {
                  setDropdownOpen(false);
                }

                onSelectItem?.(item);
              }}
              onKeyDown={({ key }) => key === 'Enter' && onSelectItem?.(item)}
            >
              {renderOption?.(item) || 'No renderer'}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DropdownWithSearch;
