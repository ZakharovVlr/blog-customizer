import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import type { FormEvent } from 'react';
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const ref = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) | void => {
    if (!isMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
  };

  const handleFormReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <div ref={ref}>
      <ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen((prev) => !prev)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
          />
          <Separator />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
          />
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
