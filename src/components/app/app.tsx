import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	//Текущее состояние статьи
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	//Текущее состояние формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultArticleState={defaultArticleState}
				formState={formState}
				setFormState={setFormState}
				setArticleState={setArticleState}
			/>
			<Article />
		</main>
	);
};
