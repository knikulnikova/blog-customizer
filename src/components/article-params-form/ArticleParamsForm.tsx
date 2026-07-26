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
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useState, useEffect, useRef } from 'react';

type ParamsFormProps = {
	defaultArticleState: ArticleStateType;
	formState: ArticleStateType;
	setFormState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

type TOptionName = keyof ArticleStateType;

export const ArticleParamsForm = (props: ParamsFormProps) => {
	//Состояние открытия-закрытия панели с формой
	const [isOpen, setIsOpen] = useState<boolean>(false);
	//Элемент сайдбара
	const refSidebar = useRef<HTMLElement | null>(null);
	//Обработчик клика по кнопке-стрелке
	const handleToggleSidebar = () => {
		return setIsOpen((prevState) => !prevState);
	};

	function handleChange(optionName: TOptionName) {
		return (option: OptionType) => {
			props.setFormState((prevState) => ({
				...prevState,
				[optionName]: option,
			}));
		};
	}

	const handleApply = () => {
		props.setArticleState({ ...props.formState });
	};

	const handleClear = () => {
		props.setFormState({ ...props.defaultArticleState });
		props.setArticleState({ ...props.defaultArticleState });
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
				<form
					className={styles.form}
					style={{ gap: '48px' }}
					onSubmit={(event) => event.preventDefault()}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={props.formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={props.formState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={props.formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={props.formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={props.formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
