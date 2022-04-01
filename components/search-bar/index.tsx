import React, {
  ChangeEventHandler,
  FC,
  FormEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
  useCallback,
  FormEventHandler,
  useEffect
} from 'react';

import SC from './styled';
import translations from '../../services/translations';
import { useRouter } from 'next/router';

interface Props {
  placeholder: string;
  onClear?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
  hideSearchIcon?: boolean;
}

const SearchBar: FC<Props> = ({
  placeholder,
  onSubmit,
  onClear,
  onChange,
  onKeyDown,
  onClick,
  hideSearchIcon
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(
    (router.query?.q as string) ?? ''
  );

  useEffect(() => {
    setSearchQuery(router.query?.q as string);
  }, [router.query?.q as string]);

  const clearSearchField = useCallback((e: FormEvent) => {
    e.preventDefault();
    setSearchQuery('');
    onClear && onClear();
  }, []);

  return (
    <SC.SearchBar
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(e);
      }}
    >
      <SC.SearchField
        id='searchBox'
        autoComplete='off'
        placeholder={placeholder}
        type='search'
        value={searchQuery}
        onChange={event => {
          setSearchQuery(event.currentTarget.value ?? '');
          if (onChange) {
            onChange(event);
          }
        }}
        onKeyDown={onKeyDown}
        onClick={onClick}
      />
      {searchQuery && (
        <SC.ClearButton type='button' onClick={clearSearchField}>
          <SC.ClearIcon alt={translations.translate('main.search.clear')} />
        </SC.ClearButton>
      )}
      {hideSearchIcon ? null : (
        <SC.SearchButton>
          <SC.SearchIcon alt={translations.translate('main.search.search')} />
        </SC.SearchButton>
      )}
    </SC.SearchBar>
  );
};

export default SearchBar;
