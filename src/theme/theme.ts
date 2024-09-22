import { number } from 'zod';

export const theme = {
	white: (opacity: number) => `rgba(255, 255, 255, ${opacity})`,
	black: (opacity: number) => `rgba(0, 0, 0, ${opacity})`,
};
