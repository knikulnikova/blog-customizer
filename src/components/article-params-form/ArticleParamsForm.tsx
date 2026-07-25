import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useState, useEffect, useRef } from 'react';

type ParamsFormProps = {
	defaultArticleState: ArticleStateType;
};

export const ArticleParamsForm = (props: ParamsFormProps) => {
	//Состояние открытия-закрытия панели с формой
	const [isOpen, setIsOpen] = useState<boolean>(false);
	//Элемент сайдбара
	const refSidebar = useRef<HTMLElement | null>(null);
	//Обработчик клика по кнопке-стрелке
	const handleToggleSidebar = () => {
		return setIsOpen((prevState) => !prevState);
	};

	//Добавляем обработчик клика вне формы при ее открытии
	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (
				refSidebar.current &&
				e.target instanceof Node &&
				!refSidebar.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleSidebar} />
			<aside
				ref={refSidebar}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} style={{ gap: '48px' }}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.defaultArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={props.defaultArticleState.fontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						selected={props.defaultArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={props.defaultArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={props.defaultArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
